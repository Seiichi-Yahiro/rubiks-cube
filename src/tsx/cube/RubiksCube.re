module Face = {
  [@react.component]
  let make = (~transform, ~color, ~size) => {
    let style = {
      let transform = transform->Math.Matrix4.toCssMatrix;
      let color = color->RubiksCubeUtils.Color.toHex;
      let size = {j|$(size)px|j};
      ReactDOMRe.Style.make(
        ~position="absolute",
        ~transform,
        ~backgroundColor=color,
        ~width=size,
        ~height=size,
        (),
      );
    };

    <div style />;
  };

  let make = make->React.memo;
};

module Cubicle = {
  [@react.component]
  let make = (~faces, ~transform, ~axis, ~size) => {
    let style = {
      let transform = transform->Math.Matrix4.toCssMatrix;
      let size = {j|$(size)px|j};

      ReactDOMRe.Style.make(
        ~position="absolute",
        ~transform,
        ~transformStyle="preserve-3d",
        ~width=size,
        ~height=size,
        (),
      );
    };

    <div style>
      {faces
       ->Belt.List.mapWithIndex((i, RubiksCubeUtils.Face.{transform, color}) =>
           <Face key={i->Js.Int.toString} transform color size />
         )
       ->Belt.List.toArray
       ->React.array}
    </div>;
  };

  let make = make->React.memo;
};

[@react.component]
let make = () => {
  let cubicles = Store.useSelector(Selectors.cubicles);
  let scale = Store.useSelector(Selectors.scale);
  let cubeSize = Store.useSelector(Selectors.cubeSize)->float_of_int;
  let numberOfCubicles = Store.useSelector(Selectors.numberOfCubicles);
  let cubicleSize = cubeSize /. numberOfCubicles->float_of_int;
  let cubeSize' = {j|$(cubeSize)px|j};

  let style = {
    open Math;
    open Math.Matrix4.Operator;
    let transform =
      Matrix4.fromAngleX(Deg(-45.0))
      << Matrix4.fromAngleY(Deg(-45.0))
      << Matrix4.fromScale(scale);
    let transform = transform->Matrix4.toCssMatrix;

    ReactDOMRe.Style.make(
      ~perspective="1000",
      ~transform,
      ~transformStyle="preserve-3d",
      ~position="relative",
      (),
    );
  };

  // TODO remove index key
  <div className="app__cube" style>
    {cubicles
     ->Belt.List.mapWithIndex((i, {faces, transform, axis}) =>
         <Cubicle
           key={i->Js.Int.toString}
           faces
           transform
           axis
           size=cubicleSize
         />
       )
     ->Belt.List.toArray
     ->React.array}
  </div>;
};