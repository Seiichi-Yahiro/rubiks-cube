import React, { useCallback } from 'react';
import { Chip, IconButton, TextField, Typography } from '@mui/material';
import { PlayerStatus } from '../states/player/PlayerState';
import {
    Pause,
    PlayArrow,
    Refresh,
    Shuffle,
    SkipNext,
    Stop,
} from '@mui/icons-material';
import { playerActions } from '../states/player/PlayerActions';
import { useAppDispatch, useRedux } from '../hooks/redux';
import { isError, isOk } from '../cube/algorithms/RotationCommand';
import { cubeActions } from '../states/cube/CubeActions';
import { createRandomNotation } from '../cube/algorithms/Parser';
import { Failure } from 'parsimmon';

const Player: React.FC = () => {
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
            <TextField
                label="Algorithm"
                variant="standard"
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
            <div className="flex flex-row justify-between">
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

const NotationError: React.FC<NotationErrorProps> = ({ notation, error }) => (
    <>
        <Typography className="pointer-events-none !absolute top-[20px] whitespace-pre-wrap ![display:initial] ![line-height:1.4375em]">
            <span className="invisible">
                {notation.substring(0, error.index.offset)}
            </span>
            <span className="text-error underline decoration-error">
                {notation.substring(error.index.offset, error.index.offset + 1)}
            </span>
        </Typography>

        <div className="my-1 space-x-0.5">
            {error.expected.map((errorMsg) => (
                <Chip
                    key={errorMsg}
                    color="error"
                    size="small"
                    label={errorMsg}
                />
            ))}
        </div>
    </>
);

export default React.memo(Player);
