import { ActionCreator } from './Actions';
import { AlgorithmStatus, IAlgorithmPlayerState } from './AlgorithmPlayerState';
import Maybe from '../utils/Maybe';
import { D3Group } from '../cube/D3';

export enum AlgorithmPlayerActions {
    PLAY_ALGORITHM,
    STOP_ALGORITHM,
    PAUSE_ALGORITHM,
    JUMP_TO_END_OF_ALGORITHM,
    RESET_CUBE,
    SELECT_NOTATION
}

type Action = ActionCreator<AlgorithmPlayerActions, IAlgorithmPlayerState>;

export const playAlgorithmAction = (
    generateMoveGenerator: () => Maybe<IterableIterator<D3Group>>
): Action => prevState => ({
    type: AlgorithmPlayerActions.PLAY_ALGORITHM,
    payload: {
        playerStatus: AlgorithmStatus.PLAYING,
        moveGenerator: prevState.moveGenerator.isSome() ? prevState.moveGenerator : generateMoveGenerator()
    }
});

export const stopAlgorithmAction = (): Action => () => ({
    type: AlgorithmPlayerActions.STOP_ALGORITHM,
    payload: {
        playerStatus: AlgorithmStatus.STOPPED,
        moveGenerator: Maybe.none()
    }
});

export const pauseAlgorithmAction = (): Action => () => ({
    type: AlgorithmPlayerActions.PAUSE_ALGORITHM,
    payload: {
        playerStatus: AlgorithmStatus.PAUSED
    }
});

export const jumpToEndOfAlgorithmAction = (
    generateMoveGenerator: () => Maybe<IterableIterator<D3Group>>
): Action => prevState => ({
    type: AlgorithmPlayerActions.JUMP_TO_END_OF_ALGORITHM,
    payload: {
        playerStatus: AlgorithmStatus.JUMP_TO_END,
        moveGenerator: prevState.moveGenerator.isSome() ? prevState.moveGenerator : generateMoveGenerator()
    }
});

export const resetCubeAction = (): Action => prevState => ({
    type: AlgorithmPlayerActions.RESET_CUBE,
    payload: {
        reset: !prevState.reset
    }
});

export const selectNotationAction = (selectedAlgorithm: string): Action => () => ({
    type: AlgorithmPlayerActions.SELECT_NOTATION,
    payload: {
        selectedAlgorithm
    }
});
