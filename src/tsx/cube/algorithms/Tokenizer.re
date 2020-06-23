module Case = {
  type t =
    | Upper
    | Lower;

  let fromString = letter =>
    letter === letter->Js.String2.toLowerCase ? Lower : Upper;
};

module Letter = {
  type t =
    | L
    | R
    | U
    | D
    | F
    | B
    | M
    | E
    | S
    | X
    | Y
    | Z;

  let fromString = letter => {
    switch (letter->Js.String2.toUpperCase) {
    | "L" => L->Some
    | "R" => R->Some
    | "U" => U->Some
    | "D" => D->Some
    | "F" => F->Some
    | "B" => B->Some
    | "M" => M->Some
    | "E" => E->Some
    | "S" => S->Some
    | "X" => X->Some
    | "Y" => Y->Some
    | "Z" => Z->Some
    | _ => None
    };
  };
};

module Token = {
  type t =
    | Letter(Letter.t, Case.t)
    | Wide
    | Prime
    | Number(int)
    | OpeningParenthesis
    | ClosingParenthesis
    | Separator
    | EOF;
};

let tokenize =
    (notation: string): Belt.Result.t(list(Token.t), Compiler.Error.t) => {
  open Token;
  let rec aux = (~result=[], chars) =>
    switch (chars) {
    | [] => result->Ok
    | [char, ...tail] when char->Utils.isInt =>
      let (ints, tail) = tail->Tablecloth.List.span(~f=Utils.isInt);
      let number =
        ints
        ->Belt.List.reduce("", (++))
        ->Belt.Int.fromString
        ->Belt.Option.getExn;
      aux(~result=[number->Number, ...result], tail);
    | [char, ...tail] =>
      let token =
        switch (char) {
        | "W"
        | "w" => Wide->Some
        | "'" => Prime->Some
        | "(" => OpeningParenthesis->Some
        | ")" => ClosingParenthesis->Some
        | " "
        | ","
        | ";"
        | "/"
        | "|" => Separator->Some
        | _ =>
          char
          ->Letter.fromString
          ->Belt.Option.map(letter => Letter(letter, char->Case.fromString))
        };

      switch (token) {
      | Some(token) => aux(~result=[token, ...result], tail)
      | None => char->Compiler.Error.UnknownExpression->Error
      };
    };

  let chars =
    Belt.List.makeBy(notation->Js.String2.length, Js.String2.get(notation));
  aux(chars)
  ->Belt.Result.map(Belt.List.add(_, EOF))
  ->Belt.Result.map(Belt.List.reverse);
};