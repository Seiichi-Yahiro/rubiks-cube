import { createReducer } from '@reduxjs/toolkit';
import { cubeActions } from './CubeActions';
import { ICubicle } from '../../cube/CubeTypes';
import { Mat4, multiply, fromAngleX, fromAngleY } from '../../utils/Matrix4';

export interface ICubeState {
    dimension: number;
    size: number;
    gapFactor: number;
    scale: number;
    rotationAnimationSpeed: number;
    cubicles: ICubicle[];
    rotation: Mat4;
}

const initialCubeState: ICubeState = {
    dimension: 3,
    size: 300,
    gapFactor: 1.01,
    scale: 1.0,
    rotationAnimationSpeed: 750,
    cubicles: [],
    rotation: multiply(fromAngleX(-45), fromAngleY(-45)),
};

export const cubeReducer = createReducer(initialCubeState, (builder) => {
    builder
        .addCase(cubeActions.setCubeDimension, (state, action) => {
            state.dimension = action.payload.dimension;
        })
        .addCase(cubeActions.setCubeScale, (state, action) => {
            state.scale = action.payload.scale;
        })
        .addCase(cubeActions.setRotationAnimationSpeed, (state, action) => {
            state.rotationAnimationSpeed = action.payload.speed;
        })
        .addCase(cubeActions.updateCubicles, (state, action) => {
            state.cubicles = action.payload.cubicles;
        });
});
