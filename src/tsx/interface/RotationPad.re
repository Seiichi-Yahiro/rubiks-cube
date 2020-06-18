[@react.component]
let make = (~radius) => {
  let dispatch = Store.useDispatch();
  let circleRef = React.useRef(Js.Nullable.null);

  Hooks.useDrag(
    ~startArea=Ref(circleRef),
    ~onDrag=
      ({x, y}) => UpdateRotation(Deg(-. y), Deg(x))->CubeAction->dispatch,
    (),
  );

  let radius' = radius->Js.Float.toString;
  let size = (2.0 *. radius)->Js.Float.toString;

  <div className="rotation-sphere">
    <svg width=size height=size>
      <circle
        className="rotation-sphere__pad"
        ref={circleRef->ReactDOMRe.Ref.domRef}
        cx=radius'
        cy=radius'
        r=radius'
        fill="rgba(0.0, 0.0, 0.0, 0.4)"
      />
    </svg>
  </div>;
};