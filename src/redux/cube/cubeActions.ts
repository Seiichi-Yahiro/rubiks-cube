import { createAction } from '@reduxjs/toolkit';
import {
    RotationCommand,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';
import { Color, ICubicle } from 'src/tsx/cube/cubeTypes';

const setCubeSize = createAction<number>('SET_CUBE_SIZE');

const setCubeDimension = createAction<number>('SET_CUBE_DIMENSION');

const setRotationAnimationSpeed = createAction<number>(
    'SET_ROTATION_ANIMATION_SPEED',
);

const updateCubicles = createAction<ICubicle[]>('UPDATE_CUBICLES');

const applyRotationCommands = createAction<RotationCommand[]>(
    'APPLY_ROTATION_COMMANDS',
);

const resetCube = createAction('RESET_CUBE');

const setColor = createAction('SET_COLOR', (key: Color, value: string) => ({
    payload: {
        key,
        value,
    },
}));

const resetColors = createAction('RESET_COLORS');

const animateSingleRotationCommand =
    createAction<SingleRotationCommand>('PLAY_ANIMATION');

const animationFinished = createAction('ANIMATION_FINISHED');

const actions = {
    setCubeSize,
    setCubeDimension,
    setRotationAnimationSpeed,
    updateCubicles,
    applyRotationCommands,
    resetCube,
    setColor,
    resetColors,
    animateSingleRotationCommand,
    animationFinished,
};

export { actions as cubeActions };
