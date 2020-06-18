[@bs.module] external appScss: _ = "./App.scss";

[@react.component]
let make = () => {
  let dispatch = Store.useDispatch();
  React.useEffect0(() => {
    Init->dispatch;
    None;
  });

  <div className="app"> <Interface /> <RubiksCube /> </div>;
};