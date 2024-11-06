import { range, zip, curry } from 'lodash';
import {
    ICubicle,
    IFace,
    CubeAxis,
    Color,
    Side,
    FaceArrowDirection,
} from './cubeTypes';
import {
    Mat4,
    multiply,
    fromTranslation,
    fromAngleY,
    fromAngleX,
    apply,
} from 'src/utils/matrix4';
import { Vec4 } from 'src/utils/vector4';
import {
    RotationCommand,
    isLoopedRotationCommands,
    rotationCommandToMat4,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';

const sideToColor = {
    [Side.FRONT]: Color.BLUE,
    [Side.BACK]: Color.GREEN,
    [Side.LEFT]: Color.ORANGE,
    [Side.RIGHT]: Color.RED,
    [Side.UP]: Color.YELLOW,
    [Side.DOWN]: Color.WHITE,
};

export const sideToTransform = (side: Side, cubicleSize: number): Mat4 => {
    const halfCubicleSize = cubicleSize / 2.0;
    return {
        [Side.FRONT]: fromTranslation(0, 0, halfCubicleSize),
        [Side.BACK]: multiply(
            fromTranslation(0, 0, -halfCubicleSize),
            fromAngleY(180),
        ),
        [Side.LEFT]: multiply(
            fromTranslation(-halfCubicleSize, 0, 0),
            fromAngleY(-90),
        ),
        [Side.RIGHT]: multiply(
            fromTranslation(halfCubicleSize, 0, 0),
            fromAngleY(90),
        ),
        [Side.UP]: multiply(
            fromTranslation(0, -halfCubicleSize, 0),
            fromAngleX(90),
        ),
        [Side.DOWN]: multiply(
            fromTranslation(0, halfCubicleSize, 0),
            fromAngleX(-90),
        ),
    }[side];
};

export const axisToTranslation = (
    [x, y, z]: CubeAxis,
    cubicleSize: number,
    cubicleGap: number,
    cubeDimension: number,
): Mat4 => {
    const offset = (cubeDimension + 1) * cubicleSize * (cubicleGap / 2);
    const sizeGap = cubicleSize * cubicleGap;
    return fromTranslation(
        x * sizeGap - offset,
        y * sizeGap - offset,
        -z * sizeGap + offset,
    );
};

export const rotateAxis = (
    axis: CubeAxis,
    rotation: Mat4,
    cubeDimension: number,
): CubeAxis => {
    const offset = (cubeDimension + 1) * 0.5;
    const point = axis.map((it, index) =>
        index === 2 ? -it + offset : it - offset,
    );
    const rotatedPoint = apply([...point, 1] as Vec4, rotation).slice(0, 3);
    return rotatedPoint
        .map((it, index) => (index === 2 ? -it + offset : it + offset))
        .map(Math.round) as CubeAxis;
};

const isCubicleVisible = (axis: CubeAxis, cubeDimension: number) =>
    axis.some((it) => it === 1 || it === cubeDimension);

const isOuterFace = (side: Side, [x, y, z]: CubeAxis, cubeDimension: number) =>
    ({
        [Side.FRONT]: z === 1,
        [Side.BACK]: z === cubeDimension,
        [Side.LEFT]: x === 1,
        [Side.RIGHT]: x === cubeDimension,
        [Side.UP]: y === 1,
        [Side.DOWN]: y === cubeDimension,
    })[side];

const generateFace = (
    side: Side,
    axis: CubeAxis,
    cubicleSize: number,
    cubeDimension: number,
): IFace => ({
    id: side,
    color: isOuterFace(side, axis, cubeDimension)
        ? sideToColor[side]
        : Color.DEFAULT,
    transform: sideToTransform(side, cubicleSize),
});

export const generateCubicles = (
    cubicleSize: number,
    cubicleGap: number,
    cubeDimension: number,
): ICubicle[] => {
    const indexes = range(1, cubeDimension + 1);
    return indexes
        .flatMap((z) =>
            indexes.flatMap((y) => indexes.map<CubeAxis>((x) => [x, y, z])),
        )
        .filter((axis) => isCubicleVisible(axis, cubeDimension))
        .map<ICubicle>((axis) => ({
            id: axis,
            axis,
            faces: Object.values(Side).map((side) =>
                generateFace(side, axis, cubicleSize, cubeDimension),
            ),
            transform: axisToTranslation(
                axis,
                cubicleSize,
                cubicleGap,
                cubeDimension,
            ),
        }));
};

export const canApplyRotationCommand = (
    cubeAxis: CubeAxis,
    { slices, axis }: SingleRotationCommand,
): boolean => slices.includes(cubeAxis[axis]);

export const applyRotationCommand = (
    cubicles: ICubicle[],
    rotationCommand: RotationCommand,
    cubeDimension: number,
): ICubicle[] => {
    if (isLoopedRotationCommands(rotationCommand)) {
        return range(0, rotationCommand.iterations).reduce(
            (cubicles2, _) =>
                rotationCommand.commands.reduce(
                    (cubicles3, command) =>
                        applyRotationCommand(cubicles3, command, cubeDimension),
                    cubicles2,
                ),
            cubicles,
        );
    } else {
        return cubicles.map((cubicle) => {
            if (canApplyRotationCommand(cubicle.axis, rotationCommand)) {
                const rotationMat = rotationCommandToMat4(rotationCommand);
                return {
                    ...cubicle,
                    axis: rotateAxis(cubicle.axis, rotationMat, cubeDimension),
                    transform: multiply(rotationMat, cubicle.transform),
                };
            } else {
                return cubicle;
            }
        });
    }
};

export const generateFaceArrowCommand = curry(
    (
        cubeAxis: CubeAxis,
        cubicleRotation: Mat4,
        originalSide: Side,
        faceArrow: FaceArrowDirection,
    ): SingleRotationCommand => {
        // TODO find a way to calculate this from existing matrices
        const [down, right] = {
            [Side.FRONT]: [
                [-1, 0, 0],
                [0, 1, 0],
            ],
            [Side.BACK]: [
                [1, 0, 0],
                [0, 1, 0],
            ],
            [Side.LEFT]: [
                [0, 0, -1],
                [0, 1, 0],
            ],
            [Side.RIGHT]: [
                [0, 0, 1],
                [0, 1, 0],
            ],
            [Side.UP]: [
                [-1, 0, 0],
                [0, 0, 1],
            ],
            [Side.DOWN]: [
                [-1, 0, 0],
                [0, 0, -1],
            ],
        }[originalSide];

        const point = {
            [FaceArrowDirection.DOWN]: down,
            [FaceArrowDirection.RIGHT]: right,
            [FaceArrowDirection.UP]: down.map((it) => it * -1),
            [FaceArrowDirection.LEFT]: right.map((it) => it * -1),
        }[faceArrow];

        const rotatedPoint = apply([...point, 0] as Vec4, cubicleRotation)
            .slice(0, 3)
            .map(Math.round);

        const newCubeAxis = zip(cubeAxis, rotatedPoint).map(
            ([it, sign]) => it! * sign!,
        );

        const axis = newCubeAxis.findIndex((it) => it !== 0);
        const slice = newCubeAxis[axis];

        return {
            axis,
            slices: [Math.abs(slice)],
            rotation: 90 * Math.sign(slice),
        };
    },
);
