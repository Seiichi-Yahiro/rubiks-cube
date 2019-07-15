import D3 from './D3';
import { calculateCubePosition, createLayers, generateCubes, rotate } from './CubeUtils';
import Maybe from '../utils/Maybe';
import { keys, mapValues } from 'lodash';
import { Layers } from './CubeTypes';

describe('CubeUtils', () => {
    it('should calculate the cube position for a 3x3x3', () => {
        const numberOfCubes = 3;
        const sizeOfCube = 100;

        const cornerCube = new D3(1, 1, 1);
        const cornerCubeResult = calculateCubePosition(cornerCube, numberOfCubes, sizeOfCube);
        expect(cornerCubeResult.toVector()).toEqual([-100, -100, 100]);

        const edgeCube = new D3(3, 2, 3);
        const edgeCubeResult = calculateCubePosition(edgeCube, numberOfCubes, sizeOfCube);
        expect(edgeCubeResult.toVector()).toEqual([100, 0, -100]);
    });

    it('should calculate the cube position for a 4x4x4', () => {
        const numberOfCubes = 4;
        const sizeOfCube = 100;

        const cornerCube = new D3(1, 1, 1);
        const cornerCubeResult = calculateCubePosition(cornerCube, numberOfCubes, sizeOfCube);
        expect(cornerCubeResult.toVector()).toEqual([-150, -150, 150]);

        const middleCube = new D3(3, 2, 3);
        const middleCubeResult = calculateCubePosition(middleCube, numberOfCubes, sizeOfCube);
        expect(middleCubeResult.toVector()).toEqual([50, -50, -50]);
    });

    it('should generate the axes for a 3x3x3', () => {
        const numberOfCubes = 3;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

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

        expect(cubes.map(cube => cube.axes.toVector())).toEqual(cube3x3x3);
    });

    it('should rotate the x1 (L) axis of a 3x3x3', () => {
        const numberOfCubes = 3;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setX(1));

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

        expect(result.map(cube => cube.axes.toVector())).toEqual(cube3x3x3);
    });

    it("should rotate the x-1 (L') axis of a 3x3x3", () => {
        const numberOfCubes = 3;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setX(-1));

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

        expect(result.map(cube => cube.axes.toVector())).toEqual(cube3x3x3);
    });

    it("should rotate the x-2 (M') axis of a 3x3x3", () => {
        const numberOfCubes = 3;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setX(-2));

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

        expect(result.map(cube => cube.axes.toVector())).toEqual(cube3x3x3);
    });

    it('should rotate the y1 (U) axis of a 3x3x3', () => {
        const numberOfCubes = 3;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setY(1));

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

        expect(result.map(cube => cube.axes.toVector())).toEqual(cube3x3x3);
    });

    it("should rotate the y-1 (U') axis of a 3x3x3", () => {
        const numberOfCubes = 3;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setY(-1));

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

        expect(result.map(cube => cube.axes.toVector())).toEqual(cube3x3x3);
    });

    it('should rotate the y3 (D) axis of a 3x3x3', () => {
        const numberOfCubes = 3;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setY(3));

        // prettier-ignore
        const cube3x3x3 = [
            [1,1,1], [2,1,1], [3,1,1],
            [1,2,1], [2,2,1], [3,2,1],
            [1,3,3], [1,3,2], [1,3,1],

            [1,1,2], [2,1,2], [3,1,2],
            [1,2,2],          [3,2,2],
            [2,3,3], [2,3,2], [2,3,1],

            [1,1,3], [2,1,3], [3,1,3],
            [1,2,3], [2,2,3], [3,2,3],
            [3,3,3], [3,3,2], [3,3,1]
        ];

        expect(result.map(cube => cube.axes.toVector())).toEqual(cube3x3x3);
    });

    it("should rotate the z1 (F') axis of a 3x3x3", () => {
        const numberOfCubes = 3;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setZ(1));

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

        expect(result.map(cube => cube.axes.toVector())).toEqual(cube3x3x3);
    });

    it('should rotate the z-1 (F) axis of a 3x3x3', () => {
        const numberOfCubes = 3;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setZ(-1));

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

        expect(result.map(cube => cube.axes.toVector())).toEqual(cube3x3x3);
    });

    it("should rotate the z-3 (B') axis of a 3x3x3", () => {
        const numberOfCubes = 3;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setZ(-3));

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

        expect(result.map(cube => cube.axes.toVector())).toEqual(cube3x3x3);
    });

    it('should generate the axes for a 2x2x2', () => {
        const numberOfCubes = 2;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        // prettier-ignore
        const cube2x2x2 = [
            [1,1,1], [2,1,1],
            [1,2,1], [2,2,1],

            [1,1,2], [2,1,2],
            [1,2,2], [2,2,2]

        ];

        expect(cubes.map(cube => cube.axes.toVector())).toEqual(cube2x2x2);
    });

    it('should rotate the x1 (L) axis of a 2x2x2', () => {
        const numberOfCubes = 2;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setX(1));

        // prettier-ignore
        const cube2x2x2 = [
            [1,2,1], [2,1,1],
            [1,2,2], [2,2,1],

            [1,1,1], [2,1,2],
            [1,1,2], [2,2,2]
        ];

        expect(result.map(cube => cube.axes.toVector())).toEqual(cube2x2x2);
    });

    const compareFaceArrows = (expected: Layers<Maybe<[D3, D3]>>, result: Layers<Maybe<[D3, D3]>>, axes: D3) => {
        const convert = (v: Layers<Maybe<[D3, D3]>>, layer: string) =>
            (v[layer] as Maybe<[D3, D3]>).let(it => it.map(d3 => d3.toVector())).getOrElse([]);

        const multiplyExpectedArrows = (): Layers<Maybe<[D3, D3]>> =>
            mapValues(expected, v => v.let(d3s => d3s.map(d3 => d3.mul(axes)))) as Layers<Maybe<[D3, D3]>>;

        keys(expected).forEach(layer => {
            expect(convert(result, layer)).toEqual(convert(multiplyExpectedArrows(), layer));
        });
    };

    it('should rotate the face arrows on x1 (L)', () => {
        const numberOfCubes = 2;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setX(1));

        const expected = createLayers(Maybe.none<[D3, D3]>());
        expected.FRONT = Maybe.some([new D3().setX(-1), new D3().setZ(1)]);
        expected.UP = Maybe.some([new D3().setX(-1), new D3().setY(-1)]);
        expected.LEFT = Maybe.some([new D3().setY(-1), new D3().setZ(1)]);

        compareFaceArrows(expected, result[0].faceArrows, result[0].axes);
    });

    it("should rotate the face arrows on x-1 (L')", () => {
        const numberOfCubes = 2;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setX(-1));

        const expected = createLayers(Maybe.none<[D3, D3]>());
        expected.FRONT = Maybe.some([new D3().setX(-1), new D3().setZ(-1)]);
        expected.UP = Maybe.some([new D3().setX(-1), new D3().setY(1)]);
        expected.LEFT = Maybe.some([new D3().setY(1), new D3().setZ(-1)]);

        compareFaceArrows(expected, result[0].faceArrows, result[0].axes);
    });

    it('should rotate the face arrows on y1 (U)', () => {
        const numberOfCubes = 2;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setY(1));

        const expected = createLayers(Maybe.none<[D3, D3]>());
        expected.FRONT = Maybe.some([new D3().setZ(-1), new D3().setY(-1)]);
        expected.UP = Maybe.some([new D3().setZ(-1), new D3().setX(1)]);
        expected.LEFT = Maybe.some([new D3().setX(1), new D3().setY(-1)]);

        compareFaceArrows(expected, result[0].faceArrows, result[0].axes);
    });

    it("should rotate the face arrows on y-1 (U')", () => {
        const numberOfCubes = 2;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setY(-1));

        const expected = createLayers(Maybe.none<[D3, D3]>());
        expected.FRONT = Maybe.some([new D3().setZ(1), new D3().setY(-1)]);
        expected.UP = Maybe.some([new D3().setZ(1), new D3().setX(-1)]);
        expected.LEFT = Maybe.some([new D3().setX(-1), new D3().setY(-1)]);

        compareFaceArrows(expected, result[0].faceArrows, result[0].axes);
    });

    it("should rotate the face arrows on z1 (F')", () => {
        const numberOfCubes = 2;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setZ(1));

        const expected = createLayers(Maybe.none<[D3, D3]>());
        expected.FRONT = Maybe.some([new D3().setY(1), new D3().setX(-1)]);
        expected.UP = Maybe.some([new D3().setY(1), new D3().setZ(-1)]);
        expected.LEFT = Maybe.some([new D3().setZ(-1), new D3().setX(-1)]);

        compareFaceArrows(expected, result[0].faceArrows, result[0].axes);
    });

    it('should rotate the face arrows on z-1 (F)', () => {
        const numberOfCubes = 2;
        const sizeOfCube = 100;
        const cubes = generateCubes(numberOfCubes, sizeOfCube);

        const result = rotate(cubes, numberOfCubes, new D3().setZ(-1));

        const expected = createLayers(Maybe.none<[D3, D3]>());
        expected.FRONT = Maybe.some([new D3().setY(-1), new D3().setX(1)]);
        expected.UP = Maybe.some([new D3().setY(-1), new D3().setZ(-1)]);
        expected.LEFT = Maybe.some([new D3().setZ(-1), new D3().setX(1)]);

        compareFaceArrows(expected, result[0].faceArrows, result[0].axes);
    });
});
