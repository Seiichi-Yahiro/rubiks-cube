import { createReducer } from '@reduxjs/toolkit';
import { cubeActions } from './CubeActions';
import { ICubicle } from '../../cube/CubeTypes';
import { fromAngleX, fromAngleY, Mat4, multiply } from '../../utils/Matrix4';
import { applyRotationCommand } from '../../cube/CubeUtils';

export interface ICubeState {
    dimension: number;
    size: number;
    gapFactor: number;
    scale: number;
    rotationDuration: number;
    cubicles: ICubicle[];
    rotation: Mat4;
}

const initialCubeState: ICubeState = {
    dimension: 3,
    size: 300,
    gapFactor: 1.01,
    scale: 1.0,
    rotationDuration: 750,
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
            state.rotationDuration = action.payload.speed;
        })
        .addCase(cubeActions.updateCubicles, (state, action) => {
            state.cubicles = action.payload.cubicles;
        })
        .addCase(cubeActions.applyRotationCommands, (state, action) => {
            state.cubicles = action.payload.rotationCommands.reduce(
                (cubicles, command) =>
                    applyRotationCommand(cubicles, command, state.dimension),
                state.cubicles
            );
        });
});
