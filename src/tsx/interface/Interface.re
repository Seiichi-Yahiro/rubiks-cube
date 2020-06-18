[@bs.module] external interfaceScss: _ = "./Interface.scss";

module Categories = {
  module MenuType = {
    type t =
      | Algorithms
      | Settings
      | None;
  };

  [@react.component]
  let make = () => {
    let (openedMenu, setOpenedMenu) = React.useState(() => MenuType.Settings);
    let setMenu = (menu: MenuType.t) =>
      setOpenedMenu(prevMenu => prevMenu === menu ? None : menu);
    MaterialUi.(
      <List>
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