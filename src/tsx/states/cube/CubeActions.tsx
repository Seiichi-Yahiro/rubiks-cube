import { createAction } from '@reduxjs/toolkit';
import { Color, ICubicle } from '../../cube/CubeTypes';
import { RotationCommand } from '../../cube/algorithms/RotationCommand';

const setCubeDimension = createAction<number>('SET_CUBE_DIMENSION');

const setCubeScale = createAction<number>('SET_CUBE_SCALE');

const setRotationAnimationSpeed = createAction<number>(
    'SET_ROTATION_ANIMATION_SPEED'
);

const updateCubicles = createAction<ICubicle[]>('UPDATE_CUBICLES');

const applyRotationCommands = createAction<RotationCommand[]>(
    'APPLY_ROTATION_COMMANDS'
);

const resetCube = createAction('RESET_CUBE');

const setColor = createAction('SET_COLOR', (key: Color, value: string) => ({
    payload: {
        key,
        value,
    },
}));

const actions = {
    setCubeDimension,
    setCubeScale,
    setRotationAnimationSpeed,
    updateCubicles,
    applyRotationCommands,
    resetCube,
    setColor,
};

export { actions as cubeActions };
