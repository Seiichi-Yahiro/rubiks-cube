import {
    ArrowBack,
    ArrowForward,
    Pause,
    PlayArrow,
    Refresh,
    Shuffle,
    SkipNext,
    SkipPrevious,
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
import createClassName from 'src/utils/createClassName';
import { IteratorResultType } from 'src/utils/iterators/types';

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
    const rotationCommandIteratorResult = useRedux(
        (state) => state.player.rotationCommandsIteratorResult,
    );

    const updateNotation = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(playerActions.updateNotation(event.target.value)),
        [],
    );

    const hasParseError = isError(rotationCommands);
    const isNotationInvalid = playerNotation.length === 0 || hasParseError;

    const isStopped = playerStatus === PlayerStatus.STOPPED;
    const isPlaying = playerStatus === PlayerStatus.PLAYING;
    const isPaused = playerStatus === PlayerStatus.PAUSED;

    const isLastRotationCommand =
        rotationCommandIteratorResult?.resultType === IteratorResultType.End;
    const isFirstRotationCommand =
        rotationCommandIteratorResult?.resultType === IteratorResultType.Start;

    const onPlay = () => {
        if (playerStatus === PlayerStatus.STOPPED && isOk(rotationCommands)) {
            dispatch(playerActions.play(rotationCommands.value));
        } else if (playerStatus === PlayerStatus.PAUSED) {
            dispatch(playerActions.unPause());
        }
    };
    const onPause = () => dispatch(playerActions.pause());
    const onStop = () => dispatch(playerActions.stop());

    const onSkipToStart = () => dispatch(playerActions.skipToStart());
    const onSkipToEnd = () => dispatch(playerActions.skipToEnd());

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
                        title={t('player.input.skipToStart')}
                        onClick={onSkipToStart}
                        disabled={
                            isPlaying ||
                            (isPaused && isFirstRotationCommand) ||
                            (isStopped && isNotationInvalid)
                        }
                    >
                        <SkipPrevious />
                    </TooltipIconButton>
                    <TooltipIconButton
                        title={t('player.input.stepPrevious')}
                        onClick={() => {}}
                        disabled={
                            isPlaying ||
                            (isPaused && isFirstRotationCommand) ||
                            isStopped
                        }
                    >
                        <ArrowBack />
                    </TooltipIconButton>
                    <TooltipIconButton
                        title={t('player.input.stepNext')}
                        onClick={() => {}}
                        disabled={
                            isPlaying ||
                            (isPaused && isLastRotationCommand) ||
                            (isStopped && isNotationInvalid)
                        }
                    >
                        <ArrowForward />
                    </TooltipIconButton>
                    <TooltipIconButton
                        title={t('player.input.skipToEnd')}
                        onClick={onSkipToEnd}
                        disabled={
                            isPlaying ||
                            (isPaused && isLastRotationCommand) ||
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
