module Error = {
  type t =
    | UnknownExpression(string)
    | Syntax;
};

/*module Lexer = {
    type t = {
      mutable index: int,
      source: array(string),
    };

    let create = source => {index: 0, source: source->Js.String2.split("")};

    let isAtEnd = parseable =>
      parseable.index >= parseable.source->Belt.Array.length;

    let advance = parseable => parseable.index = parseable.index + 1;

    let peek = parseable => parseable.source->Belt.Array.get(parseable.index);

    let next = parseable => {
      let value = parseable->peek;
      parseable->advance;
      value;
    };

    let match = (parseable, ~predicate) =>
      parseable
      ->peek
      ->Belt.Option.flatMap(next =>
          next->predicate
            ? {
              parseable->advance;
              next->Some;
            }
            : None
        );

    let while_let = (~while_: unit => option('a), ~do_: 'a => 'b): list('b) => {
        let collected = ref([]);
        let break = ref(false);

        while (! break^) {
          switch (while_()) {
          | Some(v) => collected := [v->do_, ...collected^]
          | None => break := true
          };
        };

        Belt.List.reverse(collected^)
      };

    let parse = (parseable: t) => {
      let rec aux = (~result, parseable) =>
        switch (parseable->next) {
        | None => result
        | Some(value) =>
          switch (value) {
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
            switch (value->Belt.Int.fromString) {
            | Some(number) => {
              while_let(~while_=parseable->match(~predicate=value => value->Belt.Int.fromString->Belt.Option.isSome), ~do=)
            }
            | None =>
              switch (char->Letter.fromString) {
              | Some(letter) => Letter(letter, char->Case.fromString)->Some
              | None => None
              }
            }
          }
        };
      ();
    };
  };*/