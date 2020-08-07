import React from 'react';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { PlayerStatus } from '../states/player/PlayerState';
import { cubeActions } from '../states/cube/CubeActions';
import { useDispatch } from 'react-redux';
import { useRedux } from '../states/States';

const Settings: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const cubeDimension = useRedux((state) => state.cube.dimension);
    const scale = useRedux((state) => state.cube.scale);
    const rotationAnimationSpeed = useRedux(
        (state) => state.cube.rotationDuration
    );
    const playerStatus = useRedux((state) => state.player.status);

    const isDisabled = playerStatus !== PlayerStatus.STOPPED;

    // TODO onChange
    return (
        <List disablePadding={true} dense={true} className="interface-list">
            <ListItem className="interface-list__item--settings">
                <Typography id="cube-dimension-slider">
                    Cube dimension
                </Typography>
                <Slider
                    aria-labelledby="cube-dimension-slider"
                    valueLabelDisplay="auto"
                    marks={true}
                    step={1}
                    min={1}
                    max={5}
                    defaultValue={cubeDimension}
                    onChangeCommitted={(event, value) =>
                        dispatch(cubeActions.setCubeDimension(value as number))
                    }
                    disabled={isDisabled}
                />
            </ListItem>
            <ListItem className="interface-list__item--settings">
                <Typography id="scale-slider">Scale</Typography>
                <Slider
                    aria-labelledby="scale-slider"
                    valueLabelDisplay="auto"
                    marks={true}
                    step={0.1}
                    min={0.2}
                    max={2.0}
                    defaultValue={scale}
                    onChangeCommitted={(event, value) =>
                        dispatch(cubeActions.setCubeScale(value as number))
                    }
                    disabled={isDisabled}
                />
            </ListItem>
            <ListItem className="interface-list__item--settings">
                <Typography id="animation-duration-slider">
                    Animation duration
                </Typography>
                <Slider
                    aria-labelledby="animation-duration-slider"
                    valueLabelDisplay="auto"
                    min={100}
                    max={2000}
                    step={50}
                    defaultValue={rotationAnimationSpeed}
                    onChangeCommitted={(event, value) =>
                        dispatch(
                            cubeActions.setRotationAnimationSpeed(
                                value as number
                            )
                        )
                    }
                />
            </ListItem>
        </List>
    );
};

export default React.memo(Settings);
