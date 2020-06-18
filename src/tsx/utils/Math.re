let rec zip4 =
        (a: list('a), b: list('b), c: list('c), d: list('d))
        : list(('a, 'b, 'c, 'c)) =>
  switch (a, b, c, d) {
  | ([a, ...aTail], [b, ...bTail], [c, ...cTail], [d, ...dTail]) => [
      (a, b, c, d),
      ...zip4(aTail, bTail, cTail, dTail),
    ]
  | (_, _, _, _) => []
  };

let clamp = (v, ~min, ~max) =>
  if (v < min) {
    min;
  } else if (v > max) {
    max;
  } else {
    v;
  };

module Angle = {
  type t =
    | Deg(float)
    | Rad(float);

  let toDegree =
    fun
    | Deg(deg) => deg
    | Rad(rad) => rad *. 180.0 /. Js.Math._PI;

  let toRadian =
    fun
    | Deg(deg) => deg *. Js.Math._PI /. 180.0
    | Rad(rad) => rad;

  let add = (left, right) =>
    switch (left) {
    | Deg(deg) => Deg(deg +. right->toDegree)
    | Rad(rad) => Rad(rad +. right->toRadian)
    };

  let clamp = (angle, ~min, ~max) =>
    switch (angle) {
    | Deg(deg) => deg->clamp(~min=min->toDegree, ~max=max->toDegree)->Deg
    | Rad(rad) => rad->clamp(~min=min->toRadian, ~max=max->toRadian)->Rad
    };
};

module Vector4 = {
  type t = (float, float, float, float);

  let toList = ((x, y, z, w): t) => [x, y, z, w];

  let dot = (vector1: t, vector2: t): float =>
    vector1
    ->toList
    ->Belt.List.zip(vector2->toList)
    ->Belt.List.map(((a, b)) => a *. b)
    ->Belt.List.reduce(0.0, (+.));
};

module Matrix4 = {
  type t = (Vector4.t, Vector4.t, Vector4.t, Vector4.t);

  let identity: t = (
    (1.0, 0.0, 0.0, 0.0),
    (0.0, 1.0, 0.0, 0.0),
    (0.0, 0.0, 1.0, 0.0),
    (0.0, 0.0, 0.0, 1.0),
  );

  let fromTranslation = (x: float, y: float, z: float): t => (
    (1.0, 0.0, 0.0, 0.0),
    (0.0, 1.0, 0.0, 0.0),
    (0.0, 0.0, 1.0, 0.0),
    (x, y, z, 1.0),
  );

  let fromColumnList = (columns: list(Vector4.t)): t =>
    switch (columns) {
    | [x, y, z, w] => (x, y, z, w)
    | _ => Js.Exn.raiseError({j|Could not convert $columns to Matrix4!|j})
    };

  let fromAngleX = (angle: Angle.t): t => {
    let angle = angle->Angle.toRadian;
    let sin = angle->Js.Math.sin;
    let cos = angle->Js.Math.cos;

    (
      (1.0, 0.0, 0.0, 0.0),
      (0.0, cos, sin, 0.0),
      (0.0, -. sin, cos, 0.0),
      (0.0, 0.0, 0.0, 1.0),
    );
  };

  let fromAngleY = (angle: Angle.t): t => {
    let angle = angle->Angle.toRadian;
    let sin = angle->Js.Math.sin;
    let cos = angle->Js.Math.cos;

    (
      (cos, 0.0, -. sin, 0.0),
      (0.0, 1.0, 0.0, 0.0),
      (sin, 0.0, cos, 0.0),
      (0.0, 0.0, 0.0, 1.0),
    );
  };

  let fromAngleZ = (angle: Angle.t): t => {
    let angle = angle->Angle.toRadian;
    let sin = angle->Js.Math.sin;
    let cos = angle->Js.Math.cos;

    (
      (cos, sin, 0.0, 0.0),
      (-. sin, cos, 0.0, 0.0),
      (0.0, 0.0, 1.0, 0.0),
      (0.0, 0.0, 0.0, 1.0),
    );
  };

  let fromScale = (scale: float): t => {
    (
      (scale, 0.0, 0.0, 0.0),
      (0.0, scale, 0.0, 0.0),
      (0.0, 0.0, scale, 0.0),
      (0.0, 0.0, 0.0, 1.0),
    );
  };

  let transpose = ((x, y, z, w): t): t =>
    Vector4.(zip4(x->toList, y->toList, z->toList, w->toList))
    ->fromColumnList;

  let multiply = (matrix1: t, (x2, y2, z2, w2): t): t => {
    let (x1, y1, z1, w1) = matrix1->transpose;
    Vector4.(
      (x1->dot(x2), y1->dot(x2), z1->dot(x2), w1->dot(x2)),
      (x1->dot(y2), y1->dot(y2), z1->dot(y2), w1->dot(y2)),
      (x1->dot(z2), y1->dot(z2), z1->dot(z2), w1->dot(z2)),
      (x1->dot(w2), y1->dot(w2), z1->dot(w2), w1->dot(w2)),
    );
  };

  let toCssMatrix = ((x, y, z, w): t): string => {
    let values =
      [x, y, z, w]
      ->Belt.List.map(Vector4.toList)
      ->Belt.List.flatten
      ->Belt.List.toArray
      ->Js.Array2.joinWith(",");

    {j|matrix3d($values)|j};
  };

  module Operators = {
    let (<<) = multiply;
  };
};