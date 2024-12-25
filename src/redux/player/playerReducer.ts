import { createReducer } from '@reduxjs/toolkit';
import { Result } from 'parsimmon';
import {
    countRotationCommands,
    RotationCommand,
} from 'src/algorithms/rotationCommand';
import { Direction, playerActions } from 'src/redux/player/playerActions';

export enum PlayerStatus {
    STOPPED = 'STOPPED',
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
}

export interface IPlayerState {
    notation: string;
    rotationCommands: Result<RotationCommand[]>;
    totalRotationCommands: number;
    executedRotationCommands: number;
    status: PlayerStatus;
    animationLoopDelay: number;
}

const createInitialPlayerState = (): IPlayerState => ({
    notation: '',
    rotationCommands: { status: true, value: [] },
    totalRotationCommands: 0,
    executedRotationCommands: 0,
    status: PlayerStatus.STOPPED,
    animationLoopDelay: 50,
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

                if (state.rotationCommands.status) {
                    state.totalRotationCommands = countRotationCommands(
                        state.rotationCommands.value,
                    );
                } else {
                    state.totalRotationCommands = 0;
                }

                state.executedRotationCommands = 0;
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
                state.executedRotationCommands = 0;
            })
            .addCase(
                playerActions.generatedRotationCommands,
                (state, action) => {
                    if (action.payload.direction === Direction.Forwards) {
                        state.executedRotationCommands +=
                            action.payload.commands.length;
                    } else {
                        state.executedRotationCommands -=
                            action.payload.commands.length;
                    }
                },
            )
            .addCase(playerActions.setAnimationLoopDelay, (state, action) => {
                state.animationLoopDelay = action.payload;
            });
    });
