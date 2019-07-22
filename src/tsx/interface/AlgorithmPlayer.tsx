import React, { useCallback, useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import './AlgorithmPlayer.scss';
import { AlgoritmStatus, settingsContext } from '../context/SettingsContext';

const AlgorithmPlayer: React.FunctionComponent = () => {
    const { setSettings, algorithm } = useContext(settingsContext);
    const [notation, setNotation] = useState(algorithm.notation);
    const updateNotation = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => setNotation(event.target.value),
        []
    );
    const onPlay = () => {
        if (notation.length !== 0 && algorithm.status === AlgoritmStatus.STOPPED) {
            setSettings({
                algorithm: {
                    notation,
                    status: AlgoritmStatus.START
                }
            });
        }
    };

    useEffect(() => {
        setNotation(algorithm.notation);
    }, [algorithm.notation]);

    return (
        <div className="algorithm-player">
            <TextField label="Algorithm" fullWidth={true} value={notation} onChange={updateNotation} />
            <div>
                <IconButton onClick={onPlay}>
                    <PlayArrow />
                </IconButton>
            </div>
        </div>
    );
};

export default AlgorithmPlayer;
