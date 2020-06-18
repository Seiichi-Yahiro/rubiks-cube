module State = {
  type t = {
    algorithmPlayer: AlgorithmPlayerState.State.t,
    cube: CubeState.State.t,
  };

  let initial: t = {
    algorithmPlayer: AlgorithmPlayerState.State.initial,
    cube: CubeState.State.initial,
  };
};

module Action = {
  type t =
    | Init
    | AlgorithmPlayerAction(AlgorithmPlayerState.Action.t)
    | CubeAction(CubeState.Action.t)
    | DevToolsCustomAction;
};

let reducer = (state: State.t, action: Action.t) =>
  switch (action) {
  | AlgorithmPlayerAction(algorithmPlayerAction) => {
      ...state,
      algorithmPlayer:
        AlgorithmPlayerState.reducer(
          state.algorithmPlayer,
          algorithmPlayerAction,
        ),
    }
  | CubeAction(cubeAction) => {
      ...state,
      cube: CubeState.reducer(state.cube, cubeAction),
    }
  | _ => state
  };