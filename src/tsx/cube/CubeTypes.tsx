import { Mat4 } from '../utils/Matrix4';

export type Axis = [number, number, number];

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

export interface IFace {
    id: Side;
    color: Color;
    transform: Mat4;
}

export interface ICubicle {
    id: Axis;
    axis: Axis;
    faces: IFace[];
    transform: Mat4;
    animatedTransform: Mat4;
}
