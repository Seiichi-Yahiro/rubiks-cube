import { createAction } from '@reduxjs/toolkit';
import { Result } from 'parsimmon';
import type {
    RotationCommand,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';

const play = createAction<RotationCommand[]>('PLAY');
const stop = createAction('STOP');
const pause = createAction('PAUSE');
const resume = createAction('RESUME');

export enum Direction {
    Forwards = 'Forwards',
    Backwards = 'Backwards',
}

const skip = createAction<Direction>('SKIP');
const skipRemaining = createAction<Direction>('SKIP_REMAINING');

const nextStep = createAction<Direction>('NEXT_STEP');

const createRotationCommandIterator = createAction<RotationCommand[]>(
    'CREATE_ROTATION_COMMAND_ITERATOR',
);

const generateRotationCommands = createAction<{
    direction: Direction;
    amount: number;
}>('GENERATE_ROTATION_COMMANDS');

const generatedRotationCommands = createAction<SingleRotationCommand[]>(
    'GENERATED_ROTATION_COMMANDS',
);

const updateNotation = createAction<string>('UPDATE_NOTATION');

const parsedNotation =
    createAction<Result<RotationCommand[]>>('PARSED_NOTATION');

const setAnimationLoopDelay = createAction<number>('SET_ANIMATION_LOOP_DELAY');

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
