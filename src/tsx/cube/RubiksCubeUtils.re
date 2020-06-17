open Uuid.V4;

module Color = {
  type t =
    | Blue
    | Green
    | Red
    | Orange
    | Yellow
    | White
    | Gray;

  let toHex =
    fun
    | Blue => "#3d81f6"
    | Green => "#009d54"
    | Red => "#dc422f"
    | Orange => "#ff6c00"
    | Yellow => "#fdcc09"
    | White => "#ffffff"
    | Gray => "#383838";
};

module Side = {
  type t =
    | Front
    | Back
    | Up
    | Down
    | Left
    | Right;

  let values = [Front, Back, Up, Down, Left, Right];

  let toColor =
    Color.(
      fun
      | Front => Blue
      | Back => Green
      | Up => Yellow
      | Down => White
      | Left => Orange
      | Right => Red
    );

  let toTransform = (side: t, ~cubicleSize: float) => {
    let halfCubicleSize = cubicleSize /. 2.0;
    Math.Matrix4.(
      Math.Matrix4.Operator.(
        switch (side) {
        | Front => fromTranslation(0.0, 0.0, halfCubicleSize)
        | Back =>
          fromTranslation(0.0, 0.0, -. halfCubicleSize)
          << fromAngleY(Deg(180.0))
        | Up =>
          fromTranslation(0.0, -. halfCubicleSize, 0.0)
          << fromAngleX(Deg(90.0))
        | Down =>
          fromTranslation(0.0, halfCubicleSize, 0.0)
          << fromAngleX(Deg(-90.0))
        | Left =>
          fromTranslation(-. halfCubicleSize, 0.0, 0.0)
          << fromAngleY(Deg(-90.0))
        | Right =>
          fromTranslation(halfCubicleSize, 0.0, 0.0)
          << fromAngleY(Deg(90.0))
        }
      )
    );
  };
};

module Axis = {
  type t = (int, int, int);

  let toList = ((x, y, z): t) => [x, y, z];

  let toTranslation =
      ((x, y, z): t, ~numberOfCubicles: int, ~cubicleSize: float) => {
    let offset = (numberOfCubicles + 1)->float_of_int *. cubicleSize /. 2.0;
    Math.Matrix4.fromTranslation(
      x->float_of_int *. cubicleSize -. offset,
      y->float_of_int *. cubicleSize -. offset,
      z->float_of_int *. (-. cubicleSize) +. offset,
    );
  };
};

module Face = {
  type t = {
    id: string,
    transform: Math.Matrix4.t,
    color: Color.t,
  };

  let isOuter =
      (~side: Side.t, ~axis as (x, y, z): Axis.t, ~numberOfCubicles: int) =>
    switch (side) {
    | Front => z === 1
    | Back => z === numberOfCubicles
    | Up => y === 1
    | Down => y === numberOfCubicles
    | Left => x === 1
    | Right => x === numberOfCubicles
    };

  let fromSide =
      (
        side: Side.t,
        ~axis: Axis.t,
        ~numberOfCubicles: int,
        ~cubicleSize: float,
      )
      : t => {
    {
      id: uuidv4(),
      color:
        isOuter(~side, ~axis, ~numberOfCubicles)
          ? side->Side.toColor : Color.Gray,
      transform: side->Side.toTransform(~cubicleSize),
    };
  };
};

module Cubicle = {
  type t = {
    id: string,
    faces: list(Face.t),
    transform: Math.Matrix4.t,
    axis: Axis.t,
  };

  let isOuter = (axis: Axis.t, ~numberOfCubicles: int) =>
    axis->Axis.toList->Belt.List.some(v => v === 1 || v === numberOfCubicles);

  let fromAxis =
      (axis: Axis.t, ~numberOfCubicles: int, ~cubicleSize: float): t => {
    {
      id: uuidv4(),
      faces:
        Side.values->Belt.List.map(
          Face.fromSide(~axis, ~numberOfCubicles, ~cubicleSize),
        ),
      transform: axis->Axis.toTranslation(~numberOfCubicles, ~cubicleSize),
      axis,
    };
  };
};

let calculateCubicleSize = (~numberOfCubicles: int, ~cubeSize: float) =>
  cubeSize /. numberOfCubicles->float_of_int;

let init = (~numberOfCubicles: int, ~cubeSize: float) => {
  Belt.(
    List.makeBy(numberOfCubicles, z =>
      List.makeBy(numberOfCubicles, y =>
        List.makeBy(numberOfCubicles, x => (x + 1, y + 1, z + 1))
      )
    )
    ->List.flatten
    ->List.flatten
    ->List.keep(Cubicle.isOuter(~numberOfCubicles))
    ->List.map(
        Cubicle.fromAxis(
          ~numberOfCubicles,
          ~cubicleSize=calculateCubicleSize(~numberOfCubicles, ~cubeSize),
        ),
      )
  );
};