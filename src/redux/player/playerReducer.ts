import { createReducer } from '@reduxjs/toolkit';
import { Result } from 'parsimmon';
import { RotationCommand } from 'src/algorithms/rotationCommand';
import { playerActions } from 'src/redux/player/playerActions';

export enum PlayerStatus {
    STOPPED = 'STOPPED',
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
}

export interface IPlayerState {
    notation: string;
    rotationCommands: Result<RotationCommand[]>;
    status: PlayerStatus;
}

const createInitialPlayerState = (): IPlayerState => ({
    notation: '',
    rotationCommands: { status: true, value: [] },
    status: PlayerStatus.STOPPED,
});

export const createPlayerReducer = (
    initialState:
        | IPlayerState
        | (() => IPlayerState) = createInitialPlayerState,
) =>
    createReducer(initialState, (builder) => {
        builder
            .addCase(playerActions.updateNotation, (state, action) => {
                state.notation = action.payload;
            })
            .addCase(playerActions.parsedNotation, (state, action) => {
                state.rotationCommands = action.payload;
            })
            .addCase(playerActions.play, (state, _action) => {
                state.status = PlayerStatus.PLAYING;
            })
            .addCase(playerActions.resume, (state, _action) => {
                state.status = PlayerStatus.PLAYING;
            })
            .addCase(playerActions.pause, (state, _action) => {
                state.status = PlayerStatus.PAUSED;
            })
            .addCase(playerActions.stop, (state, _action) => {
                state.status = PlayerStatus.STOPPED;
            });
    });
