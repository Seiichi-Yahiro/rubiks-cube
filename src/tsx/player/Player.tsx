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
import NotationInput from 'src/tsx/player/notation/NotationInput';

const Player: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const cubeDimension = useRedux((state) => state.cube.dimension);
    const playerNotation = useRedux((state) => state.player.notation);
    const playerStatus = useRedux((state) => state.player.status);
    const rotationCommands = useRedux((state) => state.player.rotationCommands);
    const isAnimatingRotationCommand = useRedux(
        (state) => state.cube.animation !== undefined,
    );

    const updateNotation = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch(playerActions.updateNotation(event.target.value)),
        [dispatch],
    );

    const hasParseError = isError(rotationCommands);
    const isNotationInvalid = playerNotation.length === 0 || hasParseError;

    const isStopped = playerStatus === PlayerStatus.STOPPED;
    const isPlaying = playerStatus === PlayerStatus.PLAYING;
    const isPaused = playerStatus === PlayerStatus.PAUSED;

    const onPlay = () => {
        if (isStopped && isOk(rotationCommands)) {
            dispatch(playerActions.play(rotationCommands.value));
        } else if (isPaused) {
            dispatch(playerActions.resume());
        }
    };
    const onPause = () => dispatch(playerActions.pause());
    const onStop = () => dispatch(playerActions.stop());

    const onSkipToStart = () => {
        if (isStopped) {
            dispatch(playerActions.skip(Direction.Backwards));
        } else if (isPaused) {
            dispatch(playerActions.skipRemaining(Direction.Backwards));
        }
    };

    const onSkipToEnd = () => {
        if (isStopped) {
            dispatch(playerActions.skip(Direction.Forwards));
        } else if (isPaused) {
            dispatch(playerActions.skipRemaining(Direction.Forwards));
        }
    };

    const onNextStep = () =>
        dispatch(playerActions.nextStep(Direction.Forwards));
    const onNextStepBack = () =>
        dispatch(playerActions.nextStep(Direction.Backwards));

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
                <div className="flex flex-row flex-nowrap">
                    {playerStatus === PlayerStatus.PLAYING ? (
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
                            (isPaused && isAnimatingRotationCommand) ||
                            (isStopped && isNotationInvalid)
                        }
                    >
                        <SkipBack />
                    </IconButton>
                    <IconButton
                        tooltip={t('player.input.stepPrevious')}
                        onClick={onNextStepBack}
                        disabled={
                            isPlaying ||
                            (isPaused && isAnimatingRotationCommand) ||
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
                            (isPaused && isAnimatingRotationCommand) ||
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
                            (isPaused && isAnimatingRotationCommand) ||
                            (isStopped && isNotationInvalid)
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
        </div>
    );
};

export default React.memo(Player);
