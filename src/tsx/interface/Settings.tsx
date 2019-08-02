import React from 'react';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { AlgorithmStatus } from '../states/AlgorithmPlayerState';
import { useGlobalState } from '../states/State';
import {
    updateCubeSizeAction,
    updateNumberOfCubesAction,
    updateRotationAnimationSpeedAction,
    updateViewType
} from '../states/SettingsActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { ViewType } from '../cube/CubeTypes';

const Settings: React.FunctionComponent = () => {
    const [state, dispatch] = useGlobalState();
    const { numberOfCubes, cubeSize, rotationAnimationSpeed, playerStatus, view } = state;
    const isDisabled = playerStatus !== AlgorithmStatus.STOPPED;

    return (
        <List disablePadding={true} dense={true} className="interface-list">
            <ListItem className="interface-list__item--settings">
                <FormControlLabel
                    control={
                        <Switch
                            defaultChecked={view === ViewType.D2}
                            onChange={(event, value) => dispatch(updateViewType(value ? ViewType.D2 : ViewType.D3))}
                            color="primary"
                        />
                    }
                    label="2D View"
                />
            </ListItem>
            <ListItem className="interface-list__item--settings">
                <Typography id="number-of-cubes-slider">Number of cubes</Typography>
                <Slider
                    aria-labelledby="number-of-cubes-slider"
                    valueLabelDisplay="auto"
                    marks={true}
                    step={1}
                    min={2}
                    max={5}
                    defaultValue={numberOfCubes}
                    onChangeCommitted={(event, value) => dispatch(updateNumberOfCubesAction(value as number))}
                    disabled={isDisabled}
                />
            </ListItem>
            <ListItem className="interface-list__item--settings">
                <Typography id="size-slider">Size</Typography>
                <Slider
                    aria-labelledby="size-slider"
                    valueLabelDisplay="auto"
                    marks={true}
                    step={50}
                    min={100}
                    max={view === ViewType.D3 ? 600 : 300}
                    defaultValue={cubeSize}
                    onChangeCommitted={(event, value) => dispatch(updateCubeSizeAction(value as number))}
                    disabled={isDisabled}
                />
            </ListItem>
            <ListItem className="interface-list__item--settings">
                <Typography id="animation-duration-slider">Animation duration</Typography>
                <Slider
                    aria-labelledby="animation-duration-slider"
                    valueLabelDisplay="auto"
                    min={100}
                    max={2000}
                    step={50}
                    defaultValue={rotationAnimationSpeed}
                    onChangeCommitted={(event, value) => dispatch(updateRotationAnimationSpeedAction(value as number))}
                    disabled={view === ViewType.D2}
                />
            </ListItem>
        </List>
    );
};

export default React.memo(Settings);
