import { createAction } from '@reduxjs/toolkit';
import { ICubicle } from '../../cube/CubeTypes';

export const enum CubeActionType {
    INIT_CUBE = 'INIT_CUBE',
    SET_CUBE_DIMENSION = 'SET_CUBE_DIMENSION',
    SET_CUBE_SCALE = 'SET_CUBE_SCALE',
    SET_ROTATION_ANIMATION_SPEED = 'SET_ROTATION_ANIMATION_SPEED',
    UPDATE_CUBICLES = 'UPDATE_CUBICLES',
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

const actions = {
    init,
    setCubeDimension,
    setCubeScale,
    setRotationAnimationSpeed,
    updateCubicles,
};

export { actions as cubeActions };
