import P from 'parsimmon';
import {
    Command,
    double,
    letterToAxis,
    letterToRotation,
    letterToSlices,
    Loop,
    prime,
    RotationCommand,
    wide,
} from './RotationCommand';

export const makeNotationParser = (cubeDimension: number) =>
    P.createLanguage<{
        separator: string;

        lParenthesis: string;
        rParenthesis: string;

        wide: boolean;
        prime: boolean;
        double: boolean;

        number: number;
        numberInDimension: number;

        sliceableLetter: string;
        notSliceableLetter: string;
        letter: string;

        simpleCommand: Command;
        fullCommand: Command;
        loop: Loop;

        rotationCommands: RotationCommand[];
    }>({
        separator: (r) =>
            P.optWhitespace
                .then(P.alt(P.string(','), P.lookahead(r.lParenthesis.or(r.rParenthesis)), P.eof))
                .or(P.whitespace.atLeast(1))
                .result(''),

        lParenthesis: () => P.string('('),
        rParenthesis: () => P.string(')'),

        wide: () =>
            P.letter
                .chain((letter) => (['W', 'w'].includes(letter) ? P.succeed(true) : P.fail('w or W')))
                .fallback(false),
        prime: () =>
            P.string("'")
                .map((_) => true)
                .fallback(false),

        double: (r) =>
            r.number.chain((num) => (num === 2 ? P.succeed(true) : P.fail(`'2 not ${num}'`))).fallback(false),

        number: () => P.regexp(/\d+/).map(Number).desc('number'),
        numberInDimension: (r) =>
            r.number.chain((num) =>
                num > 0 && num <= cubeDimension
                    ? P.succeed(num)
                    : P.fail(`${num} is not in cube dimension ${cubeDimension}`)
            ),

        sliceableLetter: () => P.regexp(/[LRUDFB]/i),
        notSliceableLetter: () => P.regexp(/[MESXYZ]/i),
        letter: (r) => P.alt(r.sliceableLetter, r.notSliceableLetter),

        simpleCommand: (r) =>
            P.seq(r.letter, r.prime, r.double).map(([letter, hasPrime, hasDouble]) => ({
                axis: letterToAxis(letter),
                rotation: double(hasDouble)(prime(hasPrime)(letterToRotation(letter))),
                slices: letterToSlices(letter, cubeDimension),
            })),
        fullCommand: (r) =>
            P.seq(r.numberInDimension, r.sliceableLetter, r.wide, r.prime, r.double).map(
                ([slice, letter, hasWide, hasPrime, hasDouble]) => ({
                    axis: letterToAxis(letter),
                    rotation: double(hasDouble)(prime(hasPrime)(letterToRotation(letter))),
                    slices: wide(hasWide)(letter, [slice], cubeDimension),
                })
            ),
        loop: (r) =>
            P.seq(r.rotationCommands.wrap(r.lParenthesis, r.rParenthesis), r.number.fallback(1)).map(
                ([commands, iterations]) => ({
                    commands,
                    iterations,
                })
            ),
        rotationCommands: (r) =>
            P.optWhitespace.then(P.alt(r.simpleCommand, r.fullCommand, r.loop)).sepBy1(r.separator),
    });
