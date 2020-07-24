open ReParse.Parser;
open Combinators;
open Operators;

let (>>) = Tablecloth.Fun.composeRight;

let parseUInt =
  Utils.foldl1(~f=(++))
  >> (num => num->Belt.Int.fromString->Belt.Option.getExn)
  <$> decimalDigit->some->label("integer");

let parseWide = [char("w"), char("W")]->choice->label("wide");

let parsePrime = char("'")->label("prime");
let parseDouble = char("2")->label("double");

let parseSliceableLetter = {
  let upper =
    ["L", "R", "U", "D", "F", "B"]
    ->anyCharOf
    ->label("sliceable upper case letter");
  let lower =
    ["l", "r", "u", "d", "f", "b"]
    ->anyCharOf
    ->label("sliceable lower case letter");
  [upper, lower]->choice;
};

let parseNonSliceableLetter = {
  let upper =
    ["X", "Y", "Z", "M", "E", "S"]
    ->anyCharOf
    ->label("non sliceable upper case letter");
  let lower =
    ["x", "y", "z", "m", "e", "s"]
    ->anyCharOf
    ->label("non sliceable lower case letter");
  [upper, lower]->choice;
};

let parseOpeningParenthesis = char("(")->label("parenthesis");
let parseClosingParenthesis = char(")")->label("parenthesis");

let parseSeparator = {
  let parenthesis =
    [parseOpeningParenthesis, parseClosingParenthesis]->choice->shouldSucceed;

  [spaces <* [() <$ char(","), parenthesis, eof]->choice, char(" ")->some]
  ->choice;
};

let parseDirection = {
  let parsePrime = RotationCommand.prime <$ parsePrime;
  let parseDouble = RotationCommand.double <$ parseDouble;

  [
    Tablecloth.Fun.compose <$> parsePrime <*> parseDouble,
    Tablecloth.Fun.compose <$> parseDouble <*> parsePrime,
    parsePrime,
    parseDouble,
  ]
  ->choice;
};

let parseSimple = {
  let parseLetter =
    RotationCommand.Letter.fromString
    >> Belt.Option.getExn
    >> RotationCommand.simple
    <$> [parseSliceableLetter, parseNonSliceableLetter]->choice;

  Tablecloth.Fun.flip(Tablecloth.Fun.apply)
  <$> parseLetter
  <*> [parseDirection, Tablecloth.Fun.identity->pure]->choice;
};

let parseFull = {
  let parseLetter =
    RotationCommand.Letter.fromString
    >> Belt.Option.getExn
    <$> parseSliceableLetter;

  let parseFull = RotationCommand.full <$> parseUInt <*> parseLetter;
  let parseWide = RotationCommand.wide <$ parseWide;

  Tablecloth.Fun.flip(Tablecloth.Fun.apply)
  <$> parseFull
  <*> [
        Tablecloth.Fun.compose <$> parseWide <*> parseDirection,
        parseWide,
        parseDirection,
        Tablecloth.Fun.identity->pure,
      ]
      ->choice;
};

let parse = str => {
  let rec parser = () =>
    spaces
    *> [parseSimple, parseFull, parseParentheses->defer]->choice
    <* parseSeparator

  and parseParentheses = () =>
    RotationCommand.loop
    <$> parseOpeningParenthesis
    *> parser->defer->repeatGreedyTill(~till=parseClosingParenthesis)
    <*> [parseUInt, pure(1)]->choice;

  parser->defer->repeatGreedyTill(~till=eof)->ReParse.Parser.runParser(str);
};

let createIndentationStyle = () =>
  ReactDOMRe.Style.make(~marginLeft="20px", ());

let errorToHtml = (error: ReParse.Error.t) => {
  let error =
    switch (error) {
    | IncompleteParse(optPos) =>
      let msg = "expected to consume the entire stream"->React.string;
      switch (optPos) {
      | None => <> msg </>
      | Some(pos) =>
        <>
          msg
          " but characters remain at position "->React.string
          <span className="algorithm-player-error__pos">
            {pos->ReParse.Pos.toString->React.string}
          </span>
        </>
      };
    | UnexpectedSuccess(optPos) =>
      switch (optPos) {
      | Some(pos) =>
        <>
          "unexpected success at"->React.string
          <span className="algorithm-player-error__pos">
            {pos->ReParse.Pos.toString->React.string}
          </span>
        </>
      | None => <> "unexpected success"->React.string </>
      }
    | UnexpectedEOF(token) =>
      <>
        "expected "->React.string
        <span className="algorithm-player-error__expected">
          token->React.string
        </span>
        " but reached end of stream"->React.string
      </>
    | UnexpectedToken(token, optExpected, pos) =>
      let pos = pos->ReParse.Pos.toString->React.string;
      switch (optExpected) {
      | Some(expected) =>
        <>
          "expected "->React.string
          <span className="algorithm-player-error__expected">
            expected->React.string
          </span>
          " but got "->React.string
          <span className="algorithm-player-error__got">
            token->React.string
          </span>
          " at "->React.string
          <span className="algorithm-player-error__pos"> pos </span>
        </>
      | None =>
        <>
          "expected end of stream but got "->React.string
          <span className="algorithm-player-error__got">
            token->React.string
          </span>
          " at "->React.string
          <span className="algorithm-player-error__pos"> pos </span>
        </>
      };
    | UnexpectedSatisfy(token, msg, pos) =>
      <>
        "expected "->React.string
        <span className="algorithm-player-error__expected">
          msg->React.string
        </span>
        " but got "->React.string
        <span className="algorithm-player-error__got">
          token->React.string
        </span>
        " at "->React.string
        <span className="algorithm-player-error__pos">
          {pos->ReParse.Pos.toString->React.string}
        </span>
      </>
    };

  <div> error </div>;
};

let rec parseErrorToHtml = (parseError: ReParse.ParseError.t) =>
  switch (parseError) {
  | Simply(error) => errorToHtml(error)
  | OneOf(errors) =>
    <div>
      "one of the following:"->React.string
      {errors
       ->Belt.List.map(parseErrorToHtml)
       ->Belt.List.mapWithIndex((index, error) =>
           <div
             key={index->Belt.Int.toString} style={createIndentationStyle()}>
             error
           </div>
         )
       ->Belt.List.toArray
       ->React.array}
    </div>
  | Because(annotation, parseError) =>
    let annotation =
      switch (annotation) {
      | Lookahead(optPos) =>
        <>
          "successfull lookahead at "->React.string
          {optPos
           ->Belt.Option.map(ReParse.Pos.toString)
           ->Belt.Option.map(pos =>
               <span className="algorithm-player-error__pos">
                 pos->React.string
               </span>
             )
           ->Belt.Option.getWithDefault("end of stream"->React.string)}
        </>
      | Note(msg, optPos) =>
        switch (optPos) {
        | None => msg->React.string
        | Some(pos) =>
          <>
            <span className="algorithm-player-error__expected">
              msg->React.string
            </span>
            " at "->React.string
            <span className="algorithm-player-error__pos">
              {pos->ReParse.Pos.toString->React.string}
            </span>
          </>
        }
      };
    let error = parseErrorToHtml(parseError);
    <div>
      "expected "->React.string
      annotation
      " which failed due to "->React.string
      <div style={createIndentationStyle()}> error </div>
    </div>;
  };