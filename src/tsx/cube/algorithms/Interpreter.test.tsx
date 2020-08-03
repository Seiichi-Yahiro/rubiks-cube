import { interpretNotation } from './Interpreter';

describe('Interpreter', () => {
    it('should create L move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('L', numberOfCubes)][0][0].toVector();
        expect(result).toEqual([1, 0, 0]);
    });

    it("should create L' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("L'", numberOfCubes)][0][0].toVector();
        expect(result).toEqual([-1, 0, 0]);
    });

    it('should create a l move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('l', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[1, 0, 0], [2, 0, 0]]);
    });

    it("should create a l' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("l'", numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[-1, 0, 0], [-2, 0, 0]]);
    });

    it('should create R move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('R', numberOfCubes)][0][0].toVector();
        expect(result).toEqual([-numberOfCubes, 0, 0]);
    });

    it("should create R' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("R'", numberOfCubes)][0][0].toVector();
        expect(result).toEqual([numberOfCubes, 0, 0]);
    });

    it('should create a r move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('r', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[-(numberOfCubes - 1), 0, 0], [-numberOfCubes, 0, 0]]);
    });

    it("should create a r' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("r'", numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[numberOfCubes - 1, 0, 0], [numberOfCubes, 0, 0]]);
    });

    it('should create U move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('U', numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, 1, 0]);
    });

    it("should create U' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("U'", numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, -1, 0]);
    });

    it('should create a u move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('u', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 1, 0], [0, 2, 0]]);
    });

    it("should create a u' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("u'", numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, -1, 0], [0, -2, 0]]);
    });

    it('should create D move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('D', numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, -numberOfCubes, 0]);
    });

    it("should create D' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("D'", numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, numberOfCubes, 0]);
    });

    it('should create a d move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('d', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, -(numberOfCubes - 1), 0], [0, -numberOfCubes, 0]]);
    });

    it("should create a d' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("d'", numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, numberOfCubes - 1, 0], [0, numberOfCubes, 0]]);
    });

    it('should create F move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('F', numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, 0, -1]);
    });

    it("should create F' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("F'", numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, 0, 1]);
    });

    it('should create a f move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('f', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 0, -1], [0, 0, -2]]);
    });

    it("should create a f' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("f'", numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 0, 1], [0, 0, 2]]);
    });

    it('should create B move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('B', numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, 0, numberOfCubes]);
    });

    it("should create B' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("B'", numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, 0, -numberOfCubes]);
    });

    it('should create a b move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('b', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 0, numberOfCubes - 1], [0, 0, numberOfCubes]]);
    });

    it("should create a b' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("b'", numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 0, -(numberOfCubes - 1)], [0, 0, -numberOfCubes]]);
    });

    it('should create a M move on a 2x2x2', () => {
        const numberOfCubes = 2;
        const result = [...interpretNotation('M', numberOfCubes)];
        expect(result).toEqual([[]]);
    });

    it('should create a m move on a 2x2x2', () => {
        const numberOfCubes = 2;
        const result = [...interpretNotation('m', numberOfCubes)];
        expect(result).toEqual([[]]);
    });

    it('should create a M move on 3x3x3', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('M', numberOfCubes)][0][0].toVector();
        expect(result).toEqual([2, 0, 0]);
    });

    it("should create a M' move on 3x3x3", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("M'", numberOfCubes)][0][0].toVector();
        expect(result).toEqual([-2, 0, 0]);
    });

    it('should create a m move on 3x3x3', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('m', numberOfCubes)][0][0].toVector();
        expect(result).toEqual([2, 0, 0]);
    });

    it("should create a m' move on 3x3x3", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("m'", numberOfCubes)][0][0].toVector();
        expect(result).toEqual([-2, 0, 0]);
    });

    it('should create a M move on a 4x4x4', () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation('M', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[2, 0, 0], [3, 0, 0]]);
    });

    it('should create a m move on a 4x4x4', () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation('m', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[2, 0, 0], [3, 0, 0]]);
    });

    it('should create a M move on a 5x5x5', () => {
        const numberOfCubes = 5;
        const result = [...interpretNotation('M', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[2, 0, 0], [3, 0, 0], [4, 0, 0]]);
    });

    it('should create a m move on a 5x5x5', () => {
        const numberOfCubes = 5;
        const result = [...interpretNotation('m', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[3, 0, 0]]);
    });

    it('should create a E move on a 2x2x2', () => {
        const numberOfCubes = 2;
        const result = [...interpretNotation('E', numberOfCubes)];
        expect(result).toEqual([[]]);
    });

    it('should create a e move on a 2x2x2', () => {
        const numberOfCubes = 2;
        const result = [...interpretNotation('e', numberOfCubes)];
        expect(result).toEqual([[]]);
    });

    it('should create a E move on 3x3x3', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('E', numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, -2, 0]);
    });

    it("should create a E' move on 3x3x3", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("E'", numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, 2, 0]);
    });

    it('should create a e move on 3x3x3', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('e', numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, -2, 0]);
    });

    it("should create a e' move on 3x3x3", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("e'", numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, 2, 0]);
    });

    it('should create a E move on a 4x4x4', () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation('E', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, -2, 0], [0, -3, 0]]);
    });

    it('should create a e move on a 4x4x4', () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation('e', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, -2, 0], [0, -3, 0]]);
    });

    it('should create a E move on a 5x5x5', () => {
        const numberOfCubes = 5;
        const result = [...interpretNotation('E', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, -2, 0], [0, -3, 0], [0, -4, 0]]);
    });

    it('should create a e move on a 5x5x5', () => {
        const numberOfCubes = 5;
        const result = [...interpretNotation('e', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, -3, 0]]);
    });

    it('should create a S move on a 2x2x2', () => {
        const numberOfCubes = 2;
        const result = [...interpretNotation('S', numberOfCubes)];
        expect(result).toEqual([[]]);
    });

    it('should create a s move on a 2x2x2', () => {
        const numberOfCubes = 2;
        const result = [...interpretNotation('s', numberOfCubes)];
        expect(result).toEqual([[]]);
    });

    it('should create a S move on 3x3x3', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('S', numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, 0, -2]);
    });

    it("should create a S' move on 3x3x3", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("S'", numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, 0, 2]);
    });

    it('should create a s move on 3x3x3', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('s', numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, 0, -2]);
    });

    it("should create a s' move on 3x3x3", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("s'", numberOfCubes)][0][0].toVector();
        expect(result).toEqual([0, 0, 2]);
    });

    it('should create a S move on a 4x4x4', () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation('S', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 0, -2], [0, 0, -3]]);
    });

    it('should create a s move on a 4x4x4', () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation('s', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 0, -2], [0, 0, -3]]);
    });

    it('should create a S move on a 5x5x5', () => {
        const numberOfCubes = 5;
        const result = [...interpretNotation('S', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 0, -2], [0, 0, -3], [0, 0, -4]]);
    });

    it('should create a s move on a 5x5x5', () => {
        const numberOfCubes = 5;
        const result = [...interpretNotation('s', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 0, -3]]);
    });

    it('should create a X move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('X', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[-1, 0, 0], [-2, 0, 0], [-3, 0, 0]]);
    });

    it("should create a X' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("X'", numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[1, 0, 0], [2, 0, 0], [3, 0, 0]]);
    });

    it('should create a x move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('x', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[-1, 0, 0], [-2, 0, 0], [-3, 0, 0]]);
    });

    it("should create a x' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("x'", numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[1, 0, 0], [2, 0, 0], [3, 0, 0]]);
    });

    it('should create a Y move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('Y', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 1, 0], [0, 2, 0], [0, 3, 0]]);
    });

    it("should create a Y' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("Y'", numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, -1, 0], [0, -2, 0], [0, -3, 0]]);
    });

    it('should create a y move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('y', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 1, 0], [0, 2, 0], [0, 3, 0]]);
    });

    it("should create a y' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("y'", numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, -1, 0], [0, -2, 0], [0, -3, 0]]);
    });

    it('should create a Z move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('Z', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 0, -1], [0, 0, -2], [0, 0, -3]]);
    });

    it("should create a Z' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("Z'", numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 0, 1], [0, 0, 2], [0, 0, 3]]);
    });

    it('should create a z move', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('z', numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 0, -1], [0, 0, -2], [0, 0, -3]]);
    });

    it("should create a z' move", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("z'", numberOfCubes)][0].map(d3 => d3.toVector());
        expect(result).toEqual([[0, 0, 1], [0, 0, 2], [0, 0, 3]]);
    });

    it("should create moves from F,R' ZM", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("F,R' ZM", numberOfCubes)].map(d3group =>
            d3group.map(d3 => d3.toVector())
        );
        expect(result).toEqual([
            [[0, 0, -1]],
            [[numberOfCubes, 0, 0]],
            [[0, 0, -1], [0, 0, -2], [0, 0, -3]],
            [[2, 0, 0]]
        ]);
    });

    it('should create a 180 move for L2', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('L2', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[1, 0, 0]], [[1, 0, 0]]]);
    });

    it('should create a 180 move for l2', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('l2', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[1, 0, 0], [2, 0, 0]], [[1, 0, 0], [2, 0, 0]]]);
    });

    it('should ignore other numbers than 2 after a letter', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('L3', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[1, 0, 0]]]);
    });

    it('should create a move for 2L', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2L', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[2, 0, 0]]]);
    });

    it('should create a move for 2Lw', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2Lw', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[1, 0, 0], [2, 0, 0]]]);
    });

    it("should create a move for 2L'", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("2L'", numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[-2, 0, 0]]]);
    });

    it("should create a move for 2Lw'", () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation("2Lw'", numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[-1, 0, 0], [-2, 0, 0]]]);
    });

    it('should create a move for 2L2', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2L2', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[2, 0, 0]], [[2, 0, 0]]]);
    });

    it('should create a move for 2Lw2', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2Lw2', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[1, 0, 0], [2, 0, 0]], [[1, 0, 0], [2, 0, 0]]]);
    });

    it('should create a move for 2LW', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2LW', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[1, 0, 0], [2, 0, 0]]]);
    });

    it('should create a move for 2lw', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2lw', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[1, 0, 0], [2, 0, 0]]]);
    });

    it('should create a move for 2lW', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2lW', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[1, 0, 0], [2, 0, 0]]]);
    });

    it('should create a move for 2R', () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation('2R', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[-3, 0, 0]]]);
    });

    it('should create a move for 2Rw', () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation('2Rw', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[-3, 0, 0], [-4, 0, 0]]]);
    });

    it("should create a move for 2R'", () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation("2R'", numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[3, 0, 0]]]);
    });

    it("should create a move for 2Rw'", () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation("2Rw'", numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[3, 0, 0], [4, 0, 0]]]);
    });

    it('should create a move for 2R2', () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation('2R2', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[-3, 0, 0]], [[-3, 0, 0]]]);
    });

    it('should create a move for 2Rw2', () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation('2Rw2', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[-3, 0, 0], [-4, 0, 0]], [[-3, 0, 0], [-4, 0, 0]]]);
    });

    it('should create a move for 2RW', () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation('2RW', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[-3, 0, 0], [-4, 0, 0]]]);
    });

    it('should create a move for 2rw', () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation('2rw', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[-3, 0, 0], [-4, 0, 0]]]);
    });

    it('should create a move for 2rW', () => {
        const numberOfCubes = 4;
        const result = [...interpretNotation('2rW', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[-3, 0, 0], [-4, 0, 0]]]);
    });

    it('should create a move for 2U', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2U', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[0, 2, 0]]]);
    });

    it('should create a move for 2Uw', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2Uw', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[0, 1, 0], [0, 2, 0]]]);
    });

    it('should create a move for 2D', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2D', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[0, -2, 0]]]);
    });

    it('should create a move for 2Dw', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2Dw', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[0, -2, 0], [0, -3, 0]]]);
    });

    it('should create a move for 2F', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2F', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[0, 0, -2]]]);
    });

    it('should create a move for 2Fw', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2Fw', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[0, 0, -1], [0, 0, -2]]]);
    });

    it('should create a move for 2B', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2B', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[0, 0, 2]]]);
    });

    it('should create a move for 2Bw', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2Bw', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[0, 0, 2], [0, 0, 3]]]);
    });

    it('should ignore slices less than numberOfCubes size', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('0L', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[1, 0, 0]]]);
    });

    it('should ignore slices bigger than numberOfCubes size', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('4L', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[1, 0, 0]]]);
    });

    it('should ignore letter after slice is X', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2X', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([]);
    });

    it('should ignore letter after slice is x', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2x', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([]);
    });

    it('should ignore letter after slice is Y', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2Y', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([]);
    });

    it('should ignore letter after slice is y', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2y', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([]);
    });

    it('should ignore letter after slice is Z', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2Z', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([]);
    });

    it('should ignore letter after slice is z', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2z', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([]);
    });

    it('should ignore letter after slice is M', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2M', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([]);
    });

    it('should ignore letter after slice is m', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2m', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([]);
    });

    it('should ignore letter after slice is E', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2E', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([]);
    });

    it('should ignore letter after slice is e', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2e', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([]);
    });

    it('should ignore letter after slice is S', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2S', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([]);
    });

    it('should ignore letter after slice is s', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('2s', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([]);
    });

    it('should loop the moves 3 times', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('(FR)3', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[0, 0, -1]], [[-3, 0, 0]], [[0, 0, -1]], [[-3, 0, 0]], [[0, 0, -1]], [[-3, 0, 0]]]);
    });

    it('should ignore parenthesis if no number follows times', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('(FR)', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[0, 0, -1]], [[-3, 0, 0]]]);
    });

    it('should handle nested loops', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('(F(R)2)2', numberOfCubes)].map(d3group =>
            d3group.map(d3 => d3.toVector())
        );
        expect(result).toEqual([[[0, 0, -1]], [[-3, 0, 0]], [[-3, 0, 0]], [[0, 0, -1]], [[-3, 0, 0]], [[-3, 0, 0]]]);
    });

    it('should ignore non matching parenthesis', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('(F(R2)2', numberOfCubes)].map(d3group =>
            d3group.map(d3 => d3.toVector())
        );
        expect(result).toEqual([[[0, 0, -1]], [[-3, 0, 0]], [[-3, 0, 0]], [[-3, 0, 0]], [[-3, 0, 0]]]);
    });

    it('should ignore non matching parenthesis2', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('FR)2', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[0, 0, -1]], [[-3, 0, 0]]]);
    });

    it('should handle separators correctly', () => {
        const numberOfCubes = 3;
        const result = [...interpretNotation('F 2F', numberOfCubes)].map(d3group => d3group.map(d3 => d3.toVector()));
        expect(result).toEqual([[[0, 0, -1]], [[0, 0, -2]]]);
    });
});
