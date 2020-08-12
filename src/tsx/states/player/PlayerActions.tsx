import { createAction } from '@reduxjs/toolkit';
import { Result } from 'parsimmon';
import {
    RotationCommand,
    SingleRotationCommand,
} from '../../cube/algorithms/RotationCommand';

const play = createAction('PLAY');
const stop = createAction('STOP');
const pause = createAction('PAUSE');

const updateNotation = createAction<string>('UPDATE_NOTATION');

const parsedNotation = createAction<Result<RotationCommand[]>>(
    'PARSED_NOTATION'
);

const setCurrentRotationCommand = createAction<SingleRotationCommand>(
    'SET_CURRENT_ROTATION_COMMAND'
);

const actions = {
    play,
    stop,
    pause,
    updateNotation,
    parsedNotation,
    setCurrentRotationCommand,
};

export { actions as playerActions };
