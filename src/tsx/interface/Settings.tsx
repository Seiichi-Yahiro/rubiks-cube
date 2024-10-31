import React, { useMemo } from 'react';
import { Typography, Slider, List, ListItem } from '@mui/material';
import { PlayerStatus } from '../states/player/PlayerState';
import { cubeActions } from '../states/cube/CubeActions';
import { useAppDispatch, useRedux } from '../hooks/redux';
import ColorPicker from './ColorPicker';

const Settings: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const cubeDimension = useRedux((state) => state.cube.dimension);
    const rotationAnimationSpeed = useRedux(
        (state) => state.cube.rotationDuration,
    );
    const playerStatus = useRedux((state) => state.player.status);

    return (
        <List disablePadding={true} dense={true} className="w-full">
            <ListItem className="flex flex-col">
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
                    defaultValue={useMemo(() => cubeDimension, [])}
                    onChangeCommitted={(event, value) =>
                        dispatch(cubeActions.setCubeDimension(value as number))
                    }
                    disabled={playerStatus !== PlayerStatus.STOPPED}
                />
            </ListItem>
            <ListItem className="flex flex-col">
                <Typography id="animation-duration-slider">
                    Animation duration
                </Typography>
                <Slider
                    aria-labelledby="animation-duration-slider"
                    valueLabelDisplay="auto"
                    min={100}
                    max={2000}
                    step={50}
                    defaultValue={useMemo(() => rotationAnimationSpeed, [])}
                    onChangeCommitted={(event, value) =>
                        dispatch(
                            cubeActions.setRotationAnimationSpeed(
                                value as number,
                            ),
                        )
                    }
                />
            </ListItem>
            <ListItem>
                <ColorPicker />
            </ListItem>
        </List>
    );
};

export default React.memo(Settings);
