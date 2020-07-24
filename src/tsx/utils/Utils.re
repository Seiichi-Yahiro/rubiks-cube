let rec foldl1 = (items, ~f) =>
  switch (items) {
  | [] => Js.Exn.raiseError("Can't foldl1 an empty list!")
  | [item] => item
  | [item1, item2, ...tail] => foldl1([f(item1, item2), ...tail], ~f)
  };

let unwords = Tablecloth.String.join(~sep=" ");

let mapError = (result, f) =>
  switch (result) {
  | Error(error) => error->f->Error
  | Ok(_) as result => result
  };