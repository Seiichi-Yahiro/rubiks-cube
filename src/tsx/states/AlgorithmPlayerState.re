module State = {
  type algorithmPlayerStatus =
    | Stopped
    | Playing
    | Paused
    | JumpToEnd;

  type t = {
    notation: string,
    status: algorithmPlayerStatus,
  };

  let initial: t = {notation: "", status: Stopped};
};

module Action = {
  type t =
    | Play
    | Stop
    | Pause
    | JumpToEnd
    | UpdateNotation(string);
};

let reducer = (state: State.t, action: Action.t) =>
  switch (action) {
  | UpdateNotation(notation) => {...state, notation}
  | Play => {...state, status: Playing}
  | Pause => {...state, status: Paused}
  | Stop => {...state, status: Stopped}
  | _ => state
  };