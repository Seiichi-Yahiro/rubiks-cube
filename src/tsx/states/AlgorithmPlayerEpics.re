type t = (AppState.Action.t, AppState.State.t);

let parseNotation = (ro: Rx.Observable.t(t)) =>
  ro
  |> ReductiveObservable.Utils.optmap(
       fun
       | (
           AppState.Action.AlgorithmPlayerAction(UpdateNotation(notation)),
           _,
         ) =>
         Some(notation)
       | _ => None,
     )
  |> Rx.Operators.debounceTime(~dueTime=500.0)
  |> Rx.Operators.mapn(Parser.parse)
  |> Rx.Operators.mapn(parseOutput =>
       parseOutput->ParsedNotation->AppState.Action.AlgorithmPlayerAction
     );

let countMoves = (ro: Rx.Observable.t(t)) =>
  ro
  |> ReductiveObservable.Utils.optmap(
       fun
       | (
           AppState.Action.AlgorithmPlayerAction(ParsedNotation(parseOutput)),
           _,
         ) =>
         parseOutput->Tablecloth.Result.toOption
       | _ => None,
     )
  |> Rx.Operators.mapn(commands =>
       commands
       ->Belt.List.map(RotationCommand.countMoves)
       ->Belt.List.reduce(0, (+))
     )
  |> Rx.Operators.mapn(moves =>
       moves->UpdateNumberOfMoves->AppState.Action.AlgorithmPlayerAction
     );

let player = (ro: Rx.Observable.t(t)) => {
  let playFilter =
    Rx.Operators.filtern(
      fun
      | (AppState.Action.AlgorithmPlayerAction(Play), _) => true
      | _ => false,
    );

  let commandsFilterMap =
    ReductiveObservable.Utils.optmap(
      fun
      | (
          _,
          {algorithmPlayer: {parseOutput: Ok(commands), _}, _}: AppState.State.t,
        ) =>
        commands->Some
      | _ => None,
    );

  let moveUpdateObs =
    ro
    |> ReductiveObservable.Utils.optmap(
         fun
         | (
             AppState.Action.AlgorithmPlayerAction(NextMove | PrevMove),
             state: AppState.State.t,
           ) =>
           state.algorithmPlayer.currentMove->Some
         | _ => None,
       );

   let findCurrendCommand = (commands, currentMove) => {
    let rec aux = (~index=0, commands) => switch(commands) {
        |[] => None
        |[(Full(_, _, _, _) | Simple(_, _)) as command, ...tail] => index === currentMove ? command->Some : aux(~index=index+1, tail)
        |[Group(_commands, _iterations) as command, ...tail] => {
            let numberOfMoves = command->RotationCommand.countMoves;

             numberOfMoves + index < currentMove ? aux() : ;
        }
    }
   }

  ro
  |> playFilter
  |> commandsFilterMap
  |> Rx.Operators.exhaustMapn(`Observable(commands => {
    moveUpdateObs |> Rx.Operators.mapn(currentMove => )
  }))
  |> Rx.Operators.mapn(_ =>
       AppState.Action.CubeAction(
         StartRotationCommand(Simple(F(Upper), Deg90(Clockwise))),
       )
     );
};

let root = (ro: Rx.Observable.t(t)) =>
  [|ro |> parseNotation, ro |> countMoves, ro |> player|] |> Rx.merge;