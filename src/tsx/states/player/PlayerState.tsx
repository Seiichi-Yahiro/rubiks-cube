import { createReducer } from '@reduxjs/toolkit';
import { playerActions } from './PlayerActions';
import { RotationCommand } from '../../cube/algorithms/RotationCommand';
import { Result } from 'parsimmon';

export enum PlayerStatus {
    STOPPED = 'STOPPED',
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
    JUMP_TO_END = 'JUMP_TO_END',
}

export interface IPlayerState {
    notation: string;
    rotationCommands: Result<RotationCommand[]>;
    status: PlayerStatus;
}

const initialPlayerState: IPlayerState = {
    notation: '',
    rotationCommands: { status: true, value: [] },
    status: PlayerStatus.STOPPED,
};

export const playerReducer = createReducer(initialPlayerState, (builder) => {
    builder
        .addCase(playerActions.updateNotation, (state, action) => {
            state.notation = action.payload.notation;
        })
        .addCase(playerActions.parsedNotation, (state, action) => {
            state.rotationCommands = action.payload.rotationCommands;
        })
        .addCase(playerActions.play, (state, _action) => {
            state.status = PlayerStatus.PLAYING;
        })
        .addCase(playerActions.pause, (state, _action) => {
            state.status = PlayerStatus.PAUSED;
        })
        .addCase(playerActions.stop, (state, _action) => {
            state.status = PlayerStatus.STOPPED;
        });
});
