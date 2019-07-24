import Maybe from '../../utils/Maybe';
import D3, { D3Group } from '../D3';
import { range, sample } from 'lodash';

export const interpretNotation = (notation: string, numberOfCubes: number): IterableIterator<D3Group> => {
    const tokens = tokenizeNotation(notation);
    return new TokenInterpreter(tokens, numberOfCubes).iterator();
};

export const createRandomNotation = (numberOfCubes: number): string => {
    const letters = 'LRUDFB'.split('');
    const slices = range(2, numberOfCubes);
    const loops = 25;

    let moves = '';
    let prevLetter = '';
    let prevIsPrime = false;

    const randomLetter = (withSlice: boolean) => {
        let letter = '';
        let isPrime = false;

        do {
            const slice = withSlice ? sample(slices)! : '';
            letter = slice + sample(letters)!;
            isPrime = sample([true, false])!;
        } while (prevLetter === letter && prevIsPrime !== isPrime);

        prevLetter = letter;
        prevIsPrime = isPrime;
        moves += letter + (isPrime ? "' " : ' ');
    };

    if (numberOfCubes <= 3) {
        range(loops).forEach(() => randomLetter(false));
    } else {
        range(loops).forEach(() => randomLetter(sample([true, false])!));
    }

    return moves;
};

enum TokenType {
    UPPER_CASE_LETTER = 'L',
    LOWER_CASE_LETTER = 'l',
    WIDE = 'w',
    PRIME = 'p',
    NUMBER = 'd',
    OPENING_PARENTHESIS = '(',
    CLOSING_PARENTHESIS = ')',
    SEPARATOR = ','
}

interface IToken {
    type: TokenType;
    value: string;
}

const tokenizerRegex = new RegExp(/[LRUDFBMESXYZW'()]|\d+|[^LRUDFBMESXYZW'()\d]+/gi);
const letterRegex = new RegExp(/[LRUDFBMESXYZ]/i);

const tokenizeNotation = (notation: string): IToken[] =>
    Maybe.of(notation.match(tokenizerRegex))
        .getOrElse([])
        .map(match => {
            let tokenType;

            if (letterRegex.test(match)) {
                if (match === match.toUpperCase()) {
                    tokenType = TokenType.UPPER_CASE_LETTER;
                } else {
                    tokenType = TokenType.LOWER_CASE_LETTER;
                }
            } else if (match === "'") {
                tokenType = TokenType.PRIME;
            } else if (match === '(') {
                tokenType = TokenType.OPENING_PARENTHESIS;
            } else if (match === ')') {
                tokenType = TokenType.CLOSING_PARENTHESIS;
            } else if (match === 'w' || match === 'W') {
                tokenType = TokenType.WIDE;
            } else if (Number(match)) {
                tokenType = TokenType.NUMBER;
            } else {
                tokenType = TokenType.SEPARATOR;
            }

            return {
                value: match,
                type: tokenType
            };
        });

abstract class Interpreter<T> {
    protected index = 0;

    protected constructor(protected readonly list: Array<T>) {}

    protected isAtEnd = () => this.index >= this.list.length;
    protected next = (): Maybe<T> => (this.isAtEnd() ? Maybe.none() : Maybe.some(this.list[this.index++]));
    protected peek = (): Maybe<T> => (this.isAtEnd() ? Maybe.none() : Maybe.some(this.list[this.index]));
}

class TokenInterpreter extends Interpreter<IToken> {
    private static isEven = (num: number) => num % 2 === 0;

    constructor(readonly tokens: IToken[], private readonly numberOfCubes: number) {
        super(tokens);
    }

    *iterator(): IterableIterator<D3Group> {
        while (!this.isAtEnd()) {
            const { type, value } = this.next().get();

            let d3Groups: D3Group[] = [];

            if (type === TokenType.UPPER_CASE_LETTER) {
                d3Groups = this.handleUpperCaseLetter(value);
            } else if (type === TokenType.LOWER_CASE_LETTER) {
                d3Groups = this.handleLowerCaseLetter(value);
            } else if (type === TokenType.NUMBER) {
                d3Groups = this.handleSlice(Number(value));
            } else if (type === TokenType.OPENING_PARENTHESIS) {
                yield* this.handleLoop();
                continue;
            }

            for (const d3Group of d3Groups) {
                yield d3Group;
            }
        }
    }

    private handleUpperCaseLetter(letter: string): D3Group[] {
        // L(p|2)?
        const d3Group = this.mapCapitalLetterToD3Group(letter);
        return this.handlePrimeOrDouble(d3Group);
    }

    private handleLowerCaseLetter(letter: string): D3Group[] {
        // l(p|2)?
        const d3Group = this.mapLowerCaseLetterToD3Group(letter);
        return this.handlePrimeOrDouble(d3Group);
    }

    // dLw?(p|2)? except XYZMES
    private handleSlice = (slice: number): D3Group[] => {
        const isNumberValid = slice > 0 && slice <= this.numberOfCubes;
        return !isNumberValid
            ? []
            : this.matchType(TokenType.LOWER_CASE_LETTER, TokenType.UPPER_CASE_LETTER)
                  .let(letter => {
                      if (/[XYZMES]/i.test(letter.value)) {
                          return [];
                      }

                      const isWide = this.matchType(TokenType.WIDE).isSome();
                      const d3Group = this.mapSlicesLetterToD3Group(letter.value, slice, isWide);
                      return this.handlePrimeOrDouble(d3Group);
                  })
                  .getOrElse([]);
    };

    private *handleLoop(): IterableIterator<D3Group> {
        // (~)d?
        let numberOfParenthesis = 1;
        const remainingTokens = this.tokens.slice(this.index);

        for (let index = 0; index < remainingTokens.length; index++) {
            const { type } = remainingTokens[index];

            if (type === TokenType.OPENING_PARENTHESIS) {
                numberOfParenthesis++;
            } else if (type === TokenType.CLOSING_PARENTHESIS && --numberOfParenthesis === 0) {
                const enclosedTokens = this.tokens.slice(this.index, this.index + index);
                this.index = this.index + index + 1;

                const loops = this.matchType(TokenType.NUMBER)
                    .let(({ value }) => Number(value))
                    .getOrElse(1);

                for (const _ of range(loops)) {
                    yield* new TokenInterpreter(enclosedTokens, this.numberOfCubes).iterator();
                }

                break;
            }
        }
    }

    private handlePrimeOrDouble = (d3Group: D3Group): D3Group[] => {
        const onPrime = () => this.matchType(TokenType.PRIME).let(() => [d3Group.map(d3 => d3.invert())]);
        const onNumber = () =>
            this.matchType(TokenType.NUMBER).let(maybe2 => (maybe2.value === '2' ? [d3Group, d3Group] : [d3Group]));
        return Maybe.or(onPrime, onNumber).getOrElse([d3Group]);
    };

    private mapCapitalLetterToD3Group = (letter: string): D3Group => {
        const sliceRange = range(2, this.numberOfCubes);
        const cubeRange = range(1, this.numberOfCubes + 1);

        const letterMappings: {
            [k: string]: () => D3Group;
        } = {
            F: () => [new D3().setZ(-1)],
            B: () => [new D3().setZ(this.numberOfCubes)],
            U: () => [new D3().setY(1)],
            D: () => [new D3().setY(-this.numberOfCubes)],
            L: () => [new D3().setX(1)],
            R: () => [new D3().setX(-this.numberOfCubes)],
            M: () => sliceRange.map(n => new D3().setX(n)),
            E: () => sliceRange.map(n => new D3().setY(-n)),
            S: () => sliceRange.map(n => new D3().setZ(-n)),
            X: () => cubeRange.map(n => new D3().setX(-n)),
            Y: () => cubeRange.map(n => new D3().setY(n)),
            Z: () => cubeRange.map(n => new D3().setZ(-n))
        };

        return letterMappings[letter]();
    };

    private mapLowerCaseLetterToD3Group = (letter: string): D3Group => {
        const middlePiece = Math.ceil(this.numberOfCubes / 2);
        const isEven = TokenInterpreter.isEven(this.numberOfCubes);
        const sliceRange = range(2, this.numberOfCubes);
        const cubeRange = range(1, this.numberOfCubes + 1);

        const letterMappings: {
            [k: string]: () => D3Group;
        } = {
            f: () => [new D3().setZ(-1), new D3().setZ(-2)],
            b: () => [new D3().setZ(this.numberOfCubes - 1), new D3().setZ(this.numberOfCubes)],
            u: () => [new D3().setY(1), new D3().setY(2)],
            d: () => [new D3().setY(-(this.numberOfCubes - 1)), new D3().setY(-this.numberOfCubes)],
            l: () => [new D3().setX(1), new D3().setX(2)],
            r: () => [new D3().setX(-(this.numberOfCubes - 1)), new D3().setX(-this.numberOfCubes)],
            m: () => (isEven ? sliceRange.map(n => new D3().setX(n)) : [new D3().setX(middlePiece)]),
            e: () => (isEven ? sliceRange.map(n => new D3().setY(-n)) : [new D3().setY(-middlePiece)]),
            s: () => (isEven ? sliceRange.map(n => new D3().setZ(-n)) : [new D3().setZ(-middlePiece)]),
            x: () => cubeRange.map(n => new D3().setX(-n)),
            y: () => cubeRange.map(n => new D3().setY(n)),
            z: () => cubeRange.map(n => new D3().setZ(-n))
        };

        return letterMappings[letter]();
    };

    private mapSlicesLetterToD3Group = (letter: string, slice: number, wide: boolean) => {
        const backwardSlice = this.numberOfCubes - slice + 1;
        const forwardRange = range(1, slice + 1);
        const backwardRange = range(backwardSlice, this.numberOfCubes + 1);

        const letterMappings: {
            [k: string]: () => D3Group;
        } = {
            F: () => (wide ? forwardRange.map(n => new D3().setZ(-n)) : [new D3().setZ(-slice)]),
            B: () => (wide ? backwardRange.map(n => new D3().setZ(n)) : [new D3().setZ(backwardSlice)]),
            U: () => (wide ? forwardRange.map(n => new D3().setY(n)) : [new D3().setY(slice)]),
            D: () => (wide ? backwardRange.map(n => new D3().setY(-n)) : [new D3().setY(-backwardSlice)]),
            L: () => (wide ? forwardRange.map(n => new D3().setX(n)) : [new D3().setX(slice)]),
            R: () => (wide ? backwardRange.map(n => new D3().setX(-n)) : [new D3().setX(-backwardSlice)])
        };

        return letterMappings[letter.toUpperCase()]();
    };

    private matchType = (...tokenTypes: TokenType[]): Maybe<IToken> =>
        this.peek().let(token => (tokenTypes.some(tokenType => tokenType === token.type) ? this.next() : Maybe.none()));
}
