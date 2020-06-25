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

let player = (ro: AppState.Observable.t) =>
  ro
  |> Rx.Operators.filtern(Filter.play)
  |> Rx.Operators.exhaustMapn(
       `Observable(
         _ =>
           [|1, 2, 3, 4|]
           |> Rx.of_
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
     )
  |> Rx.Operators.tap(~next=Js.log)
  |> ReductiveObservable.Utils.empty;

let root = (ro: AppState.Observable.t) => [|ro |> player|] |> Rx.merge;