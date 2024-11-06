import { createAction } from '@reduxjs/toolkit';
import { Result } from 'parsimmon';
import {
    RotationCommand,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';

const play = createAction<RotationCommand[]>('PLAY');
const stop = createAction('STOP');
const pause = createAction('PAUSE');
const unPause = createAction('UN_PAUSE');

const updateNotation = createAction<string>('UPDATE_NOTATION');

const parsedNotation =
    createAction<Result<RotationCommand[]>>('PARSED_NOTATION');

const setCurrentRotationCommand = createAction<SingleRotationCommand>(
    'SET_CURRENT_ROTATION_COMMAND',
);

const actions = {
    play,
    stop,
    pause,
    unPause,
    updateNotation,
    parsedNotation,
    setCurrentRotationCommand,
};

export { actions as playerActions };
