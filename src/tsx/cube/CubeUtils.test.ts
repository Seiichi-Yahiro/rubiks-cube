import { applyRotationCommand, generateCubicles } from './CubeUtils';
import { makeNotationParser } from './algorithms/Parser';
import { SingleRotationCommand } from './algorithms/RotationCommand';

/**
 * TESTS SHOW THE NEW AXIS OF A CUBICLE
 * TESTS DON'T SHOW WHAT CUBICLE NOW MOVED TO THAT POSITION
 */
describe('CubeUtils', () => {
    describe('3x3x3', () => {
        const cubeDimension = 3;
        const cubicleSize = 100;

        const testAxis = (notation: string, cube: number[][]) => {
            const cubicles = generateCubicles(cubicleSize, 1.0, cubeDimension);

            const result = applyRotationCommand(
                cubicles,
                makeNotationParser(cubeDimension).rotationCommands.tryParse(
                    notation,
                )[0] as SingleRotationCommand,
                cubeDimension,
            );

            expect(result.map((cubicle) => cubicle.axis)).toEqual(cube);
        };

        it('should generate the axes for a 3x3x3', () => {
            const cubicles = generateCubicles(cubicleSize, 1.0, cubeDimension);

            // prettier-ignore
            const cube3x3x3 = [
                [1,1,1], [2,1,1], [3,1,1],
                [1,2,1], [2,2,1], [3,2,1],
                [1,3,1], [2,3,1], [3,3,1],

                [1,1,2], [2,1,2], [3,1,2],
                [1,2,2],          [3,2,2],
                [1,3,2], [2,3,2], [3,3,2],

                [1,1,3], [2,1,3], [3,1,3],
                [1,2,3], [2,2,3], [3,2,3],
                [1,3,3], [2,3,3], [3,3,3]
            ];

            expect(cubicles.map((cubicle) => cubicle.axis)).toEqual(cube3x3x3);
        });

        it('should rotate the (L) axis of a 3x3x3', () => {
            // prettier-ignore
            const cube3x3x3 = [
                [1,3,1], [2,1,1], [3,1,1],
                [1,3,2], [2,2,1], [3,2,1],
                [1,3,3], [2,3,1], [3,3,1],

                [1,2,1], [2,1,2], [3,1,2],
                [1,2,2],          [3,2,2],
                [1,2,3], [2,3,2], [3,3,2],

                [1,1,1], [2,1,3], [3,1,3],
                [1,1,2], [2,2,3], [3,2,3],
                [1,1,3], [2,3,3], [3,3,3]
            ];

            testAxis('L', cube3x3x3);
        });

        it("should rotate the (L') axis of a 3x3x3", () => {
            // prettier-ignore
            const cube3x3x3 = [
                [1,1,3], [2,1,1], [3,1,1],
                [1,1,2], [2,2,1], [3,2,1],
                [1,1,1], [2,3,1], [3,3,1],

                [1,2,3], [2,1,2], [3,1,2],
                [1,2,2],          [3,2,2],
                [1,2,1], [2,3,2], [3,3,2],

                [1,3,3], [2,1,3], [3,1,3],
                [1,3,2], [2,2,3], [3,2,3],
                [1,3,1], [2,3,3], [3,3,3]
            ];

            testAxis("L'", cube3x3x3);
        });

        it("should rotate the (M') axis of a 3x3x3", () => {
            // prettier-ignore
            const cube3x3x3 = [
                [1,1,1], [2,1,3], [3,1,1],
                [1,2,1], [2,1,2], [3,2,1],
                [1,3,1], [2,1,1], [3,3,1],

                [1,1,2], [2,2,3], [3,1,2],
                [1,2,2],          [3,2,2],
                [1,3,2], [2,2,1], [3,3,2],

                [1,1,3], [2,3,3], [3,1,3],
                [1,2,3], [2,3,2], [3,2,3],
                [1,3,3], [2,3,1], [3,3,3]
            ];

            testAxis("M'", cube3x3x3);
        });

        it('should rotate the (U) axis of a 3x3x3', () => {
            // prettier-ignore
            const cube3x3x3 = [
                [1,1,3], [1,1,2], [1,1,1],
                [1,2,1], [2,2,1], [3,2,1],
                [1,3,1], [2,3,1], [3,3,1],

                [2,1,3], [2,1,2], [2,1,1],
                [1,2,2],          [3,2,2],
                [1,3,2], [2,3,2], [3,3,2],

                [3,1,3], [3,1,2], [3,1,1],
                [1,2,3], [2,2,3], [3,2,3],
                [1,3,3], [2,3,3], [3,3,3]
            ];

            testAxis('U', cube3x3x3);
        });

        it("should rotate the (U') axis of a 3x3x3", () => {
            // prettier-ignore
            const cube3x3x3 = [
                [3,1,1], [3,1,2], [3,1,3],
                [1,2,1], [2,2,1], [3,2,1],
                [1,3,1], [2,3,1], [3,3,1],

                [2,1,1], [2,1,2], [2,1,3],
                [1,2,2],          [3,2,2],
                [1,3,2], [2,3,2], [3,3,2],

                [1,1,1], [1,1,2], [1,1,3],
                [1,2,3], [2,2,3], [3,2,3],
                [1,3,3], [2,3,3], [3,3,3]
            ];

            testAxis("U'", cube3x3x3);
        });

        it('should rotate the (D) axis of a 3x3x3', () => {
            // prettier-ignore
            const cube3x3x3 = [
                [1,1,1], [2,1,1], [3,1,1],
                [1,2,1], [2,2,1], [3,2,1],
                [3,3,1], [3,3,2], [3,3,3],

                [1,1,2], [2,1,2], [3,1,2],
                [1,2,2],          [3,2,2],
                [2,3,1], [2,3,2], [2,3,3],

                [1,1,3], [2,1,3], [3,1,3],
                [1,2,3], [2,2,3], [3,2,3],
                [1,3,1], [1,3,2], [1,3,3],
            ];

            testAxis('D', cube3x3x3);
        });

        it("should rotate the (F') axis of a 3x3x3", () => {
            // prettier-ignore
            const cube3x3x3 = [
                [1,3,1], [1,2,1], [1,1,1],
                [2,3,1], [2,2,1], [2,1,1],
                [3,3,1], [3,2,1], [3,1,1],

                [1,1,2], [2,1,2], [3,1,2],
                [1,2,2],          [3,2,2],
                [1,3,2], [2,3,2], [3,3,2],

                [1,1,3], [2,1,3], [3,1,3],
                [1,2,3], [2,2,3], [3,2,3],
                [1,3,3], [2,3,3], [3,3,3]
            ];

            testAxis("F'", cube3x3x3);
        });

        it('should rotate the (F) axis of a 3x3x3', () => {
            // prettier-ignore
            const cube3x3x3 = [
                [3,1,1], [3,2,1], [3,3,1],
                [2,1,1], [2,2,1], [2,3,1],
                [1,1,1], [1,2,1], [1,3,1],

                [1,1,2], [2,1,2], [3,1,2],
                [1,2,2],          [3,2,2],
                [1,3,2], [2,3,2], [3,3,2],

                [1,1,3], [2,1,3], [3,1,3],
                [1,2,3], [2,2,3], [3,2,3],
                [1,3,3], [2,3,3], [3,3,3]
            ];

            testAxis('F', cube3x3x3);
        });

        it("should rotate the z-3 (B') axis of a 3x3x3", () => {
            // prettier-ignore
            const cube3x3x3 = [
                [1,1,1], [2,1,1], [3,1,1],
                [1,2,1], [2,2,1], [3,2,1],
                [1,3,1], [2,3,1], [3,3,1],

                [1,1,2], [2,1,2], [3,1,2],
                [1,2,2],          [3,2,2],
                [1,3,2], [2,3,2], [3,3,2],

                [3,1,3], [3,2,3], [3,3,3],
                [2,1,3], [2,2,3], [2,3,3],
                [1,1,3], [1,2,3], [1,3,3],
            ];

            testAxis("B'", cube3x3x3);
        });
    });

    describe('2x2x2', () => {
        const cubeDimension = 2;
        const cubicleSize = 100;

        const testAxis = (notation: string, cube: number[][]) => {
            const cubicles = generateCubicles(cubicleSize, 1.0, cubeDimension);

            const result = applyRotationCommand(
                cubicles,
                makeNotationParser(cubeDimension).rotationCommands.tryParse(
                    notation,
                )[0] as SingleRotationCommand,
                cubeDimension,
            );

            expect(result.map((cubicle) => cubicle.axis)).toEqual(cube);
        };

        it('should generate the axes for a 2x2x2', () => {
            const cubicles = generateCubicles(cubicleSize, 1.0, cubeDimension);

            // prettier-ignore
            const cube2x2x2 = [
                [1,1,1], [2,1,1],
                [1,2,1], [2,2,1],

                [1,1,2], [2,1,2],
                [1,2,2], [2,2,2]

            ];

            expect(cubicles.map((cubicle) => cubicle.axis)).toEqual(cube2x2x2);
        });

        it('should rotate the (L) axis of a 2x2x2', () => {
            // prettier-ignore
            const cube2x2x2 = [
                [1,2,1], [2,1,1],
                [1,2,2], [2,2,1],

                [1,1,1], [2,1,2],
                [1,1,2], [2,2,2]
            ];

            testAxis('L', cube2x2x2);
        });

        it('should rotate multiple axes together', () => {
            // prettier-ignore
            const cube2x2x2 = [
                [1,2,1], [2,2,1],
                [1,2,2], [2,2,2],

                [1,1,1], [2,1,1],
                [1,1,2], [2,1,2]
            ];

            testAxis('[1,2]L', cube2x2x2);
        });
    });
});
