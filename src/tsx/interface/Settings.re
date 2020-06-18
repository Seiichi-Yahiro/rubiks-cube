type intOrFloat = [ | `Int(int) | `Float(float)];

type sliderProps = {
  id: string,
  text: string,
  step: intOrFloat,
  min: intOrFloat,
  max: intOrFloat,
  defaultValue: intOrFloat,
  onChange: (ReactEvent.Form.t, int) => unit,
  disabled: bool,
};

[@react.component]
let make = () => {
  let dispatch = Store.useDispatch();
  let numberOfCubicles = Store.useSelector(Selectors.numberOfCubicles);
  let scale = Store.useSelector(Selectors.scale);
  let rotationAnimationSpeed =
    Store.useSelector(Selectors.rotationAnimationSpeed);
  let playerStatus = Store.useSelector(Selectors.playerStatus);

  let numberOfCubiclesSliderId = "number-of-cubicles-slider";
  let scaleSliderId = "scale-slider";
  let rotationAnimationSpeedSliderId = "rotation-animation-speed-slider";

  MaterialUi.(
    <List disablePadding=true dense=true className="interface-list">
      <ListItem className="interface-list__item--settings">
        <Typography id=numberOfCubiclesSliderId>
          "Number of cubicles"->React.string
        </Typography>
        <Slider
          aria_labelledby=numberOfCubiclesSliderId
          valueLabelDisplay=`Auto
          marks={`Bool(true)}
          step={`Int(1)}
          min={`Int(1)}
          max={`Int(5)}
          defaultValue={React.useMemo0(() => `Int(numberOfCubicles))}
          onChangeCommitted={(_, value) =>
            value->UpdateNumberOfCubicles->CubeAction->dispatch
          }
          disabled={playerStatus !== Stopped}
        />
      </ListItem>
      <ListItem className="interface-list__item--settings">
        <Typography id=scaleSliderId> "Scale"->React.string </Typography>
        <Slider
          aria_labelledby=scaleSliderId
          valueLabelDisplay=`Auto
          marks={`Bool(true)}
          step={`Float(0.1)}
          min={`Float(0.5)}
          max={`Float(2.0)}
          defaultValue={React.useMemo0(() => `Float(scale))}
          // Type bug? It's actually already a float.
          onChangeCommitted={(_, value) =>
            value->float_of_int->UpdateScale->CubeAction->dispatch
          }
          disabled={playerStatus !== Stopped}
        />
      </ListItem>
      <ListItem className="interface-list__item--settings">
        <Typography id=rotationAnimationSpeedSliderId>
          "Animation duration"->React.string
        </Typography>
        <Slider
          aria_labelledby=rotationAnimationSpeedSliderId
          valueLabelDisplay=`Auto
          marks={`Bool(true)}
          step={`Int(50)}
          min={`Int(100)}
          max={`Int(2000)}
          defaultValue={React.useMemo0(() => `Int(rotationAnimationSpeed))}
          onChangeCommitted={(_, value) =>
            value->UpdateRotationAnimationSpeed->CubeAction->dispatch
          }
        />
      </ListItem>
    </List>
  );
};

let make = React.memo(make);