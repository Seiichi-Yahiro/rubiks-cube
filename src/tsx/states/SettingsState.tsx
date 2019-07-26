export interface ISettingsState {
    numberOfCubes: number;
    cubeSize: number;
    rotationAnimationSpeed: number;
}

export const initialSettingsState: ISettingsState = {
    numberOfCubes: 3,
    cubeSize: 300,
    rotationAnimationSpeed: 750
};
