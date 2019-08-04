import { CubeColors, Side } from './CubeTypes';
import D3 from './D3';

const sideToColorMap = {
    [Side.FRONT]: CubeColors.BLUE,
    [Side.BACK]: CubeColors.GREEN,
    [Side.UP]: CubeColors.YELLOW,
    [Side.DOWN]: CubeColors.WHITE,
    [Side.LEFT]: CubeColors.ORANGE,
    [Side.RIGHT]: CubeColors.RED
};

export const mapSideToColor = (side: Side) => sideToColorMap[side];

export const mapSideToSideCoordinates = (side: Side, numberOfCubes: number) => {
    const halfNumberOfCubes = Math.floor(numberOfCubes / 2);

    switch (side) {
        case Side.FRONT:
            return new D3().setZ(-halfNumberOfCubes);
        case Side.BACK:
            return new D3().setZ(halfNumberOfCubes);
        case Side.UP:
            return new D3().setY(-halfNumberOfCubes);
        case Side.DOWN:
            return new D3().setY(halfNumberOfCubes);
        case Side.LEFT:
            return new D3().setX(-halfNumberOfCubes);
        case Side.RIGHT:
            return new D3().setX(halfNumberOfCubes);
        default:
            throw new Error(`${side} that is not a valid side!`);
    }
};

export const mapSideCoordinatesToSide = (sideCoordinates: D3): Side => {
    const [x, y, z] = sideCoordinates.toVector().map(Math.sign);

    switch (true) {
        case x === 1:
            return Side.RIGHT;
        case x === -1:
            return Side.LEFT;
        case y === 1:
            return Side.DOWN;
        case y === -1:
            return Side.UP;
        case z === 1:
            return Side.BACK;
        case z === -1:
            return Side.FRONT;
        default:
            throw new Error(`${sideCoordinates.toString()} doesn't have a Side!`);
    }
};

export const mapSideToArrowAxes = (side: Side, axes: D3) => {
    const [x, y, z] = axes.toVector();

    switch (side) {
        case Side.FRONT:
            return [new D3().setX(-x), new D3().setY(-y)];
        case Side.BACK:
            return [new D3().setX(x), new D3().setY(-y)];
        case Side.UP:
            return [new D3().setX(-x), new D3().setZ(-z)];
        case Side.DOWN:
            return [new D3().setX(-x), new D3().setZ(z)];
        case Side.LEFT:
            return [new D3().setZ(-z), new D3().setY(-y)];
        case Side.RIGHT:
            return [new D3().setZ(z), new D3().setY(-y)];
        default:
            throw new Error(`${side} that is not a valid side!`);
    }
};
