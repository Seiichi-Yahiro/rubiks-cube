import React, { useCallback, useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import './AlgorithmPlayer.scss';
import { algorithmPlayerContext, AlgorithmStatus } from '../context/AlgorithmPlayerContext';
import Maybe from '../utils/Maybe';
import { interpretNotation } from '../cube/algorithms/Interpreter';
import { settingsContext } from '../context/SettingsContext';
import useOnUpdate from '../hooks/useOnUpdate';

const AlgorithmPlayer: React.FunctionComponent = () => {
    const { numberOfCubes } = useContext(settingsContext);
    const { notation: playerNotation, status, setAlgorithmPlayerState } = useContext(algorithmPlayerContext);
    const [notation, setNotation] = useState(playerNotation);
    const updateNotation = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => setNotation(event.target.value),
        []
    );

    const playOrPause = () => {
        switch (status) {
            case AlgorithmStatus.STOPPED:
            case AlgorithmStatus.PAUSED: {
                const onPlay = () => {
                    if (notation.length !== 0) {
                        setAlgorithmPlayerState(({ moveGenerator }) => ({
                            status: AlgorithmStatus.PLAYING,
                            moveGenerator: moveGenerator.isSome()
                                ? moveGenerator
                                : Maybe.some(interpretNotation(notation, numberOfCubes))
                        }));
                    }
                };

                return (
                    <IconButton onClick={onPlay}>
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
            <div>{playOrPause()}</div>
        </div>
    );
};

export default React.memo(AlgorithmPlayer);
