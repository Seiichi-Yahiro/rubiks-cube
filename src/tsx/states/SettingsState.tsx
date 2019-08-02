import { ViewType } from '../cube/CubeTypes';

export interface ISettingsState {
    numberOfCubes: number;
    cubeSize: number;
    rotationAnimationSpeed: number;
    view: ViewType;
}

export const initialSettingsState: ISettingsState = {
    numberOfCubes: 3,
    cubeSize: 300,
    rotationAnimationSpeed: 750,
    view: ViewType.D3
};
