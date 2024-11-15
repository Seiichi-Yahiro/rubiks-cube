import { createAction } from '@reduxjs/toolkit';
import { Result } from 'parsimmon';
import {
    RotationCommand,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';
import type { Iterator, IteratorResult } from 'src/utils/iterators/types';

const play = createAction<RotationCommand[]>('PLAY');
const stop = createAction('STOP');
const pause = createAction('PAUSE');
const unPause = createAction('UN_PAUSE');

const skipToEnd = createAction('SKIP_TO_END');

const setRotationCommandIterator = createAction<{
    iterator: Iterator<SingleRotationCommand>;
    result: IteratorResult<SingleRotationCommand>;
}>('SET_ROTATION_COMMAND_ITERATOR');

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
    skipToEnd,
    setRotationCommandIterator,
    nextCommand,
    previousCommand,
    updateNotation,
    parsedNotation,
};

export { actions as playerActions };
