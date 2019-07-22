import React, { createContext } from 'react';
import useComplexState from '../hooks/useComplexState';

export enum AlgorithmStatus {
    STOPPED = 'STOPPED',
    START = 'START',
    PLAYING = 'PLAYING'
}

interface AlgorithmPlayerState {
    notation: string;
    status: AlgorithmStatus;
}

const initialState: AlgorithmPlayerState = {
    notation: '',
    status: AlgorithmStatus.STOPPED
};

export const algorithmPlayerContext = createContext({
    ...initialState,
    setAlgorithmPlayerState: (
        newState: Partial<AlgorithmPlayerState> | ((prevState: AlgorithmPlayerState) => Partial<AlgorithmPlayerState>)
    ) => {
        /**/
    }
});

const AlgorithmPlayerContext: React.FunctionComponent = ({ children }) => {
    const [state, setAlgorithmPlayerState] = useComplexState(initialState);

    return (
        <algorithmPlayerContext.Provider value={{ ...state, setAlgorithmPlayerState }}>
            {children}
        </algorithmPlayerContext.Provider>
    );
};

export default AlgorithmPlayerContext;
