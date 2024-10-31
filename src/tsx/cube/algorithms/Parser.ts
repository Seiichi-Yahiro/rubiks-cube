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
import { range, sample, sampleSize } from 'lodash';

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
                        P.eof,
                    ),
                ),
                P.whitespace.atLeast(1),
            ).result(''),

        comma: () => P.string(',').desc(','),

        lParenthesis: () => P.string('(').desc('('),
        rParenthesis: () => P.string(')').desc(')'),
        lBracket: () => P.string('[').desc('['),
        rBracket: () => P.string(']').desc(']'),

        wide: () => P.regexp(/[W]/i).result(true).fallback(false),

        prime: () => P.string("'").desc("'").result(true).fallback(false),

        double: () => P.string('2').desc('2').result(true).fallback(false),

        number: () => P.regexp(/\d+/).map(Number).desc('number'),
        numberInDimension: () =>
            P((input, i) => {
                const matched = input.substr(i).match(/^\d+/);
                if (matched) {
                    const numStr = matched[0];
                    const num = Number(numStr);
                    const isInRange = num > 0 && num <= cubeDimension;

                    if (isInRange) {
                        return P.makeSuccess(i + numStr.length, num);
                    }
                }

                return P.makeFailure(i, `1-${cubeDimension}`);
            }),

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
                        prime(hasPrime)(letterToRotation(letter)),
                    ),
                    slices: letterToSlices(letter, cubeDimension),
                }),
            ),
        slicedCommand: (r) =>
            P.seq(
                P.alt(
                    P.seq(
                        r.numberInDimension.map((num) => [num]),
                        r.sliceableLetter,
                        r.wide,
                    ),
                    P.seq(r.slices, r.sliceableLetter, P.succeed(false)),
                ),
                r.prime,
                r.double,
            ).map(([[slices, letter, hasWide], hasPrime, hasDouble]) => ({
                axis: letterToAxis(letter),
                rotation: double(hasDouble)(
                    prime(hasPrime)(letterToRotation(letter)),
                ),
                slices: wide(hasWide)(letter, slices, cubeDimension),
            })),
        loop: (r) =>
            P.seq(
                r.rotationCommands.wrap(r.lParenthesis, r.rParenthesis),
                r.number.fallback(1),
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

export const createRandomNotation = (cubeDimension: number): string => {
    const letters = 'LRUDFB'.split('');
    const loops = 20;

    let moves = '';
    let prevLetter = '';
    let prevIsPrime = false;

    const randomLetter = (slices: number[]) => {
        let letter = '';
        let isPrime = false;

        do {
            const slice = sample(slices) ?? '';
            letter = slice + sample(letters)!;
            isPrime = sample([true, false])!;
        } while (prevLetter === letter && prevIsPrime !== isPrime);

        prevLetter = letter;
        prevIsPrime = isPrime;
        moves += letter + (isPrime ? "' " : ' ');
    };

    if (cubeDimension > 3) {
        const slices = range(2, cubeDimension);
        const length = range(0, slices.length);
        range(loops).forEach(() =>
            randomLetter(sampleSize(slices, sample(length))),
        );
    } else {
        range(loops).forEach(() => randomLetter([]));
    }

    return moves;
};
