import { createReducer } from '@reduxjs/toolkit';
import { playerActions } from './PlayerActions';
import {
    RotationCommand,
    SingleRotationCommand,
} from '../../cube/algorithms/RotationCommand';
import { Result } from 'parsimmon';
import { cubeActions } from '../cube/CubeActions';

export enum PlayerStatus {
    STOPPED = 'STOPPED',
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
}

export interface IPlayerState {
    notation: string;
    rotationCommands: Result<RotationCommand[]>;
    currentCommand?: SingleRotationCommand;
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
        })
        .addCase(playerActions.setCurrentRotationCommand, (state, action) => {
            state.currentCommand = action.payload.command;
        })
        .addCase(cubeActions.applyRotationCommands, (state, _action) => {
            state.currentCommand = undefined;
        });
});
