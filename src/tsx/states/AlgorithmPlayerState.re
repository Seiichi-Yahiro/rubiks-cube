module State = {
  type algorithmPlayerStatus =
    | Stopped
    | Playing
    | Paused
    | JumpToEnd;

  type t = {
    notation: string,
    status: algorithmPlayerStatus,
    parseOutput: result(list(RotationCommand.t), ReParse.ParseError.t),
    numberOfMoves: int,
  };

  let initial: t = {
    notation: "",
    status: Stopped,
    parseOutput: []->Ok,
    numberOfMoves: 0,
  };
};

module Action = {
  type t =
    | Play
    | Stop
    | Pause
    | JumpToEnd
    | UpdateNotation(string)
    | ParsedNotation(result(list(RotationCommand.t), ReParse.ParseError.t))
    | UpdateNumberOfMoves(int);
};

let reducer = (state: State.t, action: Action.t) =>
  switch (action) {
  | UpdateNotation(notation) => {...state, notation}
  | ParsedNotation(parseOutput) => {...state, parseOutput}
  | UpdateNumberOfMoves(numberOfMoves) => {...state, numberOfMoves}
  | _ => state
  };