type t = (AppState.Action.t, AppState.State.t);

let click: Rx.Observable.t(Dom.mouseEvent) =
  Web.Element.observe(Window, MouseDown)->Belt.Option.getExn;

let pause = (ro: Rx.Observable.t(t)) =>
  ro
  |> ReductiveObservable.Utils.optmap(
       fun
       | (AppState.Action.AlgorithmPlayerAction(Pause), _) => Some(false)
       | _ => None,
     );

let resume = (ro: Rx.Observable.t(t)) =>
  ro
  |> ReductiveObservable.Utils.optmap(
       fun
       | (
           AppState.Action.AlgorithmPlayerAction(Play),
           {algorithmPlayer: {status: Paused, _}, _}: AppState.State.t,
         ) =>
         Some(true)
       | _ => None,
     );

let stop =
  fun
  | (AppState.Action.AlgorithmPlayerAction(Stop), _) => true
  | _ => false;

let play =
  fun
  | (
      AppState.Action.AlgorithmPlayerAction(Play),
      {algorithmPlayer: {status: Stopped, _}, _}: AppState.State.t,
    ) =>
    true
  | _ => false;

let player = (ro: Rx.Observable.t(t)) =>
  ro
  |> Rx.Operators.filtern(play)
  |> Rx.Operators.mergeMapn(
       `Observable(
         _ =>
           Rx.of1(1)
           |> Rx.Operators.delay(`Int(1000))
           |> Rx.Operators.takeUntil(
                ro
                |> Rx.Operators.filtern(stop)
                |> Rx.Operators.tap(~next=_ => Js.log("stop")),
              ),
       ),
     )
  |> Rx.Operators.tap(~next=Js.log)
  |> ReductiveObservable.Utils.empty;
/*ro
  |> Rx.Operators.filtern(play)
  |> Rx.Operators.concatMapn(`Array(_ => [|1, 2, 3, 4|]))
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
  |> Rx.Operators.takeUntil(
       click,
       /*ro
         |> Rx.Operators.filtern(stop)
         |> Rx.Operators.tap(~next=_ => Js.log2("stoo", ro)),*/
     )
  |> Rx.Operators.tap(~next=Js.log)
  |> ReductiveObservable.Utils.empty;*/

let root = (ro: Rx.Observable.t(t)) => [|ro |> player|] |> Rx.merge;