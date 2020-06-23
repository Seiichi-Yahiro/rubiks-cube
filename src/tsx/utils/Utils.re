let isInt = value => value->Belt.Int.fromString->Belt.Option.isSome;
let mapHead = (items, f) =>
  switch (items) {
  | [] => []
  | [head, ...tail] => [head->f, ...tail]
  };