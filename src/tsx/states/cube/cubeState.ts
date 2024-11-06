import { createReducer } from '@reduxjs/toolkit';
import { cubeActions } from './cubeActions';
import { ColorMap, ICubicle } from '../../cube/cubeTypes';
import { fromAngleX, fromAngleY, Mat4, multiply } from '../../utils/matrix4';
import {
    applyRotationCommand,
    axisToTranslation,
    sideToTransform,
} from '../../cube/cubeUtils';
import { defaultColorMap, loadColorMap } from '../localStorage';

export interface ICubeState {
    dimension: number;
    size: number;
    gapFactor: number;
    rotationDuration: number;
    cubicles: ICubicle[];
    rotation: Mat4;
    colorMap: ColorMap;
}

const initialCubeState: ICubeState = {
    dimension: 3,
    size: 300,
    gapFactor: 1.01,
    rotationDuration: 750,
    cubicles: [],
    rotation: multiply(fromAngleX(-45), fromAngleY(-45)),
    colorMap: loadColorMap(),
};

export const cubeReducer = createReducer(initialCubeState, (builder) => {
    builder
        .addCase(cubeActions.setCubeSize, (state, action) => {
            state.size = action.payload;
            const cubicleSize = state.size / state.dimension;

            for (const cubicle of state.cubicles) {
                cubicle.transform[3] = axisToTranslation(
                    cubicle.axis,
                    cubicleSize,
                    state.gapFactor,
                    state.dimension,
                )[3];

                for (const face of cubicle.faces) {
                    face.transform = sideToTransform(face.id, cubicleSize);
                }
            }
        })
        .addCase(cubeActions.setCubeDimension, (state, action) => {
            state.dimension = action.payload;
        })
        .addCase(cubeActions.setRotationAnimationSpeed, (state, action) => {
            state.rotationDuration = action.payload;
        })
        .addCase(cubeActions.updateCubicles, (state, action) => {
            state.cubicles = action.payload;
        })
        .addCase(cubeActions.applyRotationCommands, (state, action) => {
            state.cubicles = action.payload.reduce(
                (cubicles, command) =>
                    applyRotationCommand(cubicles, command, state.dimension),
                state.cubicles,
            );
        })
        .addCase(cubeActions.setColor, (state, action) => {
            state.colorMap[action.payload.key] = action.payload.value;
        })
        .addCase(cubeActions.resetColors, (state, _action) => {
            state.colorMap = defaultColorMap;
        });
});
