import React, { useCallback } from 'react';
import { Chip, IconButton, TextField } from '@material-ui/core';
import './Player.scss';
import { PlayerStatus } from '../states/player/PlayerState';
import {
    Pause,
    PlayArrow,
    Refresh,
    Shuffle,
    SkipNext,
    Stop,
} from '@material-ui/icons';
import { playerActions } from '../states/player/PlayerActions';
import { useDispatch } from 'react-redux';
import { useRedux } from '../states/States';
import { isError, isOk } from '../cube/algorithms/RotationCommand';
import { cubeActions } from '../states/cube/CubeActions';
import { createRandomNotation } from '../cube/algorithms/Parser';

const Player: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const cubeDimension = useRedux((state) => state.cube.dimension);
    const playerNotation = useRedux((state) => state.player.notation);
    const playerStatus = useRedux((state) => state.player.status);
    const rotationCommands = useRedux((state) => state.player.rotationCommands);

    const updateNotation = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(playerActions.updateNotation(event.target.value)),
        []
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
            playerActions.updateNotation(createRandomNotation(cubeDimension))
        );

    const onRefresh = () => dispatch(cubeActions.resetCube());

    return (
        <div className="algorithm-player">
            <TextField
                label="Algorithm"
                fullWidth={true}
                value={playerNotation}
                onChange={updateNotation}
                disabled={!isStopped}
                error={hasParseError}
            />
            {isError(rotationCommands) && (
                <div style={{ marginTop: 5, marginBottom: 5 }}>
                    {rotationCommands.expected.map((errorMsg) => (
                        <Chip
                            key={errorMsg}
                            color={'secondary'}
                            size={'small'}
                            label={errorMsg}
                        />
                    ))}
                </div>
            )}
            <div className="algorithm-player__buttons">
                <div>
                    {playerStatus === PlayerStatus.PLAYING ? (
                        <IconButton onClick={onPause}>
                            <Pause />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={onPlay}
                            disabled={isNotationEmpty || hasParseError}
                        >
                            <PlayArrow />
                        </IconButton>
                    )}
                    <IconButton onClick={onStop} disabled={isStopped}>
                        <Stop />
                    </IconButton>
                    <IconButton
                        onClick={onJumpToEnd}
                        disabled={
                            !isStopped || isNotationEmpty || hasParseError
                        }
                    >
                        <SkipNext />
                    </IconButton>
                </div>
                <div>
                    <IconButton onClick={onShuffle} disabled={!isStopped}>
                        <Shuffle />
                    </IconButton>
                    <IconButton onClick={onRefresh} disabled={!isStopped}>
                        <Refresh />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Player);
