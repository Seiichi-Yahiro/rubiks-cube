module Pad = {
  [@react.component]
  let make = (~radius) => {
    let dispatch = Store.useDispatch();
    let circleRef = React.useRef(Js.Nullable.null);

    Hooks.useDrag(
      ~startArea=Ref(circleRef),
      ~onDrag=
        ({x, y}) =>
          UpdateRotation(Deg(-. y), Deg(x))->CubeAction->dispatch,
      (),
    );

    let radius = radius->Js.Float.toString;

    <circle
      className="rotation-pad__pad"
      ref={circleRef->ReactDOMRe.Ref.domRef}
      r=radius
      fill="rgba(0.0, 0.0, 0.0, 0.4)"
    />;
  };
};

module CubeSides = {
  [@react.component]
  let make = (~padRadius) => {
    open Math;
    let rotation = Store.useSelector(Selectors.rotationTransform);

    let distance = padRadius *. 2.0 -. 25.0;
    let radius = padRadius *. 0.15;
    let radius = {j|$(radius)px|j};

    let textStyle =
      ReactDOMRe.Style.make(~textAnchor="middle", ~fontSize="12px", ());

    let sides =
      RubiksCubeUtils.Side.values
      ->Belt.List.map(side => {
          let color =
            side->RubiksCubeUtils.Side.toColor->RubiksCubeUtils.Color.toHex;
          let translation =
            side->RubiksCubeUtils.Side.toTransform(~cubicleSize=distance);
          let position =
            Matrix4.Operators.(rotation << translation)
            ->Matrix4.applyPoint((0.0, 0.0, 0.0, 1.0));

          let text =
            switch (side) {
            | Front => "F"
            | Back => "B"
            | Up => "U"
            | Down => "D"
            | Left => "L"
            | Right => "R"
            };

          (color, position, text);
        })
      ->Belt.List.sort(((_, v1, _), (_, v2, _)) =>
          v1->Vector4.getZ < v2->Vector4.getZ ? (-1) : 1
        )
      ->Belt.List.map(((color, v, text)) => {
          let x = v->Vector4.getX->Js.Float.toString;
          let y = v->Vector4.getY->Js.Float.toString;
          let style =
            ReactDOMRe.Style.make(
              ~transform={j|translate($(x)px, $(y)px)|j},
              (),
            );

          <g key=text style>
            <circle fill=color r=radius />
            <text style=textStyle> text->React.string </text>
          </g>;
        })
      ->Belt.List.toArray
      ->React.array;

    <g> sides </g>;
  };
};

[@react.component]
let make = (~radius) => {
  let size = (2.0 *. radius)->Js.Float.toString;

  let centerStyle =
    ReactDOMRe.Style.make(
      ~transform={j|translate($(radius)px, $(radius)px)|j},
      (),
    );

  <div className="rotation-pad">
    <svg width=size height=size>
      <g style=centerStyle> <Pad radius /> <CubeSides padRadius=radius /> </g>
    </svg>
  </div>;
};