import { makeNotationParser } from './Parser';

describe('Parser', () => {
    const parse = (notation: string) =>
        makeNotationParser(3).rotationCommands.tryParse(notation);

    describe('Capital sliceable letter', () => {
        it('should parse L', () => {
            expect(parse('L')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [1] },
            ]);
        });

        it('should parse R', () => {
            expect(parse('R')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [3] },
            ]);
        });

        it('should parse U', () => {
            expect(parse('U')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [1] },
            ]);
        });

        it('should parse D', () => {
            expect(parse('D')).toStrictEqual([
                { axis: 1, rotation: -90, slices: [3] },
            ]);
        });

        it('should parse F', () => {
            expect(parse('F')).toStrictEqual([
                { axis: 2, rotation: -90, slices: [1] },
            ]);
        });

        it('should parse B', () => {
            expect(parse('B')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [3] },
            ]);
        });
    });

    describe('Not capital sliceable letter', () => {
        it('should parse l', () => {
            expect(parse('l')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [1, 2] },
            ]);
        });

        it('should parse r', () => {
            expect(parse('r')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [2, 3] },
            ]);
        });

        it('should parse u', () => {
            expect(parse('u')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [1, 2] },
            ]);
        });

        it('should parse d', () => {
            expect(parse('d')).toStrictEqual([
                { axis: 1, rotation: -90, slices: [2, 3] },
            ]);
        });

        it('should parse f', () => {
            expect(parse('f')).toStrictEqual([
                { axis: 2, rotation: -90, slices: [1, 2] },
            ]);
        });

        it('should parse b', () => {
            expect(parse('b')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [2, 3] },
            ]);
        });
    });

    describe('Capital not sliceable letter', () => {
        it('should parse M', () => {
            expect(parse('M')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [2] },
            ]);
        });

        it('should parse E', () => {
            expect(parse('E')).toStrictEqual([
                { axis: 1, rotation: -90, slices: [2] },
            ]);
        });

        it('should parse S', () => {
            expect(parse('S')).toStrictEqual([
                { axis: 2, rotation: -90, slices: [2] },
            ]);
        });

        it('should parse X', () => {
            expect(parse('X')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse Y', () => {
            expect(parse('Y')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse Z', () => {
            expect(parse('Z')).toStrictEqual([
                { axis: 2, rotation: -90, slices: [1, 2, 3] },
            ]);
        });
    });

    describe('Not capital not sliceable letter', () => {
        it('should parse m', () => {
            expect(parse('m')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [2] },
            ]);
        });

        it('should parse e', () => {
            expect(parse('e')).toStrictEqual([
                { axis: 1, rotation: -90, slices: [2] },
            ]);
        });

        it('should parse s', () => {
            expect(parse('s')).toStrictEqual([
                { axis: 2, rotation: -90, slices: [2] },
            ]);
        });

        it('should parse x', () => {
            expect(parse('x')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse y', () => {
            expect(parse('y')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse z', () => {
            expect(parse('z')).toStrictEqual([
                { axis: 2, rotation: -90, slices: [1, 2, 3] },
            ]);
        });
    });

    describe('direction', () => {
        it("should parse L'", () => {
            expect(parse("L'")).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1] },
            ]);
        });

        it('should parse L2', () => {
            expect(parse('L2')).toStrictEqual([
                { axis: 0, rotation: 180, slices: [1] },
            ]);
        });

        it("should parse L'2", () => {
            expect(parse("L'2")).toStrictEqual([
                { axis: 0, rotation: -180, slices: [1] },
            ]);
        });

        it("should parse X'", () => {
            expect(parse("X'")).toStrictEqual([
                { axis: 0, rotation: 90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse X2', () => {
            expect(parse('X2')).toStrictEqual([
                { axis: 0, rotation: -180, slices: [1, 2, 3] },
            ]);
        });

        it("should parse X'2", () => {
            expect(parse("X'2")).toStrictEqual([
                { axis: 0, rotation: 180, slices: [1, 2, 3] },
            ]);
        });
    });

    describe('slice', () => {
        it('should parse 3L', () => {
            expect(parse('3L')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [3] },
            ]);
        });

        it('should parse 3Lw', () => {
            expect(parse('3Lw')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse 3LW', () => {
            expect(parse('3LW')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [1, 2, 3] },
            ]);
        });

        it("should parse 3L'", () => {
            expect(parse("3L'")).toStrictEqual([
                { axis: 0, rotation: -90, slices: [3] },
            ]);
        });

        it('should parse 3L2', () => {
            expect(parse('3L2')).toStrictEqual([
                { axis: 0, rotation: 180, slices: [3] },
            ]);
        });

        it("should parse 3L'2", () => {
            expect(parse("3L'2")).toStrictEqual([
                { axis: 0, rotation: -180, slices: [3] },
            ]);
        });

        it("should parse 3LW'", () => {
            expect(parse("3LW'")).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse 3LW2', () => {
            expect(parse('3LW2')).toStrictEqual([
                { axis: 0, rotation: 180, slices: [1, 2, 3] },
            ]);
        });

        it("should parse 3LW'2", () => {
            expect(parse("3LW'2")).toStrictEqual([
                { axis: 0, rotation: -180, slices: [1, 2, 3] },
            ]);
        });

        it('should not parse 3X (slice not slicable letter)', () => {
            expect(() => parse('3X')).toThrowError();
        });

        it('should not parse 4L (not in cube dimension)', () => {
            expect(() => parse('4L')).toThrowError();
        });
    });
});
