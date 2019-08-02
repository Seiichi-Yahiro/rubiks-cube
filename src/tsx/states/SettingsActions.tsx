import { ISettingsState } from './SettingsState';
import { ActionCreator } from './Actions';
import { ViewType } from '../cube/CubeTypes';

export enum SettingsActions {
    UPDATE_NUMBER_OF_CUBES,
    UPDATE_CUBE_SIZE,
    UPDATE_ROTATION_ANIMATION_SPEED,
    UPDATE_VIEW_TYPE
}

type Action = ActionCreator<SettingsActions, ISettingsState>;

export const updateNumberOfCubesAction = (numberOfCubes: number): Action => () => ({
    type: SettingsActions.UPDATE_NUMBER_OF_CUBES,
    payload: { numberOfCubes }
});

export const updateCubeSizeAction = (cubeSize: number): Action => () => ({
    type: SettingsActions.UPDATE_CUBE_SIZE,
    payload: { cubeSize }
});

export const updateRotationAnimationSpeedAction = (rotationAnimationSpeed: number): Action => () => ({
    type: SettingsActions.UPDATE_ROTATION_ANIMATION_SPEED,
    payload: { rotationAnimationSpeed }
});

export const updateViewType = (view: ViewType): Action => (prevState: ISettingsState) => ({
    type: SettingsActions.UPDATE_VIEW_TYPE,
    payload: {
        view,
        cubeSize: view === ViewType.D2 && prevState.cubeSize > 300 ? 300 : prevState.cubeSize
    }
});
