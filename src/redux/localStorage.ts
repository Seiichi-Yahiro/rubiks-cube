import { Color, ColorMap } from 'src/tsx/cube/cubeTypes';

export const COLOR_MAP = 'colorMap';

export const defaultColorMap: ColorMap = {
    [Color.BLUE]: Color.BLUE,
    [Color.GREEN]: Color.GREEN,
    [Color.RED]: Color.RED,
    [Color.ORANGE]: Color.ORANGE,
    [Color.WHITE]: Color.WHITE,
    [Color.YELLOW]: Color.YELLOW,
    [Color.DEFAULT]: Color.DEFAULT,
    [Color.TRANSPARENT]: Color.TRANSPARENT,
};

export const loadColorMap = (): ColorMap => {
    const loadedColorMap = localStorage.getItem(COLOR_MAP);
    if (loadedColorMap) {
        return JSON.parse(loadedColorMap) as ColorMap;
    } else {
        return defaultColorMap;
    }
};
