import { CubeColorKey, CubeColorVariables } from 'src/tsx/cube/cubeTypes';

export const CUBE_COLORS = 'cubeColors';

export const defaultColorMap = {
    [CubeColorKey.FRONT]: '#3d81f6',
    [CubeColorKey.BACK]: '#009d54',
    [CubeColorKey.LEFT]: '#ff6c00',
    [CubeColorKey.RIGHT]: '#dc422f',
    [CubeColorKey.UP]: '#fdcc09',
    [CubeColorKey.DOWN]: '#ffffff',
    [CubeColorKey.INSIDE]: '#333333',
    [CubeColorKey.UNKNOWN]: '#b0b0b0',
} satisfies CubeColorVariables;

export const loadColorMap = (): CubeColorVariables => {
    const loadedColorMap = localStorage.getItem(CUBE_COLORS);
    if (loadedColorMap) {
        return JSON.parse(loadedColorMap) as CubeColorVariables;
    } else {
        return defaultColorMap;
    }
};
