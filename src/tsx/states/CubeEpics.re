type t = (AppState.Action.t, AppState.State.t);

let init = (ro: Rx.Observable.t(t)) =>
  ro
  |> ReductiveObservable.Utils.optmap(
       fun
       | (AppState.Action.Init, state: AppState.State.t) => Some(state)
       | _ => None,
     )
  |> Rx.Operators.switchMapn((state: AppState.State.t) =>
       AppState.Action.(
         [|
           CubeAction(UpdateNumberOfCubicles(state.cube.numberOfCubicles)),
           CubeAction(UpdateRotation(Deg(0.0), Deg(0.0))),
         |]
       )
       |> Rx.of_
     );

let root = (ro: Rx.Observable.t(t)) => Rx.merge([|ro |> init|]);