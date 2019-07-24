import React, { createContext } from 'react';
import useComplexState from '../hooks/useComplexState';
import { D3Group } from '../cube/D3';
import Maybe from '../utils/Maybe';

export enum AlgorithmStatus {
    STOPPED = 'STOPPED',
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
    JUMP_TO_END = 'JUMP_TO_END'
}

export interface AlgorithmPlayerState {
    notation: string;
    status: AlgorithmStatus;
    moveGenerator: Maybe<IterableIterator<D3Group>>;
    reset: boolean;
}

const initialState: AlgorithmPlayerState = {
    notation: '',
    status: AlgorithmStatus.STOPPED,
    moveGenerator: Maybe.none(),
    reset: false
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
