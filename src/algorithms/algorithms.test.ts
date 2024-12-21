import { makeNotationParser } from 'src/algorithms/parser';
import {
    ollCornersOne,
    ollCornersTwo,
    ollCornersZero,
    ollEdges,
} from 'src/algorithms/x3x3x3/cfop/oll';
import {
    pllEdgesOne,
    pllEdgesZero,
    pllOneCorner,
} from 'src/algorithms/x3x3x3/cfop/pll';
import parity from 'src/algorithms/x4x4x4/parity';
import { describe, expect, it } from 'vitest';

describe('Parse all algorithms', () => {
    describe('3x3x3', () => {
        const parser = makeNotationParser(3).rotationCommands;

        [
            ollEdges,
            ollCornersZero,
            ollCornersOne,
            ollCornersTwo,
            pllOneCorner,
            pllEdgesZero,
            pllEdgesOne,
        ].forEach((group) => {
            group.algorithms.forEach((algorithm) => {
                it(`should parse ${algorithm.name}`, () => {
                    const result = parser.parse(algorithm.notation);
                    expect(result.status).toBe(true);
                });
            });
        });
    });

    describe('4x4x4', () => {
        const parser = makeNotationParser(4).rotationCommands;

        [parity].forEach((group) => {
            group.algorithms.forEach((algorithm) => {
                it(`should parse ${algorithm.name}`, () => {
                    const result = parser.parse(algorithm.notation);
                    expect(result.status).toBe(true);
                });
            });
        });
    });
});
