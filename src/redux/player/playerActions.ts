import { createAction } from '@reduxjs/toolkit';
import { Result } from 'parsimmon';
import type {
    RotationCommand,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';

const play = createAction<RotationCommand[]>('PLAYER/PLAY');
const stop = createAction('PLAYER/STOP');
const pause = createAction('PLAYER/PAUSE');
const resume = createAction('PLAYER/RESUME');

export enum Direction {
    Forwards = 'Forwards',
    Backwards = 'Backwards',
}

const skip = createAction<Direction>('PLAYER/SKIP');
const skipRemaining = createAction<Direction>('PLAYER/SKIP_REMAINING');

const nextStep = createAction<Direction>('PLAYER/NEXT_STEP');

const createRotationCommandIterator = createAction<RotationCommand[]>(
    'PLAYER/CREATE_ROTATION_COMMAND_ITERATOR',
);

const generateRotationCommands = createAction<{
    direction: Direction;
    amount: number | 'Remaining';
}>('PLAYER/GENERATE_ROTATION_COMMANDS');

const generatedRotationCommands = createAction<{
    direction: Direction;
    commands: SingleRotationCommand[];
}>('PLAYER/GENERATED_ROTATION_COMMANDS');

const updateNotation = createAction<string>('PLAYER/UPDATE_NOTATION');

const parsedNotation = createAction<Result<RotationCommand[]>>(
    'PLAYER/PARSED_NOTATION',
);

const setAnimationLoopDelay = createAction<number>(
    'PLAYER/SET_ANIMATION_LOOP_DELAY',
);

const actions = {
    play,
    stop,
    pause,
    resume,
    skip,
    skipRemaining,
    nextStep,
    createRotationCommandIterator,
    generateRotationCommands,
    generatedRotationCommands,
    updateNotation,
    parsedNotation,
    setAnimationLoopDelay,
};

export { actions as playerActions };
