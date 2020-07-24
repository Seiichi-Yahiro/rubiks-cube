[@react.component]
let make =
    (
      ~title: string,
      ~isOpen: bool,
      ~setMenu: _ => unit,
      ~children,
      ~disabled=false,
    ) =>
  MaterialUi.(
    {
      <ListItem className="interface-list__item">
        <ExpansionPanel
          expanded=isOpen
          disabled
          _TransitionProps={"unmountOnExit": true}
          className="interface-category">
          <ExpansionPanelSummary
            onClick=setMenu
            expandIcon={<MscharleyBsMaterialUiIcons.ExpandMore.Filled />}
            className="interface-category__summary">
            <Typography> title </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="interface-category__details">
            children
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </ListItem>;
    }
  );