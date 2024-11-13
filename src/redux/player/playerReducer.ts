import { createReducer } from '@reduxjs/toolkit';
import { Result } from 'parsimmon';
import {
    nextRotationCommand,
    RotationCommand,
    RotationCommandStack,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { playerActions } from 'src/redux/player/playerActions';

export enum PlayerStatus {
    STOPPED = 'STOPPED',
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
}

export interface IPlayerState {
    notation: string;
    rotationCommands: Result<RotationCommand[]>;
    rotationCommandStack: RotationCommandStack;
    currentCommand?: SingleRotationCommand;
    status: PlayerStatus;
}

const createInitialPlayerState = (): IPlayerState => ({
    notation: '',
    rotationCommands: { status: true, value: [] },
    rotationCommandStack: [],
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
            .addCase(playerActions.play, (state, action) => {
                state.status = PlayerStatus.PLAYING;

                state.rotationCommandStack = [
                    {
                        commands: action.payload,
                        index: 0,
                        iteration: 0,
                    },
                ];
            })
            .addCase(playerActions.unPause, (state, _action) => {
                state.status = PlayerStatus.PLAYING;
            })
            .addCase(playerActions.pause, (state, _action) => {
                state.status = PlayerStatus.PAUSED;
            })
            .addCase(playerActions.stop, (state, _action) => {
                state.status = PlayerStatus.STOPPED;
                state.rotationCommandStack = [];
            })
            .addCase(playerActions.nextCommand, (state, _action) => {
                state.currentCommand = nextRotationCommand(
                    state.rotationCommandStack,
                );
            })
            .addCase(cubeActions.applyRotationCommands, (state, _action) => {
                state.currentCommand = undefined;
            });
    });
