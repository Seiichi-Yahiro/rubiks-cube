import { createReducer } from '@reduxjs/toolkit';
import { Result } from 'parsimmon';
import {
    createRotationCommandIterator,
    RotationCommand,
    RotationCommandsIterator,
} from 'src/algorithms/rotationCommand';
import { playerActions } from 'src/redux/player/playerActions';
import iterators from 'src/utils/iterators';

export enum PlayerStatus {
    STOPPED = 'STOPPED',
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
}

export interface IPlayerState {
    notation: string;
    rotationCommands: Result<RotationCommand[]>;
    rotationCommandsIterator?: RotationCommandsIterator;
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
            .addCase(playerActions.play, (state, action) => {
                state.status = PlayerStatus.PLAYING;

                const itr = createRotationCommandIterator(action.payload);

                state.rotationCommandsIterator = {
                    itr,
                    result: iterators.resultStart,
                };
            })
            .addCase(playerActions.unPause, (state, _action) => {
                state.status = PlayerStatus.PLAYING;
            })
            .addCase(playerActions.pause, (state, _action) => {
                state.status = PlayerStatus.PAUSED;
            })
            .addCase(playerActions.stop, (state, _action) => {
                state.status = PlayerStatus.STOPPED;
                state.rotationCommandsIterator = undefined;
            })
            .addCase(
                playerActions.setRotationCommandIterator,
                (state, action) => {
                    state.rotationCommandsIterator = action.payload;
                },
            )
            .addCase(playerActions.nextCommand, (state, _action) => {
                if (!state.rotationCommandsIterator) {
                    return;
                }

                state.rotationCommandsIterator.result = iterators.next(
                    state.rotationCommandsIterator.itr,
                );
            });
    });
