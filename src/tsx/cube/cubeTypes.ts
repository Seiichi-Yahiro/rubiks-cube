import { Mat4 } from 'src/utils/matrix4';

export type CubeAxis = [number, number, number];

export enum Color {
    BLUE = '#3D81F6',
    GREEN = '#009D54',
    RED = '#dC422F',
    ORANGE = '#FF6C00',
    WHITE = '#FFFFFF',
    YELLOW = '#FDCC09',
    DEFAULT = '#383838',
    TRANSPARENT = 'transparent',
}

export type ColorMap = {
    [key in Color]: string;
};

export enum Side {
    FRONT = 'FRONT',
    BACK = 'BACK',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    UP = 'UP',
    DOWN = 'DOWN',
}

export enum Direction {
    CLOCKWISE = 1,
    ANTI_CLOCKWISE = -1,
}

export enum FaceArrowDirection {
    UP = 180,
    LEFT = 90,
    RIGHT = -90,
    DOWN = 0,
}

export interface IFace {
    id: Side;
    color: Color;
    transform: Mat4;
}

export interface ICubicle {
    id: CubeAxis;
    axis: CubeAxis;
    faces: IFace[];
    transform: Mat4;
}
