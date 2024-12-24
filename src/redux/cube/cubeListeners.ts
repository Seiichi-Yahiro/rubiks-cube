import { isAnyOf } from '@reduxjs/toolkit';
import { cubeActions } from 'src/redux/cube/cubeActions';
import type { AppStartListening } from 'src/redux/listener';
import { CUBE_COLORS } from 'src/redux/localStorage';
import { CubeColorKey } from 'src/tsx/cube/cubeTypes';
import { generateCubicles } from 'src/tsx/cube/cubeUtils';

export const createCubiclesListener = (startListening: AppStartListening) =>
    startListening({
        matcher: isAnyOf(cubeActions.setCubeDimension, cubeActions.resetCube),
        effect: (_action, listenerApi) => {
            const state = listenerApi.getState();

            listenerApi.dispatch(
                cubeActions.updateCubicles(
                    generateCubicles(
                        state.cube.size / state.cube.dimension,
                        state.cube.gapFactor,
                        state.cube.dimension,
                    ),
                ),
            );
        },
    });

export const animationFinishedListener = (startListening: AppStartListening) =>
    startListening({
        actionCreator: cubeActions.animateSingleRotationCommand,
        effect: async (action, listenerApi) => {
            listenerApi.unsubscribe();

            await listenerApi.condition(cubeActions.animationFinished.match);

            listenerApi.dispatch(
                cubeActions.applyRotationCommands([action.payload]),
            );

            listenerApi.subscribe();
        },
    });

export const setColorMapCssVariablesListener = (
    startListening: AppStartListening,
) =>
    startListening({
        matcher: isAnyOf(
            cubeActions.setColorMap,
            cubeActions.setColor,
            cubeActions.resetColors,
        ),
        effect: (_action, listenerApi) => {
            const state = listenerApi.getState();
            const colors = state.cube.colors;

            const root = document.documentElement;

            (Object.entries(colors) as [CubeColorKey, string][]).forEach(
                ([key, value]) => {
                    root.style.setProperty(key, value);
                },
            );
        },
    });

export const saveColorMapListener = (startListening: AppStartListening) =>
    startListening({
        matcher: isAnyOf(
            cubeActions.setColorMap,
            cubeActions.setColor,
            cubeActions.resetColors,
        ),
        effect: (_action, listenerApi) => {
            const state = listenerApi.getState();
            const colors = state.cube.colors;
            localStorage.setItem(CUBE_COLORS, JSON.stringify(colors));
        },
    });
