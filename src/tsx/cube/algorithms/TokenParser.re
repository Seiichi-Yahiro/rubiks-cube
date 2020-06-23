module AxisIndex = {
  type slice =
    | First(int)
    | Last(int);
  type t =
    | First
    | Last
    | Middle
    | Slice(slice)
    | Range(t, t);

  let wide =
    fun
    | Slice(First(_)) as slice => Range(First, slice)->Some
    | Slice(Last(_)) as slice => Range(Last, slice)->Some
    | _ => None;
};

module AxisDirection = {
  type t =
    | Clockwise
    | Counterclockwise
    | Double;

  let prime =
    fun
    | Clockwise => Counterclockwise
    | Counterclockwise => Clockwise
    | Double => Double;
};

module RotationAxis = {
  type t =
    | X(AxisIndex.t, AxisDirection.t)
    | Y(AxisIndex.t, AxisDirection.t)
    | Z(AxisIndex.t, AxisDirection.t);

  let prime =
    fun
    | X(index, direction) => X(index, direction->AxisDirection.prime)
    | Y(index, direction) => Y(index, direction->AxisDirection.prime)
    | Z(index, direction) => Z(index, direction->AxisDirection.prime);

  let double =
    fun
    | X(index, _) => X(index, Double)
    | Y(index, _) => Y(index, Double)
    | Z(index, _) => Z(index, Double);

  let wide =
    fun
    | X(index, direction) =>
      X(index->AxisIndex.wide->Belt.Option.getWithDefault(index), direction)
    | Y(index, direction) =>
      Y(index->AxisIndex.wide->Belt.Option.getWithDefault(index), direction)
    | Z(index, direction) =>
      Z(index->AxisIndex.wide->Belt.Option.getWithDefault(index), direction);
};

// TODO lowerCaseLetterToRotationAxis
let upperCaseLetterToRotationAxis =
  fun
  | Tokenizer.Letter.L => RotationAxis.X(First, Clockwise)
  | Tokenizer.Letter.R => RotationAxis.X(Last, Clockwise)
  | Tokenizer.Letter.U => RotationAxis.Y(First, Clockwise)
  | Tokenizer.Letter.D => RotationAxis.Y(Last, Clockwise)
  | Tokenizer.Letter.F => RotationAxis.Z(First, Clockwise)
  | Tokenizer.Letter.B => RotationAxis.Z(Last, Clockwise)
  | Tokenizer.Letter.M => RotationAxis.X(Middle, Clockwise)
  | Tokenizer.Letter.E => RotationAxis.Y(Middle, Clockwise)
  | Tokenizer.Letter.S => RotationAxis.Z(Middle, Clockwise)
  | Tokenizer.Letter.X => RotationAxis.X(Range(First, Last), Clockwise)
  | Tokenizer.Letter.Y => RotationAxis.Y(Range(First, Last), Clockwise)
  | Tokenizer.Letter.Z => RotationAxis.Z(Range(First, Last), Clockwise);

let sliceLetter = (letter, ~slice) =>
  switch (letter) {
  | Tokenizer.Letter.L => RotationAxis.X(slice->First->Slice, Clockwise)
  | Tokenizer.Letter.R => RotationAxis.X(slice->Last->Slice, Clockwise)
  | Tokenizer.Letter.U => RotationAxis.Y(slice->First->Slice, Clockwise)
  | Tokenizer.Letter.D => RotationAxis.Y(slice->Last->Slice, Clockwise)
  | Tokenizer.Letter.F => RotationAxis.Z(slice->First->Slice, Clockwise)
  | Tokenizer.Letter.B => RotationAxis.Z(slice->Last->Slice, Clockwise)
  | _ => letter->upperCaseLetterToRotationAxis
  };

let interpret =
    (tokens: list(Tokenizer.Token.t))
    : Belt.Result.t(list(RotationAxis.t), Compiler.Error.t) => {
  open Tokenizer;
  open Token;

  let rec aux = (~result=[], tokens) =>
    switch (tokens) {
    | [] => result->Ok
    | [Letter(letter, Case.Upper), ...tail] =>
      handlePrimeOrDouble(
        ~result=[letter->upperCaseLetterToRotationAxis, ...result],
        tail,
      )
    | [Number(number), Letter(letter, Case.Upper), ...tail] =>
      let letter = letter->sliceLetter(~slice=number);

      switch (tail) {
      | [Wide, ...tail] =>
        handlePrimeOrDouble(
          ~result=[letter->RotationAxis.wide, ...result],
          tail,
        )
      | _ => handlePrimeOrDouble(~result=[letter, ...result], tail)
      };
    | _ => Compiler.Error.Syntax->Error
    }
  and handlePrimeOrDouble = (~result, tokens) =>
    switch (tokens) {
    | [Prime, ...tail] =>
      handleExpressionEnd(
        ~result=result->Utils.mapHead(RotationAxis.prime),
        tail,
      )
    | [Number(2), ...tail] =>
      handleExpressionEnd(
        ~result=result->Utils.mapHead(RotationAxis.double),
        tail,
      )
    | _ => handleExpressionEnd(~result, tokens)
    }
  and handleExpressionEnd = (~result, tokens) =>
    switch (tokens) {
    | [Separator | EOF, ...tail] => aux(~result, tail)
    | _ => Compiler.Error.Syntax->Error
    };

  aux(tokens);
};