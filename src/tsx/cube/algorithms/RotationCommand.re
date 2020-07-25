module Axis = {
  type direction =
    | Forwards
    | Backwards;

  type t =
    | X(direction)
    | Y(direction)
    | Z(direction);
};

module Case = {
  type t =
    | Upper
    | Lower;

  let fromString = letter =>
    letter === letter->Js.String2.toLowerCase ? Lower : Upper;

  let isLowerCase =
    fun
    | Lower => true
    | Upper => false;
};

module Letter = {
  type t =
    | L(Case.t)
    | R(Case.t)
    | U(Case.t)
    | D(Case.t)
    | F(Case.t)
    | B(Case.t)
    | M(Case.t)
    | E(Case.t)
    | S(Case.t)
    | X(Case.t)
    | Y(Case.t)
    | Z(Case.t);

  let fromString = letter => {
    let case = letter->Case.fromString;
    switch (letter->Js.String2.toUpperCase) {
    | "L" => case->L->Some
    | "R" => case->R->Some
    | "U" => case->U->Some
    | "D" => case->D->Some
    | "F" => case->F->Some
    | "B" => case->B->Some
    | "M" => case->M->Some
    | "E" => case->E->Some
    | "S" => case->S->Some
    | "X" => case->X->Some
    | "Y" => case->Y->Some
    | "Z" => case->Z->Some
    | _ => None
    };
  };

  let toAxis =
    fun
    | L(_)
    | M(_)
    | X(_) => Axis.X(Forwards)
    | R(_) => Axis.X(Backwards)
    | U(_)
    | E(_)
    | Y(_) => Axis.Y(Forwards)
    | D(_) => Axis.Y(Backwards)
    | F(_)
    | S(_)
    | Z(_) => Axis.Z(Forwards)
    | B(_) => Axis.Z(Backwards);

  let getCase =
    fun
    | L(case)
    | M(case)
    | X(case)
    | R(case)
    | U(case)
    | E(case)
    | Y(case)
    | D(case)
    | F(case)
    | S(case)
    | Z(case)
    | B(case) => case;

  let isLowerCase = letter => letter->getCase->Case.isLowerCase;
};

module Direction = {
  type t =
    | Clockwise
    | Counterclockwise;

  let prime =
    fun
    | Clockwise => Counterclockwise
    | Counterclockwise => Clockwise;
};

module Degree = {
  type t =
    | Deg90(Direction.t)
    | Deg180(Direction.t);

  let prime =
    fun
    | Deg90(direction) => Deg90(direction->Direction.prime)
    | Deg180(direction) => Deg180(direction->Direction.prime);

  let double =
    fun
    | Deg90(direction) => Deg180(direction)
    | Deg180(_) as rotation => rotation;

  let toAngle =
    fun
    | Deg90(Clockwise) => Math.Angle.Deg(90.0)
    | Deg90(Counterclockwise) => Math.Angle.Deg(-90.0)
    | Deg180(Clockwise) => Math.Angle.Deg(180.0)
    | Deg180(Counterclockwise) => Math.Angle.Deg(-180.0);

  let toMatrix4 = (degree, ~axis) =>
    switch (axis) {
    | Axis.X(Forwards) => Math.Matrix4.fromAngleX(degree->prime->toAngle) // view from L
    | Axis.X(Backwards) => Math.Matrix4.fromAngleX(degree->toAngle) // view from R
    | Axis.Y(Forwards) => Math.Matrix4.fromAngleY(degree->prime->toAngle) // view from U
    | Axis.Y(Backwards) => Math.Matrix4.fromAngleY(degree->toAngle) // view from D
    | Axis.Z(Forwards) => Math.Matrix4.fromAngleZ(degree->toAngle) // view from F
    | Axis.Z(Backwards) => Math.Matrix4.fromAngleZ(degree->prime->toAngle) // view from B
    };
};

type t =
  | Full(int, Letter.t, bool, Degree.t)
  | Simple(Letter.t, Degree.t)
  | Group(list(t), int);

let full = (slice, letter) =>
  Full(slice, letter, false, Degree.Deg90(Clockwise));
let simple = letter => Simple(letter, Degree.Deg90(Clockwise));
let group = commands => Group(commands, 1);
let loop = (commands, iterations) => Group(commands, iterations);

let rec prime =
  fun
  | Full(slice, letter, wide, degree) =>
    Full(slice, letter, wide, degree->Degree.prime)
  | Simple(letter, degree) => Simple(letter, degree->Degree.prime)
  | Group(commands, i) => Group(commands->Belt.List.map(prime), i);

let rec double =
  fun
  | Full(slice, letter, wide, degree) =>
    Full(slice, letter, wide, degree->Degree.double)
  | Simple(letter, degree) => Simple(letter, degree->Degree.double)
  | Group(commands, i) => Group(commands->Belt.List.map(double), i);

let rec wide =
  fun
  | Full(slice, letter, _, degree) => Full(slice, letter, true, degree)
  | Simple(letter, degree) => Full(1, letter, true, degree)
  | Group(commands, i) => Group(commands->Belt.List.map(wide), i);

let rec countMoves =
  fun
  | Full(_, _, _, _)
  | Simple(_, _) => 1
  | Group(commands, iterations) =>
    commands->Belt.List.map(countMoves)->Belt.List.reduce(0, (+))
    * iterations;