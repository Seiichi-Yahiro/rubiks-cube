import { createReducer } from '@reduxjs/toolkit';

export enum PlayerStatus {
    STOPPED = 'STOPPED',
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
    JUMP_TO_END = 'JUMP_TO_END',
}

export interface IPlayerState {
    notation: string;
    status: PlayerStatus;
}

const initialPlayerState: IPlayerState = {
    notation: '',
    status: PlayerStatus.STOPPED,
};

export const playerReducer = createReducer(initialPlayerState, {});
