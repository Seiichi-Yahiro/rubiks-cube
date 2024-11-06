import { add, zip } from 'lodash';

export type Vec4 = [number, number, number, number];

export const dot = (a: Vec4, b: Vec4) =>
    zip(a, b)
        .map(([a, b]) => (a ?? 0) * (b ?? 0))
        .reduce(add, 0.0);
