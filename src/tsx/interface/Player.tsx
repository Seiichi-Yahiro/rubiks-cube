import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import './Player.scss';
import { PlayerStatus } from '../states/player/PlayerState';
//import { createRandomNotation } from '../cube/algorithms/Interpreter';
import {
    Pause,
    PlayArrow,
    Shuffle,
    SkipNext,
    Stop,
    Refresh,
} from '@material-ui/icons';
import { playerActions } from '../states/player/PlayerActions';
import { useDispatch } from 'react-redux';
import { useRedux } from '../states/States';
import { isError } from '../cube/algorithms/RotationCommand';

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

    const isNotationEmpty = playerNotation.length === 0;
    const isStopped = playerStatus === PlayerStatus.STOPPED;

    // const generateMoveGenerator = () => Maybe.some(interpretNotation(playerNotation, cubeDimension));

    const playOrPause = () => {
        switch (playerStatus) {
            case PlayerStatus.STOPPED:
            case PlayerStatus.PAUSED: {
                const onPlay = () =>
                    dispatch(playerActions.play(/*generateMoveGenerator*/));

                return (
                    <IconButton onClick={onPlay} disabled={isNotationEmpty}>
                        <PlayArrow />
                    </IconButton>
                );
            }

            case PlayerStatus.PLAYING: {
                const onPause = () => dispatch(playerActions.pause());

                return (
                    <IconButton onClick={onPause}>
                        <Pause />
                    </IconButton>
                );
            }

            default:
                return;
        }
    };

    const onStop = () => dispatch(playerActions.stop());
    const onJumpToEnd = () =>
        dispatch(playerActions.jumpToEnd(/*generateMoveGenerator*/));
    const onShuffle = () =>
        dispatch(
            playerActions.updateNotation(
                '' /*createRandomNotation(cubeDimension))*/
            )
        );
    const onRefresh = () => dispatch(playerActions.resetCube());

    return (
        <div className="algorithm-player">
            <TextField
                label="Algorithm"
                fullWidth={true}
                value={playerNotation}
                onChange={updateNotation}
                disabled={!isStopped}
                error={isError(rotationCommands)}
            />
            <div className="algorithm-player__buttons">
                <div>
                    {playOrPause()}
                    <IconButton onClick={onStop} disabled={isStopped}>
                        <Stop />
                    </IconButton>
                    <IconButton
                        onClick={onJumpToEnd}
                        disabled={
                            playerStatus === PlayerStatus.PLAYING ||
                            isNotationEmpty
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
