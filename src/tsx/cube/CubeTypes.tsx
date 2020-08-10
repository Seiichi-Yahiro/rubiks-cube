import { Mat4 } from '../utils/Matrix4';

export type CubeAxis = [number, number, number];

export enum Color {
    BLUE = '#3d81f6',
    GREEN = '#009d54',
    RED = '#dc422f',
    ORANGE = '#ff6c00',
    WHITE = '#ffffff',
    YELLOW = '#fdcc09',
    DEFAULT = '#383838',
    TRANSPARENT = 'transparent',
}

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
