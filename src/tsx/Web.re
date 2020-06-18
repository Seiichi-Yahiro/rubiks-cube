[@bs.val] external window: Dom.window = "window";

module EventName = {
  type t =
    | MouseDown
    | MouseUp
    | MouseMove;

  let toString =
    fun
    | MouseDown => "mousedown"
    | MouseUp => "mouseup"
    | MouseMove => "mousemove";
};

module Element = {
  type t =
    | Window
    | Ref(React.ref(Js.Nullable.t(Dom.element)));

  let observe = (element: t, eventName: EventName.t) => {
    let eventName = eventName->EventName.toString;
    switch (element) {
    | Window => Rx.fromEvent(~target=window, ~eventName)->Some
    | Ref(ref) =>
      ref.current
      ->Js.Nullable.toOption
      ->Belt.Option.map(target => Rx.fromEvent(~target, ~eventName))
    };
  };
};

module MouseEvent = {
  [@bs.get] external movementX: Dom.mouseEvent => float = "movementX";
  [@bs.get] external movementY: Dom.mouseEvent => float = "movementY";
  [@bs.send]
  external preventDefault: Dom.mouseEvent => unit = "preventDefault";
};