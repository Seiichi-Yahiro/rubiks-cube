[@bs.val] [@bs.scope "console"]
external logDispatch:
  (string, string, string, 'a, string, string, 'b, string, string, 'c) => unit =
  "log";

let prevStateColor = "color: #6e6e6e;";
let actionColor = "color: #0c7dbd;";
let nextStateColor = "color: #239922;";
let colorReset = "color: initial;";

let format = "%cprev state %c%o
%caction %c%o
%cnext state %c%o";

let logger = (store, next, action) => {
  let prevState = Reductive.Store.getState(store);
  let returnValue = next(action);
  let nextState = Reductive.Store.getState(store);

  logDispatch(
    format,
    prevStateColor,
    colorReset,
    prevState,
    actionColor,
    colorReset,
    action,
    nextStateColor,
    colorReset,
    nextState,
  );
  returnValue;
};