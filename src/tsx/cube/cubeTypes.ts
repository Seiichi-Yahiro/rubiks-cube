import type { CSSProperties } from 'react';
import { Mat4 } from 'src/utils/matrix4';

export type CubeAxis = [number, number, number];

export enum CubeColorKey {
    FRONT = '--cube-face-front',
    BACK = '--cube-face-back',
    LEFT = '--cube-face-left',
    RIGHT = '--cube-face-right',
    UP = '--cube-face-up',
    DOWN = '--cube-face-down',
    INSIDE = '--cube-face-inside',
    UNKNOWN = '--cube-face-unknown',
}

export const cubeColorKeyToClassName = (cubeColorKey: CubeColorKey) =>
    cubeColorKey.substring(2);

export interface CubeColorVariables {
    [CubeColorKey.FRONT]: CSSProperties['color'];
    [CubeColorKey.BACK]: CSSProperties['color'];
    [CubeColorKey.LEFT]: CSSProperties['color'];
    [CubeColorKey.RIGHT]: CSSProperties['color'];
    [CubeColorKey.UP]: CSSProperties['color'];
    [CubeColorKey.DOWN]: CSSProperties['color'];
    [CubeColorKey.INSIDE]: CSSProperties['color'];
    [CubeColorKey.UNKNOWN]: CSSProperties['color'];
}

export type SideMap<T> = {
    [Side.FRONT]: T;
    [Side.BACK]: T;
    [Side.LEFT]: T;
    [Side.RIGHT]: T;
    [Side.UP]: T;
    [Side.DOWN]: T;
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
    cubeSide: Side;
    colorKey: CubeColorKey;
    transform: Mat4;
}

export interface ICubicle {
    id: CubeAxis;
    axis: CubeAxis;
    faces: IFace[];
    transform: Mat4;
}
