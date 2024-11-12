import {
    Pause,
    PlayArrow,
    Refresh,
    Shuffle,
    SkipNext,
    Stop,
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { createRandomNotation } from 'src/algorithms/parser';
import { isError, isOk } from 'src/algorithms/rotationCommand';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { playerActions } from 'src/redux/player/playerActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import NotationInput from 'src/tsx/interface/NotationInput';

const Player: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const cubeDimension = useRedux((state) => state.cube.dimension);
    const playerNotation = useRedux((state) => state.player.notation);
    const playerStatus = useRedux((state) => state.player.status);
    const rotationCommands = useRedux((state) => state.player.rotationCommands);

    const updateNotation = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(playerActions.updateNotation(event.target.value)),
        [],
    );

    const hasParseError = isError(rotationCommands);
    const isNotationEmpty = playerNotation.length === 0;
    const isStopped = playerStatus === PlayerStatus.STOPPED;

    const onPlay = () => {
        if (playerStatus === PlayerStatus.STOPPED && isOk(rotationCommands)) {
            dispatch(playerActions.play(rotationCommands.value));
        } else if (playerStatus === PlayerStatus.PAUSED) {
            dispatch(playerActions.unPause());
        }
    };
    const onPause = () => dispatch(playerActions.pause());
    const onStop = () => dispatch(playerActions.stop());

    const onJumpToEnd = () => {
        if (isOk(rotationCommands)) {
            dispatch(cubeActions.applyRotationCommands(rotationCommands.value));
        }
    };

    const onShuffle = () =>
        dispatch(
            playerActions.updateNotation(createRandomNotation(cubeDimension)),
        );

    const onRefresh = () => dispatch(cubeActions.resetCube());

    return (
        <div className="relative flex flex-1 flex-col md:w-full md:flex-none">
            <NotationInput
                playerNotation={playerNotation}
                updateNotation={updateNotation}
                isStopped={isStopped}
                hasParseError={hasParseError}
                rotationCommands={rotationCommands}
            />
            <div className="flex flex-row justify-between">
                <div>
                    {playerStatus === PlayerStatus.PLAYING ? (
                        <Tooltip title={t('player.input.pause')}>
                            <IconButton onClick={onPause}>
                                <Pause />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title={t('player.input.play')}>
                            <IconButton
                                onClick={onPlay}
                                disabled={isNotationEmpty || hasParseError}
                            >
                                <PlayArrow />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title={t('player.input.stop')}>
                        <IconButton onClick={onStop} disabled={isStopped}>
                            <Stop />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t('player.input.skip')}>
                        <IconButton
                            onClick={onJumpToEnd}
                            disabled={
                                !isStopped || isNotationEmpty || hasParseError
                            }
                        >
                            <SkipNext />
                        </IconButton>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title={t('player.input.shuffle')}>
                        <IconButton onClick={onShuffle} disabled={!isStopped}>
                            <Shuffle />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t('player.input.reset')}>
                        <IconButton onClick={onRefresh} disabled={!isStopped}>
                            <Refresh />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Player);
