import React, { useCallback } from 'react';
import { Chip, IconButton, TextField, Typography } from '@material-ui/core';
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
import { Failure } from 'parsimmon';

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
                spellCheck={false}
                multiline={true}
            />
            {isError(rotationCommands) && (
                <NotationError
                    notation={playerNotation}
                    error={rotationCommands}
                />
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

interface NotationErrorProps {
    notation: string;
    error: Failure;
}

const NotationError: React.FunctionComponent<NotationErrorProps> = ({
    notation,
    error,
}) => (
    <>
        <Typography
            className="MuiInputBase-root"
            style={{
                display: 'initial',
                position: 'absolute',
                top: 30,
                pointerEvents: 'none',
            }}
        >
            <span style={{ visibility: 'hidden', whiteSpace: 'pre-wrap' }}>
                {notation.substring(0, error.index.offset)}
            </span>
            <span style={{ position: 'relative' }}>
                <span
                    style={{
                        color: '#f44336',
                        position: 'absolute',
                        top: 12,
                    }}
                >
                    ^
                </span>
            </span>
        </Typography>

        <div style={{ marginTop: 5, marginBottom: 5 }}>
            {error.expected.map((errorMsg) => (
                <Chip
                    style={{ marginRight: 2 }}
                    key={errorMsg}
                    color={'secondary'}
                    size={'small'}
                    label={errorMsg}
                />
            ))}
        </div>
    </>
);

export default React.memo(Player);
