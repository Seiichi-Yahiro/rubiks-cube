import {
    CirclePause,
    CirclePlay,
    CircleStop,
    RefreshCcw,
    Shuffle,
    SkipBack,
    SkipForward,
    StepBack,
    StepForward,
} from 'lucide-react';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { createRandomNotation } from 'src/algorithms/parser';
import { isError, isOk } from 'src/algorithms/rotationCommand';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { Direction, playerActions } from 'src/redux/player/playerActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import IconButton from 'src/tsx/components/IconButton';

const PlayerButtons: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const cubeDimension = useRedux((state) => state.cube.dimension);

    const rotationCommands = useRedux((state) => state.player.rotationCommands);
    const isNotationInvalid =
        isError(rotationCommands) || rotationCommands.value.length === 0;

    const noCommandsExecuted = useRedux(
        (state) => state.player.executedRotationCommands === 0,
    );
    const allCommandsExecuted = useRedux(
        (state) =>
            state.player.executedRotationCommands ===
            state.player.totalRotationCommands,
    );

    const tooManyRotationCommands = useRedux(
        (state) => state.player.totalRotationCommands > 1000,
    );

    const isAnimatingRotationCommand = useRedux(
        (state) => state.cube.animation !== undefined,
    );

    const playerStatus = useRedux((state) => state.player.status);
    const isStopped = playerStatus === PlayerStatus.STOPPED;
    const isPlaying = playerStatus === PlayerStatus.PLAYING;
    const isPaused = playerStatus === PlayerStatus.PAUSED;

    const onPlay = useCallback(() => {
        if (isStopped && isOk(rotationCommands)) {
            dispatch(playerActions.play(rotationCommands.value));
        } else if (isPaused) {
            dispatch(playerActions.resume());
        }
    }, [dispatch, isPaused, isStopped, rotationCommands]);

    const onPause = useCallback(
        () => dispatch(playerActions.pause()),
        [dispatch],
    );

    const onStop = useCallback(
        () => dispatch(playerActions.stop()),
        [dispatch],
    );

    const onSkipToStart = useCallback(() => {
        if (isStopped) {
            dispatch(playerActions.skip(Direction.Backwards));
        } else if (isPaused) {
            dispatch(playerActions.skipRemaining(Direction.Backwards));
        }
    }, [dispatch, isStopped, isPaused]);

    const onSkipToEnd = useCallback(() => {
        if (isStopped) {
            dispatch(playerActions.skip(Direction.Forwards));
        } else if (isPaused) {
            dispatch(playerActions.skipRemaining(Direction.Forwards));
        }
    }, [dispatch, isStopped, isPaused]);

    const onNextStep = useCallback(
        () => dispatch(playerActions.nextStep(Direction.Forwards)),
        [dispatch],
    );

    const onNextStepBack = useCallback(
        () => dispatch(playerActions.nextStep(Direction.Backwards)),
        [dispatch],
    );

    const onShuffle = useCallback(
        () =>
            dispatch(
                playerActions.updateNotation(
                    createRandomNotation(cubeDimension),
                ),
            ),
        [dispatch, cubeDimension],
    );

    const onRefresh = useCallback(
        () => dispatch(cubeActions.resetCube()),
        [dispatch],
    );

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row flex-nowrap">
                {isPlaying ? (
                    <IconButton
                        tooltip={t('player.input.pause')}
                        onClick={onPause}
                    >
                        <CirclePause />
                    </IconButton>
                ) : (
                    <IconButton
                        tooltip={t('player.input.play')}
                        disabled={isNotationInvalid}
                        onClick={onPlay}
                    >
                        <CirclePlay />
                    </IconButton>
                )}
                <IconButton
                    tooltip={t('player.input.stop')}
                    onClick={onStop}
                    disabled={isStopped}
                >
                    <CircleStop />
                </IconButton>
            </div>
            <div className="flex flex-row flex-nowrap">
                <IconButton
                    tooltip={
                        isStopped
                            ? t('player.input.skipToStart')
                            : t('player.input.skipRemainingToStart')
                    }
                    onClick={onSkipToStart}
                    disabled={
                        isPlaying ||
                        (isPaused &&
                            (isAnimatingRotationCommand ||
                                noCommandsExecuted)) ||
                        (isStopped && isNotationInvalid) ||
                        tooManyRotationCommands
                    }
                >
                    <SkipBack />
                </IconButton>
                <IconButton
                    tooltip={t('player.input.stepPrevious')}
                    onClick={onNextStepBack}
                    disabled={
                        isPlaying ||
                        (isPaused &&
                            (isAnimatingRotationCommand ||
                                noCommandsExecuted)) ||
                        isStopped
                    }
                >
                    <StepBack />
                </IconButton>
                <IconButton
                    tooltip={t('player.input.stepNext')}
                    onClick={onNextStep}
                    disabled={
                        isPlaying ||
                        (isPaused &&
                            (isAnimatingRotationCommand ||
                                allCommandsExecuted)) ||
                        (isStopped && isNotationInvalid)
                    }
                >
                    <StepForward />
                </IconButton>
                <IconButton
                    tooltip={
                        isStopped
                            ? t('player.input.skipToEnd')
                            : t('player.input.skipRemainingToEnd')
                    }
                    onClick={onSkipToEnd}
                    disabled={
                        isPlaying ||
                        (isPaused &&
                            (isAnimatingRotationCommand ||
                                allCommandsExecuted)) ||
                        (isStopped && isNotationInvalid) ||
                        tooManyRotationCommands
                    }
                >
                    <SkipForward />
                </IconButton>
            </div>
            <div className="flex flex-row flex-nowrap">
                <IconButton
                    tooltip={t('player.input.shuffle')}
                    onClick={onShuffle}
                    disabled={!isStopped}
                >
                    <Shuffle />
                </IconButton>
                <IconButton
                    tooltip={t('player.input.reset')}
                    onClick={onRefresh}
                    disabled={!isStopped}
                >
                    <RefreshCcw />
                </IconButton>
            </div>
        </div>
    );
};

export default React.memo(PlayerButtons);
