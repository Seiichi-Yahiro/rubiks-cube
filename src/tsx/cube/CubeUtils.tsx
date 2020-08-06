import { range } from 'lodash';
import { ICubicle, IFace, Axis, Color, Side } from './CubeTypes';
import { v4 } from 'uuid';
import {
    Mat4,
    identity,
    multiply,
    fromTranslation,
    fromAngleY,
    fromAngleX,
} from '../utils/Matrix4';

export const cubeIsTransitioning = 'cube--is-transitioning';

const sideToColor = {
    [Side.FRONT]: Color.BLUE,
    [Side.BACK]: Color.GREEN,
    [Side.LEFT]: Color.ORANGE,
    [Side.RIGHT]: Color.RED,
    [Side.UP]: Color.YELLOW,
    [Side.DOWN]: Color.WHITE,
};

const sideToTransform = (side: Side, cubicleSize: number): Mat4 => {
    const halfCubicleSize = cubicleSize / 2.0;
    return {
        [Side.FRONT]: fromTranslation(0, 0, halfCubicleSize),
        [Side.BACK]: multiply(
            fromTranslation(0, 0, -halfCubicleSize),
            fromAngleY(180)
        ),
        [Side.LEFT]: multiply(
            fromTranslation(-halfCubicleSize, 0, 0),
            fromAngleY(-90)
        ),
        [Side.RIGHT]: multiply(
            fromTranslation(halfCubicleSize, 0, 0),
            fromAngleY(90)
        ),
        [Side.UP]: multiply(
            fromTranslation(0, -halfCubicleSize, 0),
            fromAngleX(90)
        ),
        [Side.DOWN]: multiply(
            fromTranslation(0, halfCubicleSize, 0),
            fromAngleX(-90)
        ),
    }[side];
};

const axisToTransform = (
    [x, y, z]: Axis,
    cubicleSize: number,
    cubicleGap: number,
    cubeDimension: number
): Mat4 => {
    const offset = (cubeDimension + 1) * cubicleSize * (cubicleGap / 2);
    return fromTranslation(
        x * cubicleSize * cubicleGap - offset,
        y * cubicleSize * cubicleGap - offset,
        -z * cubicleSize * cubicleGap + offset
    );
};

const isCubicleVisible = (axis: Axis, cubeDimension: number) =>
    axis.some((it) => it === 1 || it === cubeDimension);

const isOuterFace = (side: Side, [x, y, z]: Axis, cubeDimension: number) =>
    ({
        [Side.FRONT]: z === 1,
        [Side.BACK]: z === cubeDimension,
        [Side.LEFT]: x === 1,
        [Side.RIGHT]: x === cubeDimension,
        [Side.UP]: y === 1,
        [Side.DOWN]: y === cubeDimension,
    }[side]);

const generateFace = (
    side: Side,
    axis: Axis,
    cubicleSize: number,
    cubeDimension: number
): IFace => ({
    id: v4(),
    color: isOuterFace(side, axis, cubeDimension)
        ? sideToColor[side]
        : Color.DEFAULT,
    transform: sideToTransform(side, cubicleSize),
});

export const generateCubicles = (
    cubicleSize: number,
    cubicleGap: number,
    cubeDimension: number
): ICubicle[] => {
    const indexes = range(1, cubeDimension + 1);
    return indexes
        .flatMap((z) =>
            indexes.flatMap((y) => indexes.map((x) => [x, y, z] as Axis))
        )
        .filter((axis) => isCubicleVisible(axis, cubeDimension))
        .map((axis) => ({
            id: v4(),
            axis,
            faces: Object.values(Side).map((side) =>
                generateFace(side, axis, cubicleSize, cubeDimension)
            ),
            transform: axisToTransform(
                axis,
                cubicleSize,
                cubicleGap,
                cubeDimension
            ),
            animatedTransform: identity(),
        }));
};
