import React, { useCallback, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import './AlgorithmPlayer.scss';
import { AlgorithmStatus } from '../states/AlgorithmPlayerState';
import Maybe from '../utils/Maybe';
import { createRandomNotation, interpretNotation } from '../cube/algorithms/Interpreter';
import useOnUpdate from '../hooks/useOnUpdate';
import { Pause, PlayArrow, Shuffle, SkipNext, Stop, Refresh } from '@material-ui/icons';
import { useGlobalState } from '../states/State';
import {
    jumpToEndOfAlgorithmAction,
    pauseAlgorithmAction,
    playAlgorithmAction,
    resetCubeAction,
    stopAlgorithmAction
} from '../states/AlgorithmPlayerActions';

const AlgorithmPlayer: React.FunctionComponent = () => {
    const [state, dispatch] = useGlobalState();
    const { numberOfCubes, selectedAlgorithm, playerStatus } = state;

    const [notation, setNotation] = useState(selectedAlgorithm);
    const updateNotation = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => setNotation(event.target.value),
        []
    );

    const isNotationEmpty = notation.length === 0;
    const isStopped = playerStatus === AlgorithmStatus.STOPPED;

    const generateMoveGenerator = () => Maybe.some(interpretNotation(notation, numberOfCubes));

    const playOrPause = () => {
        switch (playerStatus) {
            case AlgorithmStatus.STOPPED:
            case AlgorithmStatus.PAUSED: {
                const onPlay = () => dispatch(playAlgorithmAction(generateMoveGenerator));

                return (
                    <IconButton onClick={onPlay} disabled={isNotationEmpty}>
                        <PlayArrow />
                    </IconButton>
                );
            }

            case AlgorithmStatus.PLAYING: {
                const onPause = () => dispatch(pauseAlgorithmAction());

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

    const onStop = () => dispatch(stopAlgorithmAction());
    const onJumpToEnd = () => dispatch(jumpToEndOfAlgorithmAction(generateMoveGenerator));
    const onShuffle = () => setNotation(createRandomNotation(numberOfCubes));
    const onRefresh = () => dispatch(resetCubeAction());

    useOnUpdate(() => {
        setNotation(selectedAlgorithm);
    }, [selectedAlgorithm]);

    return (
        <div className="algorithm-player">
            <TextField
                label="Algorithm"
                fullWidth={true}
                value={notation}
                onChange={updateNotation}
                disabled={!isStopped}
            />
            <div className="algorithm-player__buttons">
                <div>
                    {playOrPause()}
                    <IconButton onClick={onStop} disabled={isStopped}>
                        <Stop />
                    </IconButton>
                    <IconButton
                        onClick={onJumpToEnd}
                        disabled={playerStatus === AlgorithmStatus.PLAYING || isNotationEmpty}
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

export default React.memo(AlgorithmPlayer);
