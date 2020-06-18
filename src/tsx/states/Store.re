open AppState;

module State = State;

let reductiveDevToolsEnhancer =
  ReductiveDevTools.Connectors.enhancer(
    ~options=
      ReductiveDevTools.Extension.enhancerOptions(~name="Rubiks-Cube", ()),
    ~devToolsUpdateActionCreator=(_: State.t) => Action.DevToolsCustomAction,
    (),
  );

let enhancer = (store, next) =>
  ReductiveObservable.middleware(Rx.of1(AppEpics.root), store) @@
  Logger.logger(store) @@
  next;

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