import React, { useCallback, useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
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
    const onPlay = () => {
        if (notation.length !== 0) {
            setAlgorithmPlayerState({
                status: AlgorithmStatus.PLAYING,
                moveGenerator: Maybe.some(interpretNotation(notation, numberOfCubes))
            });
        }
    };

    useOnUpdate(() => {
        setNotation(playerNotation);
    }, [playerNotation]);

    return (
        <div className="algorithm-player">
            <TextField label="Algorithm" fullWidth={true} value={notation} onChange={updateNotation} />
            <div>
                <IconButton onClick={onPlay} disabled={status !== AlgorithmStatus.STOPPED}>
                    <PlayArrow />
                </IconButton>
            </div>
        </div>
    );
};

export default React.memo(AlgorithmPlayer);
