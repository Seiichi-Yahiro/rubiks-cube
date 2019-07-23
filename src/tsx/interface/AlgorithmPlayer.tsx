import React, { useCallback, useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import './AlgorithmPlayer.scss';
import { algorithmPlayerContext, AlgorithmStatus } from '../context/AlgorithmPlayerContext';
import Maybe from '../utils/Maybe';
import { interpretNotation } from '../cube/algorithms/Interpreter';
import { settingsContext } from '../context/SettingsContext';
import useOnUpdate from '../hooks/useOnUpdate';
import { Pause, PlayArrow, SkipNext, Stop } from '@material-ui/icons';
import { D3Group } from '../cube/D3';

const AlgorithmPlayer: React.FunctionComponent = () => {
    const { numberOfCubes } = useContext(settingsContext);
    const { notation: playerNotation, status, setAlgorithmPlayerState } = useContext(algorithmPlayerContext);
    const [notation, setNotation] = useState(playerNotation);
    const updateNotation = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => setNotation(event.target.value),
        []
    );

    const isNotationEmpty = notation.length === 0;

    const continueMoveGenerator = (moveGenerator: Maybe<IterableIterator<D3Group>>) =>
        moveGenerator.isSome() ? moveGenerator : Maybe.some(interpretNotation(notation, numberOfCubes));

    const playOrPause = () => {
        switch (status) {
            case AlgorithmStatus.STOPPED:
            case AlgorithmStatus.PAUSED: {
                const onPlay = () =>
                    setAlgorithmPlayerState(({ moveGenerator }) => ({
                        status: AlgorithmStatus.PLAYING,
                        moveGenerator: continueMoveGenerator(moveGenerator)
                    }));

                return (
                    <IconButton onClick={onPlay} disabled={isNotationEmpty}>
                        <PlayArrow />
                    </IconButton>
                );
            }

            case AlgorithmStatus.PLAYING: {
                const onPause = () => {
                    setAlgorithmPlayerState({
                        status: AlgorithmStatus.PAUSED
                    });
                };

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

    const onStop = () =>
        setAlgorithmPlayerState({
            status: AlgorithmStatus.STOPPED,
            moveGenerator: Maybe.none()
        });

    const onJumpToEnd = () =>
        setAlgorithmPlayerState(({ moveGenerator }) => ({
            status: AlgorithmStatus.JUMP_TO_END,
            moveGenerator: continueMoveGenerator(moveGenerator)
        }));

    useOnUpdate(() => {
        setNotation(playerNotation);
    }, [playerNotation]);

    return (
        <div className="algorithm-player">
            <TextField
                label="Algorithm"
                fullWidth={true}
                value={notation}
                onChange={updateNotation}
                disabled={status !== AlgorithmStatus.STOPPED}
            />
            <div>
                {playOrPause()}
                <IconButton onClick={onStop} disabled={status === AlgorithmStatus.STOPPED}>
                    <Stop />
                </IconButton>
                <IconButton onClick={onJumpToEnd} disabled={status === AlgorithmStatus.PLAYING || isNotationEmpty}>
                    <SkipNext />
                </IconButton>
            </div>
        </div>
    );
};

export default React.memo(AlgorithmPlayer);
