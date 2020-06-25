let init = (ro: AppState.Observable.t) =>
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

let root = (ro: AppState.Observable.t) => [|ro |> init|] |> Rx.merge;