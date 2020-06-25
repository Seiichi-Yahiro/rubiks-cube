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
let mouseDown: Rx.Observable.t(Dom.mouseEvent) =
  Window->Web.Element.observe(MouseDown)->Belt.Option.getExn;
let player = (ro: AppState.Observable.t) => {
  let play_o = ro |> Rx.Operators.filtern(Filter.play);
  let pause_o = ro |> Rx.Operators.filtern(Filter.pause);
  let stop_o = ro |> Rx.Operators.filtern(Filter.stop);

  let animationFinished_o =
    //Rx.interval(~period=1000, ())
    mouseDown |> Rx.Operators.mapTo(1);

  let isPaused_o =
    [|
      play_o |> Rx.Operators.mapTo(false),
      pause_o |> Rx.Operators.mapTo(true),
    |]
    |> Rx.merge
    |> Rx.Operators.startWith([|false|]);

  let delay_o =
    isPaused_o
    |> Rx.Operators.switchMapn(
         fun
         | true => play_o |> Rx.Operators.mapTo(0)
         | false => animationFinished_o,
       );

  play_o
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
           |> Rx.Operators.concatMapn(
                `Observable(
                  action =>
                    action
                    |> Rx.of1
                    |> Rx.Operators.delayWhen(~delayDurationSelector=(_, _) =>
                         delay_o
                       ),
                ),
              )
           |> Rx.Operators.takeUntil(stop_o),
       ),
     );
};

let root = (ro: AppState.Observable.t) => [|ro |> player|] |> Rx.merge;