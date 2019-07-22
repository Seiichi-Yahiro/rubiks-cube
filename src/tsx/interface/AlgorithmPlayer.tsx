import React, { useCallback, useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import './AlgorithmPlayer.scss';
import { algorithmPlayerContext, AlgorithmStatus } from '../context/AlgorithmPlayerContext';

const AlgorithmPlayer: React.FunctionComponent = () => {
    const { notation: playerNotation, status, setAlgorithmPlayerState } = useContext(algorithmPlayerContext);
    const [notation, setNotation] = useState(playerNotation);
    const updateNotation = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => setNotation(event.target.value),
        []
    );
    const onPlay = () => {
        if (notation.length !== 0 && status === AlgorithmStatus.STOPPED) {
            setAlgorithmPlayerState({
                notation: notation,
                status: AlgorithmStatus.START
            });
        }
    };

    useEffect(() => {
        setNotation(playerNotation);
    }, [playerNotation]);

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
