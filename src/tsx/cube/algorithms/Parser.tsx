import P from 'parsimmon';
import {
    SingleRotationCommand,
    double,
    letterToAxis,
    letterToRotation,
    letterToSlices,
    LoopedRotationCommands,
    prime,
    RotationCommand,
    wide,
} from './RotationCommand';

/**
 * Creates a cube notation parser that knows about the used cubeDimension
 *
 * Possible syntax versions should be roughly equal to:
 *
 * 1: [LRUDFBlrudfbMESXYZmesxyz]'?2?
 * 2: \d+[LRUDFBlrudfb]w?'?2?
 * 3: \[\d+(,\d)*\][LRUDFBlrudfb]'?2?
 *
 * and groups and loops of:
 *
 * 4: \(((1|2|3|4)[ ,])*\)\d*
 *
 * @param cubeDimension
 */
export const makeNotationParser = (cubeDimension: number) =>
    P.createLanguage<{
        separator: string;

        comma: string;

        lParenthesis: string;
        rParenthesis: string;
        lBracket: string;
        rBracket: string;

        wide: boolean;
        prime: boolean;
        double: boolean;

        number: number;
        numberInDimension: number;

        slices: number[];

        sliceableLetter: string;
        notSliceableLetter: string;
        letter: string;

        simpleCommand: SingleRotationCommand;
        slicedCommand: SingleRotationCommand;
        loop: LoopedRotationCommands;

        rotationCommands: RotationCommand[];
    }>({
        separator: (r) =>
            P.alt(
                P.optWhitespace.then(
                    P.alt(
                        r.comma,
                        P.lookahead(r.lParenthesis.or(r.rParenthesis)),
                        P.eof
                    )
                ),
                P.whitespace.atLeast(1)
            ).result(''),

        comma: () => P.string(',').desc(','),

        lParenthesis: () => P.string('(').desc('('),
        rParenthesis: () => P.string(')').desc(')'),
        lBracket: () => P.string('[').desc('['),
        rBracket: () => P.string(']').desc(']'),

        wide: () =>
            P.letter
                .chain((letter) =>
                    ['W', 'w'].includes(letter)
                        ? P.succeed(true)
                        : P.fail('/[W]/i')
                )
                .fallback(false),
        prime: () =>
            P.string("'")
                .desc("'")
                .map((_) => true)
                .fallback(false),

        double: (r) =>
            r.number
                .chain((num) => (num === 2 ? P.succeed(true) : P.fail('2')))
                .fallback(false),

        number: () => P.regexp(/\d+/).map(Number).desc('number'),
        numberInDimension: (r) =>
            r.number.chain((num) =>
                num > 0 && num <= cubeDimension
                    ? P.succeed(num)
                    : P.fail(`1-${cubeDimension}`)
            ),

        slices: (r) =>
            r.numberInDimension
                .trim(P.optWhitespace)
                .sepBy1(r.comma)
                .map((nums) => nums.sort())
                .wrap(r.lBracket, r.rBracket),

        sliceableLetter: () => P.regexp(/[LRUDFB]/i),
        notSliceableLetter: () => P.regexp(/[MESXYZ]/i),
        letter: (r) => P.alt(r.sliceableLetter, r.notSliceableLetter),

        simpleCommand: (r) =>
            P.seq(r.letter, r.prime, r.double).map(
                ([letter, hasPrime, hasDouble]) => ({
                    axis: letterToAxis(letter),
                    rotation: double(hasDouble)(
                        prime(hasPrime)(letterToRotation(letter))
                    ),
                    slices: letterToSlices(letter, cubeDimension),
                })
            ),
        slicedCommand: (r) =>
            P.seq(
                P.alt(
                    P.seq(
                        r.numberInDimension.map((num) => [num]),
                        r.sliceableLetter,
                        r.wide
                    ),
                    P.seq(r.slices, r.sliceableLetter, P.succeed(false))
                ),
                r.prime,
                r.double
            ).map(([[slices, letter, hasWide], hasPrime, hasDouble]) => ({
                axis: letterToAxis(letter),
                rotation: double(hasDouble)(
                    prime(hasPrime)(letterToRotation(letter))
                ),
                slices: wide(hasWide)(letter, slices, cubeDimension),
            })),
        loop: (r) =>
            P.seq(
                r.rotationCommands.wrap(r.lParenthesis, r.rParenthesis),
                r.number.fallback(1)
            ).map(([commands, iterations]) => ({
                commands,
                iterations,
            })),
        rotationCommands: (r) =>
            P.optWhitespace
                .then(P.alt(r.simpleCommand, r.slicedCommand, r.loop))
                .skip(r.separator)
                .many(),
    });
