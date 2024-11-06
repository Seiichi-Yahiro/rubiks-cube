import { makeNotationParser } from 'src/algorithms/parser';

describe('Parser', () => {
    const parse = (notation: string) =>
        makeNotationParser(3).rotationCommands.tryParse(notation);

    describe('Capital sliceable letter', () => {
        it('should parse L', () => {
            expect(parse('L')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1] },
            ]);
        });

        it('should parse R', () => {
            expect(parse('R')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [3] },
            ]);
        });

        it('should parse U', () => {
            expect(parse('U')).toStrictEqual([
                { axis: 1, rotation: -90, slices: [1] },
            ]);
        });

        it('should parse D', () => {
            expect(parse('D')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [3] },
            ]);
        });

        it('should parse F', () => {
            expect(parse('F')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [1] },
            ]);
        });

        it('should parse B', () => {
            expect(parse('B')).toStrictEqual([
                { axis: 2, rotation: -90, slices: [3] },
            ]);
        });
    });

    describe('Not capital sliceable letter', () => {
        it('should parse l', () => {
            expect(parse('l')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1, 2] },
            ]);
        });

        it('should parse r', () => {
            expect(parse('r')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [2, 3] },
            ]);
        });

        it('should parse u', () => {
            expect(parse('u')).toStrictEqual([
                { axis: 1, rotation: -90, slices: [1, 2] },
            ]);
        });

        it('should parse d', () => {
            expect(parse('d')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [2, 3] },
            ]);
        });

        it('should parse f', () => {
            expect(parse('f')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [1, 2] },
            ]);
        });

        it('should parse b', () => {
            expect(parse('b')).toStrictEqual([
                { axis: 2, rotation: -90, slices: [2, 3] },
            ]);
        });
    });

    describe('Capital not sliceable letter', () => {
        it('should parse M', () => {
            expect(parse('M')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [2] },
            ]);
        });

        it('should parse E', () => {
            expect(parse('E')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [2] },
            ]);
        });

        it('should parse S', () => {
            expect(parse('S')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [2] },
            ]);
        });

        it('should parse X', () => {
            expect(parse('X')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse Y', () => {
            expect(parse('Y')).toStrictEqual([
                { axis: 1, rotation: -90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse Z', () => {
            expect(parse('Z')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [1, 2, 3] },
            ]);
        });
    });

    describe('Not capital not sliceable letter', () => {
        it('should parse m', () => {
            expect(parse('m')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [2] },
            ]);
        });

        it('should parse e', () => {
            expect(parse('e')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [2] },
            ]);
        });

        it('should parse s', () => {
            expect(parse('s')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [2] },
            ]);
        });

        it('should parse x', () => {
            expect(parse('x')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse y', () => {
            expect(parse('y')).toStrictEqual([
                { axis: 1, rotation: -90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse z', () => {
            expect(parse('z')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [1, 2, 3] },
            ]);
        });
    });

    describe('direction', () => {
        it("should parse L'", () => {
            expect(parse("L'")).toStrictEqual([
                { axis: 0, rotation: 90, slices: [1] },
            ]);
        });

        it('should parse L2', () => {
            expect(parse('L2')).toStrictEqual([
                { axis: 0, rotation: -180, slices: [1] },
            ]);
        });

        it("should parse L'2", () => {
            expect(parse("L'2")).toStrictEqual([
                { axis: 0, rotation: 180, slices: [1] },
            ]);
        });

        it("should parse X'", () => {
            expect(parse("X'")).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse X2', () => {
            expect(parse('X2')).toStrictEqual([
                { axis: 0, rotation: 180, slices: [1, 2, 3] },
            ]);
        });

        it("should parse X'2", () => {
            expect(parse("X'2")).toStrictEqual([
                { axis: 0, rotation: -180, slices: [1, 2, 3] },
            ]);
        });
    });

    describe('slice', () => {
        it('should parse 3L', () => {
            expect(parse('3L')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [3] },
            ]);
        });

        it('should parse 3Lw', () => {
            expect(parse('3Lw')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse 2Bw', () => {
            expect(parse('2Bw')).toStrictEqual([
                { axis: 2, rotation: -90, slices: [2, 3] },
            ]);
        });

        it('should parse 2Dw', () => {
            expect(parse('2Dw')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [2, 3] },
            ]);
        });

        it('should parse 2Rw', () => {
            expect(parse('2Rw')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [2, 3] },
            ]);
        });

        it('should parse 3LW', () => {
            expect(parse('3LW')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1, 2, 3] },
            ]);
        });

        it("should parse 3L'", () => {
            expect(parse("3L'")).toStrictEqual([
                { axis: 0, rotation: 90, slices: [3] },
            ]);
        });

        it('should parse 3L2', () => {
            expect(parse('3L2')).toStrictEqual([
                { axis: 0, rotation: -180, slices: [3] },
            ]);
        });

        it("should parse 3L'2", () => {
            expect(parse("3L'2")).toStrictEqual([
                { axis: 0, rotation: 180, slices: [3] },
            ]);
        });

        it("should parse 3LW'", () => {
            expect(parse("3LW'")).toStrictEqual([
                { axis: 0, rotation: 90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse 3LW2', () => {
            expect(parse('3LW2')).toStrictEqual([
                { axis: 0, rotation: -180, slices: [1, 2, 3] },
            ]);
        });

        it("should parse 3LW'2", () => {
            expect(parse("3LW'2")).toStrictEqual([
                { axis: 0, rotation: 180, slices: [1, 2, 3] },
            ]);
        });

        it('should not parse 3X (slice not slicable letter)', () => {
            expect(() => parse('3X')).toThrowError();
        });

        it('should not parse 4L (not in cube dimension)', () => {
            expect(() => parse('4L')).toThrowError();
        });

        it('should not parse 0L (not in cube dimension)', () => {
            expect(() => parse('0L')).toThrowError();
        });

        it('should not parse -4L (not in cube dimension)', () => {
            expect(() => parse('-4L')).toThrowError();
        });
    });

    describe('multiple slices', () => {
        it('should parse [2]L', () => {
            expect(parse('[2]L')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [2] },
            ]);
        });

        it('should parse [2,3]L', () => {
            expect(parse('[2,3]L')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [2, 3] },
            ]);
        });

        it('should parse [1,3]L', () => {
            expect(parse('[1,3]L')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1, 3] },
            ]);
        });

        it('should parse [1,3,2]L', () => {
            expect(parse('[1,3,2]L')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse [   1   ,   3   ,2   ]L', () => {
            expect(parse('[   1   ,   3   ,2   ]L')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1, 2, 3] },
            ]);
        });

        it('should parse [1,4]L (not in cube dimension)', () => {
            expect(() => parse('[1,4]L')).toThrowError();
        });

        it('should parse [0]L (not in cube dimension)', () => {
            expect(() => parse('[0]L')).toThrowError();
        });

        it('should parse [1,-4]L (not in cube dimension)', () => {
            expect(() => parse('[1,-4]L')).toThrowError();
        });

        it('should parse [2,3]Lw (wide not possible on multi slice)', () => {
            expect(() => parse('[2,3]Lw')).toThrowError();
        });
    });

    describe('group and loop', () => {
        it('should parse (L)', () => {
            expect(parse('(L)')).toStrictEqual([
                {
                    commands: [{ axis: 0, rotation: -90, slices: [1] }],
                    iterations: 1,
                },
            ]);
        });

        it('should parse (L)5', () => {
            expect(parse('(L)5')).toStrictEqual([
                {
                    commands: [{ axis: 0, rotation: -90, slices: [1] }],
                    iterations: 5,
                },
            ]);
        });

        it('should parse (L)0', () => {
            expect(parse('(L)0')).toStrictEqual([
                {
                    commands: [{ axis: 0, rotation: -90, slices: [1] }],
                    iterations: 0,
                },
            ]);
        });

        it('should not parse (L)-5', () => {
            expect(() => parse('(L)-5')).toThrowError();
        });

        it('should parse ()', () => {
            expect(parse('()')).toStrictEqual([
                { commands: [], iterations: 1 },
            ]);
        });

        it('should parse (((L)4))5', () => {
            expect(parse('(((L)4))5')).toStrictEqual([
                {
                    commands: [
                        {
                            commands: [
                                {
                                    commands: [
                                        { axis: 0, rotation: -90, slices: [1] },
                                    ],
                                    iterations: 4,
                                },
                            ],
                            iterations: 1,
                        },
                    ],
                    iterations: 5,
                },
            ]);
        });
    });

    describe('separators', () => {
        it('should parse L R2 2F', () => {
            expect(parse('L R2 2F')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1] },
                { axis: 0, rotation: 180, slices: [3] },
                { axis: 2, rotation: 90, slices: [2] },
            ]);
        });

        it('should not parse LR', () => {
            expect(() => parse('LR')).toThrowError();
        });

        it('should not parse L2R', () => {
            expect(() => parse('L2R')).toThrowError();
        });

        it('should not parse L3R', () => {
            expect(() => parse('L3R')).toThrowError();
        });

        it('should parse L,R2  , 2F', () => {
            expect(parse('L,R2  , 2F')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1] },
                { axis: 0, rotation: 180, slices: [3] },
                { axis: 2, rotation: 90, slices: [2] },
            ]);
        });

        it('should parse L (R2 (2F)2)3', () => {
            expect(parse('L (R2 (2F)2)3')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1] },
                {
                    commands: [
                        { axis: 0, rotation: 180, slices: [3] },
                        {
                            commands: [{ axis: 2, rotation: 90, slices: [2] }],
                            iterations: 2,
                        },
                    ],
                    iterations: 3,
                },
            ]);
        });

        it('should not parse L (R2 Ä (2F)2)3', () => {
            expect(() => parse('L (R2 Ä (2F)2)3')).toThrowError();
        });

        it('should parse    L( R2    (2F)2   )3    ', () => {
            expect(parse('   L( R2    (2F)2   )3    ')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1] },
                {
                    commands: [
                        { axis: 0, rotation: 180, slices: [3] },
                        {
                            commands: [{ axis: 2, rotation: 90, slices: [2] }],
                            iterations: 2,
                        },
                    ],
                    iterations: 3,
                },
            ]);
        });
    });

    describe('2x2x2', () => {
        const parse = (notation: string) =>
            makeNotationParser(2).rotationCommands.tryParse(notation);

        it('should parse M', () => {
            expect(parse('M')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1, 2] },
            ]);
        });

        it('should parse E', () => {
            expect(parse('E')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [1, 2] },
            ]);
        });

        it('should parse S', () => {
            expect(parse('S')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [1, 2] },
            ]);
        });

        it('should parse m', () => {
            expect(parse('m')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1, 2] },
            ]);
        });

        it('should parse e', () => {
            expect(parse('e')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [1, 2] },
            ]);
        });

        it('should parse s', () => {
            expect(parse('s')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [1, 2] },
            ]);
        });

        it('should parse f', () => {
            expect(parse('f')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [1] },
            ]);
        });

        it('should parse u', () => {
            expect(parse('u')).toStrictEqual([
                { axis: 1, rotation: -90, slices: [1] },
            ]);
        });

        it('should parse l', () => {
            expect(parse('l')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [1] },
            ]);
        });

        it('should parse b', () => {
            expect(parse('b')).toStrictEqual([
                { axis: 2, rotation: -90, slices: [2] },
            ]);
        });

        it('should parse d', () => {
            expect(parse('d')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [2] },
            ]);
        });

        it('should parse r', () => {
            expect(parse('r')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [2] },
            ]);
        });
    });

    describe('4x4x4', () => {
        const parse = (notation: string) =>
            makeNotationParser(4).rotationCommands.tryParse(notation);

        it('should parse M', () => {
            expect(parse('M')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [2, 3] },
            ]);
        });

        it('should parse E', () => {
            expect(parse('E')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [2, 3] },
            ]);
        });

        it('should parse S', () => {
            expect(parse('S')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [2, 3] },
            ]);
        });

        it('should parse m', () => {
            expect(parse('m')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [2, 3] },
            ]);
        });

        it('should parse e', () => {
            expect(parse('e')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [2, 3] },
            ]);
        });

        it('should parse s', () => {
            expect(parse('s')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [2, 3] },
            ]);
        });

        it('should parse f', () => {
            expect(parse('f')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [2] },
            ]);
        });

        it('should parse u', () => {
            expect(parse('u')).toStrictEqual([
                { axis: 1, rotation: -90, slices: [2] },
            ]);
        });

        it('should parse l', () => {
            expect(parse('l')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [2] },
            ]);
        });

        it('should parse b', () => {
            expect(parse('b')).toStrictEqual([
                { axis: 2, rotation: -90, slices: [3] },
            ]);
        });

        it('should parse d', () => {
            expect(parse('d')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [3] },
            ]);
        });

        it('should parse r', () => {
            expect(parse('r')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [3] },
            ]);
        });
    });

    describe('5x5x5', () => {
        const parse = (notation: string) =>
            makeNotationParser(5).rotationCommands.tryParse(notation);

        it('should parse M', () => {
            expect(parse('M')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [3] },
            ]);
        });

        it('should parse E', () => {
            expect(parse('E')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [3] },
            ]);
        });

        it('should parse S', () => {
            expect(parse('S')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [3] },
            ]);
        });

        it('should parse m', () => {
            expect(parse('m')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [2, 3, 4] },
            ]);
        });

        it('should parse e', () => {
            expect(parse('e')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [2, 3, 4] },
            ]);
        });

        it('should parse s', () => {
            expect(parse('s')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [2, 3, 4] },
            ]);
        });

        it('should parse f', () => {
            expect(parse('f')).toStrictEqual([
                { axis: 2, rotation: 90, slices: [2] },
            ]);
        });

        it('should parse u', () => {
            expect(parse('u')).toStrictEqual([
                { axis: 1, rotation: -90, slices: [2] },
            ]);
        });

        it('should parse l', () => {
            expect(parse('l')).toStrictEqual([
                { axis: 0, rotation: -90, slices: [2] },
            ]);
        });

        it('should parse b', () => {
            expect(parse('b')).toStrictEqual([
                { axis: 2, rotation: -90, slices: [4] },
            ]);
        });

        it('should parse d', () => {
            expect(parse('d')).toStrictEqual([
                { axis: 1, rotation: 90, slices: [4] },
            ]);
        });

        it('should parse r', () => {
            expect(parse('r')).toStrictEqual([
                { axis: 0, rotation: 90, slices: [4] },
            ]);
        });
    });
});
