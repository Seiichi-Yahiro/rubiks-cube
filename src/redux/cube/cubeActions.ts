import { createAction } from '@reduxjs/toolkit';
import {
    RotationCommand,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';
import { type CubeColorVariables, ICubicle } from 'src/tsx/cube/cubeTypes';

const setCubeSize = createAction<number>('CUBE/SET_CUBE_SIZE');

const setCubeDimension = createAction<number>('CUBE/SET_CUBE_DIMENSION');

const setRotationAnimationSpeed = createAction<number>(
    'CUBE/SET_ROTATION_ANIMATION_SPEED',
);

const updateCubicles = createAction<ICubicle[]>('CUBE/UPDATE_CUBICLES');

const applyRotationCommands = createAction<RotationCommand[]>(
    'CUBE/APPLY_ROTATION_COMMANDS',
);

const resetCube = createAction('CUBE/RESET_CUBE');

const setColorMap = createAction<CubeColorVariables>('CUBE/SET_COLOR_MAP');

const setColor = createAction(
    'CUBE/SET_COLOR',
    (key: keyof CubeColorVariables, value: string) => ({
        payload: {
            key,
            value,
        },
    }),
);

const resetColors = createAction('CUBE/RESET_COLORS');

const animateSingleRotationCommand = createAction<SingleRotationCommand>(
    'CUBE/PLAY_ANIMATION',
);

const animationFinished = createAction('CUBE/ANIMATION_FINISHED');

const actions = {
    setCubeSize,
    setCubeDimension,
    setRotationAnimationSpeed,
    updateCubicles,
    applyRotationCommands,
    resetCube,
    setColorMap,
    setColor,
    resetColors,
    animateSingleRotationCommand,
    animationFinished,
};

export { actions as cubeActions };
