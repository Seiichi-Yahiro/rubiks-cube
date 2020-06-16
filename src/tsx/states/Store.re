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
  | DevToolsCustomAction => state
  };

let reductiveDevToolsEnhancer =
  ReductiveDevTools.Connectors.enhancer(
    ~options=
      ReductiveDevTools.Extension.enhancerOptions(~name="Rubiks-Cube", ()),
    ~devToolsUpdateActionCreator=(_: State.t) => Action.DevToolsCustomAction,
    (),
  );

let enhancer = (store, next) => Logger.logger(store) @@ next;

let store =
  (reductiveDevToolsEnhancer @@ Reductive.Store.create)(
    ~reducer,
    ~preloadedState=State.initial,
    ~enhancer,
    (),
  );

include ReductiveContext.Make({
  type action = Action.t;
  type state = State.t;
});