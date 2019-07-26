import { D3Group } from '../cube/D3';
import Maybe from '../utils/Maybe';

export enum AlgorithmStatus {
    STOPPED = 'STOPPED',
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
    JUMP_TO_END = 'JUMP_TO_END'
}

export interface IAlgorithmPlayerState {
    playerNotation: string;
    playerStatus: AlgorithmStatus;
    moveGenerator: Maybe<IterableIterator<D3Group>>;
    reset: boolean;
}

export const initialAlgorithmPlayerState: IAlgorithmPlayerState = {
    playerNotation: '',
    playerStatus: AlgorithmStatus.STOPPED,
    moveGenerator: Maybe.none(),
    reset: false
};
