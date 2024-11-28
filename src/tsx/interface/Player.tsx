import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Pause from '@mui/icons-material/Pause';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Refresh from '@mui/icons-material/Refresh';
import Shuffle from '@mui/icons-material/Shuffle';
import SkipNext from '@mui/icons-material/SkipNext';
import SkipPrevious from '@mui/icons-material/SkipPrevious';
import Stop from '@mui/icons-material/Stop';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { createRandomNotation } from 'src/algorithms/parser';
import { isError, isOk } from 'src/algorithms/rotationCommand';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { Direction, playerActions } from 'src/redux/player/playerActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import NotationInput from 'src/tsx/interface/NotationInput';
import createClassName from 'src/utils/createClassName';

interface TooltipIconButtonProps {
    title: string;
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const TooltipIconButton: React.FC<TooltipIconButtonProps> = ({
    title,
    disabled = false,
    onClick,
    children,
}) => {
    return (
        <Tooltip title={title}>
            <IconButton
                aria-disabled={disabled}
                className={createClassName(
                    {
                        'Mui-disabled': disabled,
                    },
                    '!pointer-events-auto',
                )}
                onClick={disabled ? undefined : onClick}
                size="small"
            >
                {children}
            </IconButton>
        </Tooltip>
    );
};

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
        (event: React.ChangeEvent<HTMLInputElement>) =>
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
                <div>
                    {playerStatus === PlayerStatus.PLAYING ? (
                        <TooltipIconButton
                            title={t('player.input.pause')}
                            onClick={onPause}
                        >
                            <Pause />
                        </TooltipIconButton>
                    ) : (
                        <TooltipIconButton
                            title={t('player.input.play')}
                            disabled={isNotationInvalid}
                            onClick={onPlay}
                        >
                            <PlayArrow />
                        </TooltipIconButton>
                    )}
                    <TooltipIconButton
                        title={t('player.input.stop')}
                        onClick={onStop}
                        disabled={isStopped}
                    >
                        <Stop />
                    </TooltipIconButton>
                </div>
                <div>
                    <TooltipIconButton
                        title={
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
                        <SkipPrevious />
                    </TooltipIconButton>
                    <TooltipIconButton
                        title={t('player.input.stepPrevious')}
                        onClick={onNextStepBack}
                        disabled={
                            isPlaying ||
                            (isPaused && isAnimatingRotationCommand) ||
                            isStopped
                        }
                    >
                        <ArrowBack />
                    </TooltipIconButton>
                    <TooltipIconButton
                        title={t('player.input.stepNext')}
                        onClick={onNextStep}
                        disabled={
                            isPlaying ||
                            (isPaused && isAnimatingRotationCommand) ||
                            (isStopped && isNotationInvalid)
                        }
                    >
                        <ArrowForward />
                    </TooltipIconButton>
                    <TooltipIconButton
                        title={
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
                        <SkipNext />
                    </TooltipIconButton>
                </div>
                <div>
                    <TooltipIconButton
                        title={t('player.input.shuffle')}
                        onClick={onShuffle}
                        disabled={!isStopped}
                    >
                        <Shuffle />
                    </TooltipIconButton>
                    <TooltipIconButton
                        title={t('player.input.reset')}
                        onClick={onRefresh}
                        disabled={!isStopped}
                    >
                        <Refresh />
                    </TooltipIconButton>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Player);
