let root = (ro: AppState.Observable.t) =>
  [|ro |> CubeEpics.root, ro |> AlgorithmPlayerEpics.root|] |> Rx.merge;