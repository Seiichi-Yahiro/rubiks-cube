import { createAction } from '@reduxjs/toolkit';
import { ICubicle } from '../../cube/CubeTypes';
import { RotationCommand } from '../../cube/algorithms/RotationCommand';

export const enum CubeActionType {
    INIT_CUBE = 'INIT_CUBE',
    SET_CUBE_DIMENSION = 'SET_CUBE_DIMENSION',
    SET_CUBE_SCALE = 'SET_CUBE_SCALE',
    SET_ROTATION_ANIMATION_SPEED = 'SET_ROTATION_ANIMATION_SPEED',
    UPDATE_CUBICLES = 'UPDATE_CUBICLES',
    APPLY_ROTATION_COMMANDS = 'APPLY_ROTATION_COMMANDS',
    RESET_CUBE = 'RESET_CUBE',
}

const init = createAction(CubeActionType.INIT_CUBE);

const setCubeDimension = createAction(
    CubeActionType.SET_CUBE_DIMENSION,
    (dimension: number) => ({
        payload: { dimension },
    })
);

const setCubeScale = createAction(
    CubeActionType.SET_CUBE_SCALE,
    (scale: number) => ({ payload: { scale } })
);

const setRotationAnimationSpeed = createAction(
    CubeActionType.SET_ROTATION_ANIMATION_SPEED,
    (speed: number) => ({
        payload: { speed },
    })
);

const updateCubicles = createAction(
    CubeActionType.UPDATE_CUBICLES,
    (cubicles: ICubicle[]) => ({
        payload: { cubicles },
    })
);

const applyRotationCommands = createAction(
    CubeActionType.APPLY_ROTATION_COMMANDS,
    (rotationCommands: RotationCommand[]) => ({
        payload: { rotationCommands },
    })
);

const resetCube = createAction(CubeActionType.RESET_CUBE);

const actions = {
    init,
    setCubeDimension,
    setCubeScale,
    setRotationAnimationSpeed,
    updateCubicles,
    applyRotationCommands,
    resetCube,
};

export { actions as cubeActions };
