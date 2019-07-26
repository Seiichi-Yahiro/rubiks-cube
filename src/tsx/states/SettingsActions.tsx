import { ISettingsState } from './SettingsState';
import { ActionCreator } from './Actions';

export enum SettingsActions {
    UPDATE_NUMBER_OF_CUBES,
    UPDATE_CUBE_SIZE,
    UPDATE_ROTATION_ANIMATION_SPEED
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
