[@bs.module] external interfaceScss: _ = "./Interface.scss";

module Categories = {
  module MenuType = {
    type t =
      | Errors
      | Algorithms
      | Settings
      | None;
  };

  [@react.component]
  let make = () => {
    let (openedMenu, setOpenedMenu) = React.useState(() => MenuType.Settings);
    let setMenu = (menu: MenuType.t) =>
      setOpenedMenu(prevMenu => prevMenu === menu ? None : menu);
    let parseOutput = Store.useSelector(Selectors.parseOutput);
    let hasErrors = parseOutput->Belt.Result.isError;

    MaterialUi.(
      <List>
        <Category
          disabled={!hasErrors}
          isOpen={hasErrors && openedMenu === Errors}
          setMenu={React.useCallback0(_ => Errors->setMenu)}
          title="Errors">
          {switch (parseOutput) {
           | Ok(_) => React.null
           | Error(errors) => errors->Parser.parseErrorToHtml
           }}
        </Category>
        <Category
          isOpen={openedMenu === Algorithms}
          setMenu={React.useCallback0(_ => Algorithms->setMenu)}
          title="Algorithms">
          <Algorithms />
        </Category>
        <Category
          isOpen={openedMenu === Settings}
          setMenu={React.useCallback0(_ => Settings->setMenu)}
          title="Settings">
          <Settings />
        </Category>
      </List>
    );
  };
};

[@react.component]
let make = () => {
  <div className="app__interface">
    <AlgorithmPlayer />
    <RotationPad radius=50.0 />
    <Categories />
  </div>;
};