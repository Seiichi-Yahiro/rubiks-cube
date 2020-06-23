open AppState;

type t = (Action.t, State.t);

let root = (ro: Rx.Observable.t(t)) => [|ro |> CubeEpics.root|] |> Rx.merge;