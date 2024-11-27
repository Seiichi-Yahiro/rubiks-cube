import Pause from '@mui/icons-material/Pause';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Refresh from '@mui/icons-material/Refresh';
import Shuffle from '@mui/icons-material/Shuffle';
import SkipNext from '@mui/icons-material/SkipNext';
import Stop from '@mui/icons-material/Stop';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
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

interface TooltipedIconButtonProps {
    title: string;
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const TooltipedIconButton: React.FC<TooltipedIconButtonProps> = ({
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

    const updateNotation = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(playerActions.updateNotation(event.target.value)),
        [dispatch],
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
                        <TooltipedIconButton
                            title={t('player.input.pause')}
                            onClick={onPause}
                        >
                            <Pause />
                        </TooltipedIconButton>
                    ) : (
                        <TooltipedIconButton
                            title={t('player.input.play')}
                            disabled={isNotationEmpty || hasParseError}
                            onClick={onPlay}
                        >
                            <PlayArrow />
                        </TooltipedIconButton>
                    )}
                    <TooltipedIconButton
                        title={t('player.input.stop')}
                        onClick={onStop}
                        disabled={isStopped}
                    >
                        <Stop />
                    </TooltipedIconButton>
                    <TooltipedIconButton
                        title={t('player.input.skip')}
                        onClick={onJumpToEnd}
                        disabled={
                            !isStopped || isNotationEmpty || hasParseError
                        }
                    >
                        <SkipNext />
                    </TooltipedIconButton>
                </div>
                <div>
                    <TooltipedIconButton
                        title={t('player.input.shuffle')}
                        onClick={onShuffle}
                        disabled={!isStopped}
                    >
                        <Shuffle />
                    </TooltipedIconButton>
                    <TooltipedIconButton
                        title={t('player.input.reset')}
                        onClick={onRefresh}
                        disabled={!isStopped}
                    >
                        <Refresh />
                    </TooltipedIconButton>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Player);
