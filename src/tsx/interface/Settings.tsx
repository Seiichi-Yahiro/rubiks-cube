import { List, ListItem, Slider, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { PlayerStatus } from 'src/redux/player/playerState';
import ColorPicker from 'src/tsx/interface/ColorPicker';

const Settings: React.FC = () => {
    const dispatch = useAppDispatch();
    const cubeDimension = useRedux((state) => state.cube.dimension);
    const rotationAnimationSpeed = useRedux(
        (state) => state.cube.rotationDuration,
    );
    const playerStatus = useRedux((state) => state.player.status);

    const { t } = useTranslation();

    return (
        <List disablePadding={true} dense={true} className="w-full">
            <ListItem className="flex flex-col">
                <Typography id="cube-dimension-slider">
                    {t('interface.settings.cube-dimension')}
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
                    {t('interface.settings.animation-duration')}
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
