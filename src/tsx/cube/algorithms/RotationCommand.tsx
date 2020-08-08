import { range } from 'lodash';
import { Failure, Result, Success } from 'parsimmon';
import { fromAngleX, fromAngleY, fromAngleZ, Mat4 } from '../../utils/Matrix4';

export interface SingleRotationCommand {
    readonly axis: Axis;
    readonly slices: number[];
    readonly rotation: number;
}

export interface LoopedRotationCommands {
    readonly commands: RotationCommand[];
    readonly iterations: number;
}

export type RotationCommand = SingleRotationCommand | LoopedRotationCommands;

export const isLoopedRotationCommands = (
    rotationCommand: RotationCommand
): rotationCommand is LoopedRotationCommands =>
    (rotationCommand as LoopedRotationCommands).iterations !== undefined;

export enum Axis {
    X = 0,
    Y = 1,
    Z = 2,
}

export const rotationToCubicleMat4 = (axis: Axis, rotation: number): Mat4 => {
    switch (axis) {
        case Axis.X: {
            return fromAngleX(rotation);
        }
        case Axis.Y: {
            return fromAngleY(rotation);
        }
        case Axis.Z: {
            return fromAngleZ(rotation);
        }
    }
};

export const rotationToAxisMat4 = (axis: Axis, rotation: number): Mat4 => {
    switch (axis) {
        case Axis.X: {
            return fromAngleX(-rotation);
        }
        case Axis.Y: {
            return fromAngleY(-rotation);
        }
        case Axis.Z: {
            return fromAngleZ(rotation);
        }
    }
};

export const letterToAxis = (letter: string): Axis => {
    switch (letter.toUpperCase()) {
        case 'L':
        case 'R':
        case 'M':
        case 'X':
            return Axis.X;
        case 'U':
        case 'D':
        case 'E':
        case 'Y':
            return Axis.Y;
        case 'F':
        case 'B':
        case 'S':
        case 'Z':
            return Axis.Z;
        default:
            throw new Error(`${letter} is not a valid cube notation Letter!`);
    }
};

export const letterToSlices = (
    letter: string,
    cubeDimension: number
): number[] => {
    switch (letter) {
        case 'F':
        case 'U':
        case 'L':
            return [1];
        case 'f':
        case 'u':
        case 'l':
            if (cubeDimension < 3) {
                return [1];
            } else if (cubeDimension > 3) {
                return [2];
            } else {
                return [1, 2];
            }
        case 'B':
        case 'D':
        case 'R':
            return [cubeDimension];
        case 'b':
        case 'd':
        case 'r':
            if (cubeDimension < 3) {
                return [cubeDimension];
            } else if (cubeDimension > 3) {
                return [cubeDimension - 1];
            } else {
                return [cubeDimension - 1, cubeDimension];
            }
        case 'X':
        case 'Y':
        case 'Z':
        case 'x':
        case 'y':
        case 'z':
            return range(1, cubeDimension + 1);
        case 'M':
        case 'E':
        case 'S':
            return (() => {
                const middleSlice = Math.ceil(cubeDimension / 2);
                return cubeDimension % 2 === 0
                    ? [middleSlice, middleSlice + 1]
                    : [middleSlice];
            })();
        case 'm':
        case 'e':
        case 's':
            switch (cubeDimension) {
                case 1:
                    return [1];
                case 2:
                    return [1, 2];
                default:
                    return range(2, cubeDimension);
            }
        default:
            throw new Error(`${letter} is not a valid cube notation Letter!`);
    }
};

export const letterToRotation = (letter: string): number => {
    switch (letter.toUpperCase()) {
        case 'F':
        case 'D':
        case 'R':
        case 'E': // Same as D
        case 'S': // Same as F
        case 'X': // Same as R
        case 'Z': // Same as F
            return 90;
        case 'B':
        case 'U':
        case 'L':
        case 'M': // Same as L
        case 'Y': // Same as U
            return -90;
        default:
            throw new Error(`${letter} is not a valid cube notation Letter!`);
    }
};

export const wide = (hasWide: boolean) => (
    letter: string,
    slices: number[],
    cubeDimension: number
): number[] => {
    if (hasWide) {
        switch (letter.toUpperCase()) {
            case 'B':
            case 'D':
            case 'R':
                return range(cubeDimension - slices[0] + 1, cubeDimension + 1);
            default:
                return range(1, slices[0] + 1);
        }
    } else {
        switch (letter.toUpperCase()) {
            case 'B':
            case 'D':
            case 'R':
                return slices.map((slice) => cubeDimension + 1 - slice);
            default:
                return slices;
        }
    }
};

export const prime = (hasPrime: boolean) => (rotation: number): number =>
    hasPrime ? rotation * -1 : rotation;
export const double = (hasDouble: boolean) => (rotation: number): number =>
    hasDouble ? Math.sign(rotation) * 180 : rotation;

export const isError = (result: Result<RotationCommand[]>): result is Failure =>
    !result.status;

export const isOk = (
    result: Result<RotationCommand[]>
): result is Success<RotationCommand[]> => result.status;
