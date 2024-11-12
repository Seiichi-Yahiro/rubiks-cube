import { createAction } from '@reduxjs/toolkit';
import { Result } from 'parsimmon';
import { RotationCommand } from 'src/algorithms/rotationCommand';

const play = createAction<RotationCommand[]>('PLAY');
const stop = createAction('STOP');
const pause = createAction('PAUSE');
const unPause = createAction('UN_PAUSE');

const nextCommand = createAction('NEXT_COMMAND');
const animationFinished = createAction('ANIMATION_FINISHED');

const updateNotation = createAction<string>('UPDATE_NOTATION');

const parsedNotation =
    createAction<Result<RotationCommand[]>>('PARSED_NOTATION');

const actions = {
    play,
    stop,
    pause,
    unPause,
    nextCommand,
    animationFinished,
    updateNotation,
    parsedNotation,
};

export { actions as playerActions };
