open Jest;
open Expect;
open Parser;

describe("Compiler", () => {
  test("should parse LRUDFBXYZMES", () => {
    ["L", "R", "U", "D", "F", "B", "X", "Y", "Z", "M", "E", "S"]
    ->Belt.List.map(parse)
    |> expect
    |> toEqual(
         RotationCommand.Letter.[
           Upper->L,
           Upper->R,
           Upper->U,
           Upper->D,
           Upper->F,
           Upper->B,
           Upper->X,
           Upper->Y,
           Upper->Z,
           Upper->M,
           Upper->E,
           Upper->S,
         ]
         ->Belt.List.map(letter =>
             [RotationCommand.Simple(letter, Deg90(Clockwise))]->Ok
           ),
       )
  });

  test("should parse lrudfbxyzmes", () => {
    ["l", "r", "u", "d", "f", "b", "x", "y", "z", "m", "e", "s"]
    ->Belt.List.map(parse)
    |> expect
    |> toEqual(
         RotationCommand.Letter.[
           Lower->L,
           Lower->R,
           Lower->U,
           Lower->D,
           Lower->F,
           Lower->B,
           Lower->X,
           Lower->Y,
           Lower->Z,
           Lower->M,
           Lower->E,
           Lower->S,
         ]
         ->Belt.List.map(letter =>
             [RotationCommand.Simple(letter, Deg90(Clockwise))]->Ok
           ),
       )
  });

  test("should parse letter and prime", () => {
    parse("F'")
    |> expect
    |> toEqual(
         [RotationCommand.Simple(Upper->F, Deg90(Counterclockwise))]->Ok,
       )
  });

  test("should parse letter and double", () => {
    parse("F2")
    |> expect
    |> toEqual([RotationCommand.Simple(Upper->F, Deg180(Clockwise))]->Ok)
  });

  test("should parse letter and prime and double", () => {
    parse("F'2")
    |> expect
    |> toEqual(
         [RotationCommand.Simple(Upper->F, Deg180(Counterclockwise))]->Ok,
       )
  });

  test("should parse letter and double and prime", () => {
    parse("F2'")
    |> expect
    |> toEqual(
         [RotationCommand.Simple(Upper->F, Deg180(Counterclockwise))]->Ok,
       )
  });

  test("should parse slice and upper LRUDFB", () => {
    ["3L", "3R", "3U", "3D", "3F", "3B"]->Belt.List.map(parse)
    |> expect
    |> toEqual(
         RotationCommand.Letter.[
           Upper->L,
           Upper->R,
           Upper->U,
           Upper->D,
           Upper->F,
           Upper->B,
         ]
         ->Belt.List.map(letter =>
             [RotationCommand.Full(3, letter, false, Deg90(Clockwise))]->Ok
           ),
       )
  });

  test("should parse slice and lrudfb", () => {
    ["3l", "3r", "3u", "3d", "3f", "3b"]->Belt.List.map(parse)
    |> expect
    |> toEqual(
         RotationCommand.Letter.[
           Lower->L,
           Lower->R,
           Lower->U,
           Lower->D,
           Lower->F,
           Lower->B,
         ]
         ->Belt.List.map(letter =>
             [RotationCommand.Full(3, letter, false, Deg90(Clockwise))]->Ok
           ),
       )
  });

  test("should not parse slice and XYZMESxyzmes", () => {
    let letters = [
      "X",
      "Y",
      "Z",
      "M",
      "E",
      "S",
      "x",
      "y",
      "z",
      "m",
      "e",
      "s",
    ];
    letters
    ->Belt.List.map(letter => "3" ++ letter)
    ->Belt.List.map(parse)
    ->Belt.List.map(Belt.Result.isError)
    |> expect
    |> toEqual(letters->Belt.List.map(_letter => true));
  });

  test("should parse slice and letter and wide", () => {
    let result =
      [RotationCommand.Full(3, Upper->F, true, Deg90(Clockwise))]->Ok;

    (parse("3Fw"), parse("3FW")) |> expect |> toEqual((result, result));
  });

  test("should parse slice and letter and wide and prime", () => {
    let result =
      [RotationCommand.Full(3, Upper->F, true, Deg90(Counterclockwise))]
      ->Ok;
    (parse("3Fw'"), parse("3FW'")) |> expect |> toEqual((result, result));
  });

  test("should parse slice and letter and wide and double", () => {
    let result =
      [RotationCommand.Full(3, Upper->F, true, Deg180(Clockwise))]->Ok;
    (parse("3Fw2"), parse("3FW2")) |> expect |> toEqual((result, result));
  });

  test("should parse slice and letter and wide and prime and double", () => {
    let result =
      [RotationCommand.Full(3, Upper->F, true, Deg180(Counterclockwise))]
      ->Ok;
    (parse("3Fw'2"), parse("3FW'2")) |> expect |> toEqual((result, result));
  });

  test("should parse slice and letter and wide and double and prime", () => {
    let result =
      [RotationCommand.Full(3, Upper->F, true, Deg180(Counterclockwise))]
      ->Ok;
    (parse("3Fw2'"), parse("3FW2'")) |> expect |> toEqual((result, result));
  });

  test("should error on unknown letter", () => {
    parse("ö")->Belt.Result.isError |> expect |> toBe(true)
  });

  test("should error on different double number", () => {
    parse("F5")->Belt.Result.isError |> expect |> toBe(true)
  });

  test("should error on non sliced wide", () => {
    ["Fw", "FW"]
    ->Belt.List.map(parse)
    ->Belt.List.map(Belt.Result.isError)
    ->Utils.foldl1(~f=(&&))
    |> expect
    |> toBe(true)
  });

  test("should error on direction before wide", () => {
    ["3F'w", "3F2w"]
    ->Belt.List.map(parse)
    ->Belt.List.map(Belt.Result.isError)
    ->Utils.foldl1(~f=(&&))
    |> expect
    |> toBe(true)
  });

  test("should parse multiple", () => {
    parse("F2 3U'")
    |> expect
    |> toEqual(
         [
           RotationCommand.Simple(Upper->F, Deg180(Clockwise)),
           RotationCommand.Full(3, Upper->U, false, Deg90(Counterclockwise)),
         ]
         ->Ok,
       )
  });

  test("should parse group", () => {
    parse("(F R)")
    |> expect
    |> toEqual(
         [
           RotationCommand.group([
             RotationCommand.Simple(Upper->F, Deg90(Clockwise)),
             RotationCommand.Simple(Upper->R, Deg90(Clockwise)),
           ]),
         ]
         ->Ok,
       )
  });

  test("should parse loop", () => {
    parse("(F R)10")
    |> expect
    |> toEqual(
         [
           RotationCommand.loop(
             [
               RotationCommand.Simple(Upper->F, Deg90(Clockwise)),
               RotationCommand.Simple(Upper->R, Deg90(Clockwise)),
             ],
             10,
           ),
         ]
         ->Ok,
       )
  });

  test("should parse nested", () => {
    parse("(((F)2 (R))2)")
    |> expect
    |> toEqual(
         [
           RotationCommand.group([
             RotationCommand.loop(
               [
                 RotationCommand.loop(
                   [RotationCommand.Simple(Upper->F, Deg90(Clockwise))],
                   2,
                 ),
                 RotationCommand.group([
                   RotationCommand.Simple(Upper->R, Deg90(Clockwise)),
                 ]),
               ],
               2,
             ),
           ]),
         ]
         ->Ok,
       )
  });

  test("should not error on empty group or loop", () => {
    (parse("()"), parse("()5"))
    |> expect
    |> toEqual((
         [RotationCommand.group([])]->Ok,
         [RotationCommand.loop([], 5)]->Ok,
       ))
  });

  test("should parse complex", () => {
    parse("2F' ( R2,(2Uw'2)2 )3(F),D")
    |> expect
    |> toEqual(
         [
           RotationCommand.Full(2, Upper->F, false, Deg90(Counterclockwise)),
           RotationCommand.loop(
             [
               RotationCommand.Simple(Upper->R, Deg180(Clockwise)),
               RotationCommand.loop(
                 [
                   RotationCommand.Full(
                     2,
                     Upper->U,
                     true,
                     Deg180(Counterclockwise),
                   ),
                 ],
                 2,
               ),
             ],
             3,
           ),
           RotationCommand.group([
             RotationCommand.Simple(Upper->F, Deg90(Clockwise)),
           ]),
           RotationCommand.Simple(Upper->D, Deg90(Clockwise)),
         ]
         ->Ok,
       )
  });
});