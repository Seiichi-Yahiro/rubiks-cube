type t = (AppState.Action.t, AppState.State.t);

let init = (ro: Rx.Observable.t(t)) =>
  ro
  |> ReductiveObservable.Utils.optmap(
       fun
       | (AppState.Action.Init, state: AppState.State.t) =>
         Some(
           AppState.Action.CubeAction(
             UpdateNumberOfCubicles(state.cube.numberOfCubicles),
           ),
         )
       | _ => None,
     );

let root = (ro: Rx.Observable.t(t)) => Rx.merge([|ro |> init|]);