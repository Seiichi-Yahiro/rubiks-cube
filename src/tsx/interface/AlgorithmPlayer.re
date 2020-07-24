[@bs.module] external algorithmPlayerScss: _ = "./AlgorithmPlayer.scss";

[@react.component]
let make = () => {
  let dispatch = Store.useDispatch();
  let numberOfCubicles = Store.useSelector(Selectors.numberOfCubicles);
  let playerNotation = Store.useSelector(Selectors.playerNotation);
  let playerStatus = Store.useSelector(Selectors.playerStatus);
  let parseOutput = Store.useSelector(Selectors.parseOutput);

  let updateNotation = event => {
    let value = event->ReactEvent.Form.target##value;
    value->UpdateNotation->AlgorithmPlayerAction->dispatch;
  };

  let isNotationEmpty =
    parseOutput
    ->Belt.Result.map(Belt.List.length)
    ->Belt.Result.getWithDefault(0)
    === 0;
  let isStopped = playerStatus === Stopped;

  let onStop = _ => Stop->AlgorithmPlayerAction->dispatch;
  let onJumpToEnd = _ => JumpToEnd->AlgorithmPlayerAction->dispatch;
  let onShuffle = _ => (); // TODO
  let onRefresh = _ =>
    numberOfCubicles->UpdateNumberOfCubicles->CubeAction->dispatch; // TODO separate action?

  MaterialUi.(
    <div className="algorithm-player">
      <TextField
        label={"Algorithm"->React.string}
        fullWidth=true
        value={playerNotation->`String}
        onChange=updateNotation
        disabled={!isStopped}
      />
      <div className="algorithm-player__buttons">
        <div>
          {switch (playerStatus) {
           | Stopped
           | Paused =>
             let onPlay = _ => (); // TODO

             <IconButton onClick=onPlay disabled=isNotationEmpty>
               <MscharleyBsMaterialUiIcons.PlayArrow.Filled />
             </IconButton>;
           | Playing =>
             let onPause = _ => Pause->AlgorithmPlayerAction->dispatch;

             <IconButton onClick=onPause>
               <MscharleyBsMaterialUiIcons.Pause.Filled />
             </IconButton>;
           | _ => React.null
           }}
          <IconButton onClick=onStop disabled=isStopped>
            <MscharleyBsMaterialUiIcons.Stop.Filled />
          </IconButton>
          <IconButton
            onClick=onJumpToEnd
            disabled={playerStatus === Playing || isNotationEmpty}>
            <MscharleyBsMaterialUiIcons.SkipNext.Filled />
          </IconButton>
        </div>
        <div>
          <IconButton onClick=onShuffle disabled={!isStopped}>
            <MscharleyBsMaterialUiIcons.Shuffle.Filled />
          </IconButton>
          <IconButton onClick=onRefresh disabled={!isStopped}>
            <MscharleyBsMaterialUiIcons.Refresh.Filled />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

let make = React.memo(make);