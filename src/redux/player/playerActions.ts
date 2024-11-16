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

const skipToStart = createAction('SKIP_TO_START');
const skipToEnd = createAction('SKIP_TO_END');

const skipRemainingToStart = createAction('SKIP_REMAINING_TO_START');
const skipRemainingToEnd = createAction('SKIP_REMAINING_TO_END');

const setRotationCommandIterator = createAction<RotationCommandsIterator>(
    'SET_ROTATION_COMMAND_ITERATOR',
);

const nextCommand = createAction('NEXT_COMMAND');
const previousCommand = createAction('PREVIOUS_COMMAND');

const updateNotation = createAction<string>('UPDATE_NOTATION');

const parsedNotation =
    createAction<Result<RotationCommand[]>>('PARSED_NOTATION');

const actions = {
    play,
    stop,
    pause,
    unPause,
    skipToStart,
    skipToEnd,
    skipRemainingToStart,
    skipRemainingToEnd,
    setRotationCommandIterator,
    nextCommand,
    previousCommand,
    updateNotation,
    parsedNotation,
};

export { actions as playerActions };
