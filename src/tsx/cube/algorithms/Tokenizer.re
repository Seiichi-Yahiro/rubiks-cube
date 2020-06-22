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
    | Number(string)
    | OpeningParenthesis
    | ClosingParenthesis
    | Separator;

  let combine = tokens => {
    let rec aux = (~result=[], tokens) =>
      switch (tokens) {
      | [] => result
      | [Number(a), Number(b), ...tail] =>
        aux(~result=[Number(a ++ b), ...result], tail)
      | [Separator, Separator, ...tail] =>
        aux(~result=[Separator, ...result], tail)
      | [_, ...tail] => aux(~result, tail)
      };

    aux(tokens);
  };
};

let tokenize = (notation: string): list(Token.t) => {
  let rec aux = (~result=[], chars) =>
    switch (chars) {
    | [] => result
    | [char, ...tail] =>
      open Token;
      let token =
        switch (char) {
        | "W"
        | "w" => Wide->Some
        | "'" => Prime->Some
        | "(" => OpeningParenthesis->Some
        | ")" => ClosingParenthesis->Some
        | "0"
        | "1"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "8"
        | "9" => Number(char)->Some
        | " "
        | ","
        | ";"
        | "/"
        | "|" => Separator->Some
        | _ =>
          switch (char->Letter.fromString) {
          | Some(letter) => Letter(letter, char->Case.fromString)->Some
          | None => None
          }
        };

      let result =
        switch (token) {
        | Some(token) => [token, ...result]
        | None => result
        };

      aux(~result, tail);
    };

  let chars =
    Belt.List.makeBy(notation->Js.String2.length, Js.String2.get(notation));

  aux(chars)->Token.combine;
};