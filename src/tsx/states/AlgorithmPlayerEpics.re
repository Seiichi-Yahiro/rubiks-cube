type t = (AppState.Action.t, AppState.State.t);

/*let play = (ro: Rx.Observable.t(t)) =>
  ro
  |> ReductiveObservable.Utils.optmap(
       fun
       | (
           AppState.Action.AlgorithmPlayerAction(Play),
           state: AppState.State.t,
         ) =>
         Some(state)
       | _ => None,
     );*/

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

let root = (ro: Rx.Observable.t(t)) =>
  [|ro |> parseNotation, ro |> countMoves|] |> Rx.merge;