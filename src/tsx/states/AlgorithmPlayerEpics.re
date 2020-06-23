type t = (AppState.Action.t, AppState.State.t);

let play = (ro: Rx.Observable.t(t)) =>
  ro
  |> ReductiveObservable.Utils.optmap(
       fun
       | (
           AppState.Action.AlgorithmPlayerAction(Play),
           state: AppState.State.t,
         ) =>
         Some(state)
       | _ => None,
     );

let root = (ro: Rx.Observable.t(t)) => [|ro |> play|] |> Rx.merge;