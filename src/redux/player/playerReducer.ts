import { createReducer } from '@reduxjs/toolkit';
import { Result } from 'parsimmon';
import {
    createRotationCommandIterator,
    RotationCommand,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { playerActions } from 'src/redux/player/playerActions';
import iterators from 'src/utils/iterators';
import {
    type Iterator,
    IteratorResult,
    IteratorResultType,
} from 'src/utils/iterators/types';

export enum PlayerStatus {
    STOPPED = 'STOPPED',
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
}

export interface IPlayerState {
    notation: string;
    rotationCommands: Result<RotationCommand[]>;
    rotationCommandsIterator?: Iterator<SingleRotationCommand>;
    rotationCommandsIteratorResult?: IteratorResult<SingleRotationCommand>;
    currentCommand?: SingleRotationCommand;
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
                state.rotationCommandsIterator = createRotationCommandIterator(
                    action.payload,
                );
                state.rotationCommandsIteratorResult = iterators.resultStart;
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
                    state.rotationCommandsIterator = action.payload.iterator;
                    state.rotationCommandsIteratorResult =
                        action.payload.result;
                },
            )
            .addCase(playerActions.nextCommand, (state, _action) => {
                if (!state.rotationCommandsIterator) {
                    return;
                }

                const result = iterators.next(state.rotationCommandsIterator);

                state.rotationCommandsIteratorResult = result;

                if (result.resultType === IteratorResultType.Value) {
                    state.currentCommand = result.value;
                }
            })
            .addCase(cubeActions.applyRotationCommands, (state, _action) => {
                state.currentCommand = undefined;
            });
    });
