module Face = {
  [@react.component]
  let make = (~transform, ~color) => {
    let (isHovered, setHovered) = React.useState(() => false);

    let onMouseEnter = _ => setHovered(_ => true);
    let onMouseLeave = _ => setHovered(_ => false);

    let style = {
      let transform = transform->Math.Matrix4.toCssMatrix;
      let color = color->RubiksCubeUtils.Color.toHex;
      ReactDOMRe.Style.make(
        ~backfaceVisibility="hidden",
        ~position="absolute",
        ~transform,
        ~backgroundColor=color,
        ~width="inherit",
        ~height="inherit",
        (),
      );
    };

    <div style onMouseEnter onMouseLeave>
      {switch (color, isHovered) {
       | (Gray, _)
       | (_, false) => React.null
       | (_, true) => <FaceArrows />
       }}
    </div>;
  };

  let make = make->React.memo;
};

module Cubicle = {
  [@react.component]
  let make = (~faces, ~transform, ~axis, ~cubicleSize) => {
    let style = {
      let transform = transform->Math.Matrix4.toCssMatrix;
      let cubicleSize = {j|$(cubicleSize)px|j};

      ReactDOMRe.Style.make(
        ~position="absolute",
        ~transform,
        ~transformStyle="preserve-3d",
        ~width=cubicleSize,
        ~height=cubicleSize,
        (),
      );
    };

    <div style>
      {faces
       ->Belt.List.map((RubiksCubeUtils.Face.{id, transform, color}) =>
           <Face key=id transform color />
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
  let rotation = Store.useSelector(Selectors.rotationTransform);
  let scale = Store.useSelector(Selectors.scale);
  let cubeSize = Store.useSelector(Selectors.cubeSize);
  let numberOfCubicles = Store.useSelector(Selectors.numberOfCubicles);
  let cubicleSize =
    RubiksCubeUtils.calculateCubicleSize(~numberOfCubicles, ~cubeSize);

  let style = {
    open Math;
    open Math.Matrix4.Operators;
    let transform = rotation << Matrix4.fromScale(scale);

    let cubeSize = {j|$(cubeSize)px|j};

    ReactDOMRe.Style.make(
      ~width=cubeSize,
      ~height=cubeSize,
      ~transform=transform->Matrix4.toCssMatrix,
      ~transformStyle="preserve-3d",
      ~position="relative",
      (),
    );
  };

  // positions are calculated based on center of squares but html has the origin in the upper left corner
  let positionCorrectionStyle = {
    open Math;
    let offset = cubicleSize *. (numberOfCubicles->float_of_int /. 2.0 -. 0.5);
    let transform =
      Matrix4.fromTranslation(offset, offset, 0.0)->Matrix4.toCssMatrix;

    ReactDOMRe.Style.make(~transformStyle="preserve-3d", ~transform, ());
  };

  <div className="app__cube">
    <div style>
      <div style=positionCorrectionStyle>
        {cubicles
         ->Belt.List.map(({id, faces, transform, axis}) =>
             <Cubicle key=id faces transform axis cubicleSize />
           )
         ->Belt.List.toArray
         ->React.array}
      </div>
    </div>
  </div>;
};