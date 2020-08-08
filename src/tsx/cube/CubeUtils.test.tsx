import { applyRotationCommand, generateCubicles } from './CubeUtils';
import { makeNotationParser } from './algorithms/Parser';
import { SingleRotationCommand } from './algorithms/RotationCommand';

/**
 * TESTS SHOW THE NEW AXIS OF A CUBICLE
 * TESTS DON'T SHOW WHAT CUBICLE NOW MOVED TO THAT POSITION
 * AXIS ROTATION IS THE INVERSE ROTATION OF THE CUBICLE ROTATION (X and Y but not Z)
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
                    notation
                )[0] as SingleRotationCommand,
                cubeDimension
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
                    notation
                )[0] as SingleRotationCommand,
                cubeDimension
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

    /*




    const compareFaceArrows = (
        expected: IFaces<Maybe<[D3, D3]>>,
        result: IFaces<Maybe<[D3, D3]>>,
        axes: D3
    ) => {
        const convert = (v: IFaces<Maybe<[D3, D3]>>, layer: string) =>
            (v[layer] as Maybe<[D3, D3]>)
                .map((it) => it.map((d3) => d3.toVector()))
                .unwrapOr([]);

        const multiplyExpectedArrows = (): IFaces<Maybe<[D3, D3]>> =>
            mapValues(expected, (v) =>
                v.map((d3s) => d3s.map((d3) => d3.mul(axes)))
            ) as IFaces<Maybe<[D3, D3]>>;

        keys(expected).forEach((layer) => {
            expect(convert(result, layer)).toEqual(
                convert(multiplyExpectedArrows(), layer)
            );
        });
    };

    it('should rotate the face arrows on x1 (L)', () => {
        const cubeDimension = 2;
        const cubicleSize = 100;
        const cubes = generateCubicles(cubeDimension, cubicleSize);

        const result = rotate(cubes, cubeDimension, [new D3().setX(1)]);

        const expected = createFaces(Maybe.none<[D3, D3]>());
        expected.FRONT = Maybe.some([new D3().setX(-1), new D3().setZ(1)]);
        expected.UP = Maybe.some([new D3().setX(-1), new D3().setY(-1)]);
        expected.LEFT = Maybe.some([new D3().setY(-1), new D3().setZ(1)]);

        compareFaceArrows(expected, result[0].faceArrows, result[0].axes);
    });

    it("should rotate the face arrows on x-1 (L')", () => {
        const cubeDimension = 2;
        const cubicleSize = 100;
        const cubes = generateCubicles(cubeDimension, cubicleSize);

        const result = rotate(cubes, cubeDimension, [new D3().setX(-1)]);

        const expected = createFaces(Maybe.none<[D3, D3]>());
        expected.FRONT = Maybe.some([new D3().setX(-1), new D3().setZ(-1)]);
        expected.UP = Maybe.some([new D3().setX(-1), new D3().setY(1)]);
        expected.LEFT = Maybe.some([new D3().setY(1), new D3().setZ(-1)]);

        compareFaceArrows(expected, result[0].faceArrows, result[0].axes);
    });

    it('should rotate the face arrows on y1 (U)', () => {
        const cubeDimension = 2;
        const cubicleSize = 100;
        const cubes = generateCubicles(cubeDimension, cubicleSize);

        const result = rotate(cubes, cubeDimension, [new D3().setY(1)]);

        const expected = createFaces(Maybe.none<[D3, D3]>());
        expected.FRONT = Maybe.some([new D3().setZ(-1), new D3().setY(-1)]);
        expected.UP = Maybe.some([new D3().setZ(-1), new D3().setX(1)]);
        expected.LEFT = Maybe.some([new D3().setX(1), new D3().setY(-1)]);

        compareFaceArrows(expected, result[0].faceArrows, result[0].axes);
    });

    it("should rotate the face arrows on y-1 (U')", () => {
        const cubeDimension = 2;
        const cubicleSize = 100;
        const cubes = generateCubicles(cubeDimension, cubicleSize);

        const result = rotate(cubes, cubeDimension, [new D3().setY(-1)]);

        const expected = createFaces(Maybe.none<[D3, D3]>());
        expected.FRONT = Maybe.some([new D3().setZ(1), new D3().setY(-1)]);
        expected.UP = Maybe.some([new D3().setZ(1), new D3().setX(-1)]);
        expected.LEFT = Maybe.some([new D3().setX(-1), new D3().setY(-1)]);

        compareFaceArrows(expected, result[0].faceArrows, result[0].axes);
    });

    it("should rotate the face arrows on z1 (F')", () => {
        const cubeDimension = 2;
        const cubicleSize = 100;
        const cubes = generateCubicles(cubeDimension, cubicleSize);

        const result = rotate(cubes, cubeDimension, [new D3().setZ(1)]);

        const expected = createFaces(Maybe.none<[D3, D3]>());
        expected.FRONT = Maybe.some([new D3().setY(1), new D3().setX(-1)]);
        expected.UP = Maybe.some([new D3().setY(1), new D3().setZ(-1)]);
        expected.LEFT = Maybe.some([new D3().setZ(-1), new D3().setX(-1)]);

        compareFaceArrows(expected, result[0].faceArrows, result[0].axes);
    });

    it('should rotate the face arrows on z-1 (F)', () => {
        const cubeDimension = 2;
        const cubicleSize = 100;
        const cubes = generateCubicles(cubeDimension, cubicleSize);

        const result = rotate(cubes, cubeDimension, [new D3().setZ(-1)]);

        const expected = createFaces(Maybe.none<[D3, D3]>());
        expected.FRONT = Maybe.some([new D3().setY(-1), new D3().setX(1)]);
        expected.UP = Maybe.some([new D3().setY(-1), new D3().setZ(-1)]);
        expected.LEFT = Maybe.some([new D3().setZ(-1), new D3().setX(1)]);

        compareFaceArrows(expected, result[0].faceArrows, result[0].axes);
    });

    it('should set animationRotation on the correct cubes', () => {
        const cubeDimension = 2;
        const cubicleSize = 100;
        const cubes = generateCubicles(cubeDimension, cubicleSize);

        const rotation = new D3().setX(1);
        const result = animateRotation(cubes, [rotation]);

        expect(
            result.every((cube) => {
                if (cube.axes.hasMatchingAxis(rotation)) {
                    return cube.rotationAnimation.isSome();
                } else {
                    return cube.rotationAnimation.equals(Maybe.none());
                }
            })
        );
    });

    it('should remove animationRotation on rotate', () => {
        const cubeDimension = 2;
        const cubicleSize = 100;
        const cubes = generateCubicles(cubeDimension, cubicleSize);

        const rotation = new D3().setX(1);
        let result = animateRotation(cubes, [rotation]);
        result = rotate(result, cubeDimension, [rotation]);

        expect(result.every((cube) => cube.rotationAnimation.isNone()));
    });

    it('should correctly calculate animationRotation', () => {
        const cubeDimension = 2;
        const cubicleSize = 100;
        const cubes = generateCubicles(cubeDimension, cubicleSize);

        let result = rotate(cubes, cubeDimension, [new D3().setX(1)]);
        result = animateRotation(result, [new D3().setZ(1)]);

        expect(result[0].rotationAnimation.unwrap().toVector()).toEqual([
            0,
            1,
            0,
        ]);
    });*/
});
