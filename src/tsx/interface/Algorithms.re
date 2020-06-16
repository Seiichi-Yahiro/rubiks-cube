let categories = [];
let filterCategories = (searchValue: string) => [];

[@react.component]
let make = () => {
  let dispatch = Store.useDispatch();
  let playerStatus = Store.useSelector(Selectors.playerStatus);

  let (filteredCategories, setFilteredCategories) = React.useState(() => categories);

  let filter = event => {
    let categories = event->ReactEvent.Form.target##value->String.lowercase_ascii->filterCategories;
    setFilteredCategories(_ => categories);
  };

  MaterialUi.(
    <List disablePadding=true dense=true className="interface-list interface-algorithm-list">
      <ListSubheader className="interface-algorithm-list__filter">
        <TextField label={"Search"->React.string} fullWidth=true onChange=filter />
      </ListSubheader>
    </List>
  );
};