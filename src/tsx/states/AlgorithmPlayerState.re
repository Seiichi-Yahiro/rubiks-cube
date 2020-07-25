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
    currentMove: int,
    numberOfMoves: int,
  };

  let initial: t = {
    notation: "",
    status: Stopped,
    parseOutput: []->Ok,
    currentMove: 0,
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
    | NextMove
    | PrevMove
    | UpdateNumberOfMoves(int);
};

let reducer = (state: State.t, action: Action.t) =>
  switch (action) {
  | UpdateNotation(notation) => {...state, notation}
  | ParsedNotation(parseOutput) => {...state, parseOutput}
  | NextMove => {
      ...state,
      currentMove: min(state.currentMove + 1, state.numberOfMoves),
    }
  | PrevMove => {...state, currentMove: max(state.currentMove - 1, 0)}
  | UpdateNumberOfMoves(numberOfMoves) => {...state, numberOfMoves}
  | _ => state
  };