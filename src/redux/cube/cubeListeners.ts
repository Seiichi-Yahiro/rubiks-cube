import { isAnyOf } from '@reduxjs/toolkit';
import { cubeActions } from 'src/redux/cube/cubeActions';
import type { AppStartListening } from 'src/redux/listener';
import { COLOR_MAP } from 'src/redux/localStorage';
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

            await listenerApi.condition((action) =>
                cubeActions.animationFinished.match(action),
            );

            listenerApi.dispatch(
                cubeActions.applyRotationCommands([action.payload]),
            );

            listenerApi.subscribe();
        },
    });

export const saveColorMapListener = (startListening: AppStartListening) =>
    startListening({
        matcher: isAnyOf(cubeActions.setColor, cubeActions.resetColors),
        effect: (_action, listenerApi) => {
            const state = listenerApi.getState();
            const colorMap = state.cube.colorMap;
            localStorage.setItem(COLOR_MAP, JSON.stringify(colorMap));
        },
    });
