module Filter = {
  let play =
    fun
    | (AppState.Action.AlgorithmPlayerAction(Play), _) => true
    | _ => false;

  let pause =
    fun
    | (AppState.Action.AlgorithmPlayerAction(Pause), _) => true
    | _ => false;

  let stop =
    fun
    | (AppState.Action.AlgorithmPlayerAction(Stop), _) => true
    | _ => false;
};

let player = (ro: AppState.Observable.t) => {
  ro
  |> Rx.Operators.filtern(Filter.play)
  |> Rx.Operators.exhaustMapn(
       `Observable(
         _ =>
           Rx.concat([|
             [|1, 2, 3, 4|]
             |> Rx.of_
             |> Rx.Operators.mapn(_ =>
                  ApplyRotation->AppState.Action.CubeAction
                ),
             Stop->AppState.Action.AlgorithmPlayerAction |> Rx.of1,
           |])
           |> Rx.Operators.concatMap(
                `Observable(
                  (action, i) =>
                    i === 0
                      ? Rx.of1(action)
                      : Rx.of1(action) |> Rx.Operators.delay(`Int(1000)),
                    /*|> Rx.Operators.delayWhen(~delayDurationSelector=(_, _) =>
                        click
                      )*/
                ),
              )
           |> Rx.Operators.takeUntil(ro |> Rx.Operators.filtern(Filter.stop)),
       ),
     );
};

let root = (ro: AppState.Observable.t) => [|ro |> player|] |> Rx.merge;