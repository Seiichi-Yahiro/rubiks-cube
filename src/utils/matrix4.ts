import { partial, zip } from 'es-toolkit';
import { dot, Vec4 } from 'src/utils/vector4';

export type Mat4 = [Vec4, Vec4, Vec4, Vec4];

const toRadian = (degree: number) => (degree / 180) * Math.PI;

export const identity: Mat4 = [
    [1.0, 0.0, 0.0, 0.0],
    [0.0, 1.0, 0.0, 0.0],
    [0.0, 0.0, 1.0, 0.0],
    [0.0, 0.0, 0.0, 1.0],
];

export const fromTranslation = (x: number, y: number, z: number): Mat4 => [
    [1.0, 0.0, 0.0, 0.0],
    [0.0, 1.0, 0.0, 0.0],
    [0.0, 0.0, 1.0, 0.0],
    [x, y, z, 1.0],
];

export const fromAngleX = (degree: number): Mat4 => {
    const radian = toRadian(degree);
    const sin = Math.sin(radian);
    const cos = Math.cos(radian);

    return [
        [1.0, 0.0, 0.0, 0.0],
        [0.0, cos, sin, 0.0],
        [0.0, -sin, cos, 0.0],
        [0.0, 0.0, 0.0, 1.0],
    ];
};

export const fromAngleY = (degree: number): Mat4 => {
    const radian = toRadian(degree);
    const sin = Math.sin(radian);
    const cos = Math.cos(radian);

    return [
        [cos, 0.0, -sin, 0.0],
        [0.0, 1.0, 0.0, 0.0],
        [sin, 0.0, cos, 0.0],
        [0.0, 0.0, 0.0, 1.0],
    ];
};

export const fromAngleZ = (degree: number): Mat4 => {
    const radian = toRadian(degree);
    const sin = Math.sin(radian);
    const cos = Math.cos(radian);

    return [
        [cos, sin, 0.0, 0.0],
        [-sin, cos, 0.0, 0.0],
        [0.0, 0.0, 1.0, 0.0],
        [0.0, 0.0, 0.0, 1.0],
    ];
};

export const transpose = ([x, y, z, w]: Mat4): Mat4 => zip(x, y, z, w) as Mat4;

export const multiply = (a: Mat4, [x2, y2, z2, w2]: Mat4): Mat4 => {
    const aTransposed = transpose(a);
    return [
        aTransposed.map(partial(dot, x2)),
        aTransposed.map(partial(dot, y2)),
        aTransposed.map(partial(dot, z2)),
        aTransposed.map(partial(dot, w2)),
    ] as Mat4;
};

export const apply = (point: Vec4, mat: Mat4): Vec4 =>
    transpose(mat).map((row) => dot(row, point)) as Vec4;

export const toCss = (mat: Mat4): string => `matrix3d(${mat.flat().join(',')})`;
