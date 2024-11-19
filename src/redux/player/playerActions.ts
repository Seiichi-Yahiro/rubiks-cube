import { createAction } from '@reduxjs/toolkit';
import { Result } from 'parsimmon';
import type {
    RotationCommand,
    RotationCommandsIterator,
} from 'src/algorithms/rotationCommand';

const play = createAction<RotationCommand[]>('PLAY');
const stop = createAction('STOP');
const pause = createAction('PAUSE');
const unPause = createAction('UN_PAUSE');

export enum Direction {
    Forwards = 'Forwards',
    Backwards = 'Backwards',
}

const skip = createAction<Direction>('SKIP');
const skipRemaining = createAction<Direction>('SKIP_REMAINING');

const setRotationCommandIterator = createAction<RotationCommandsIterator>(
    'SET_ROTATION_COMMAND_ITERATOR',
);

const nextCommand = createAction('NEXT_COMMAND');

const updateNotation = createAction<string>('UPDATE_NOTATION');

const parsedNotation =
    createAction<Result<RotationCommand[]>>('PARSED_NOTATION');

const actions = {
    play,
    stop,
    pause,
    unPause,
    skip,
    skipRemaining,
    setRotationCommandIterator,
    nextCommand,
    updateNotation,
    parsedNotation,
};

export { actions as playerActions };
