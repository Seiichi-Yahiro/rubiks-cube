import { createArrayIterator, createRepeatIterator } from 'src/utils/iterators';

describe('RepeatIterator', () => {
    it('should give the next element', () => {
        const arrayItr = createArrayIterator([1, 2, 3]);
        const itr = createRepeatIterator(arrayItr, 2);

        const result: (number | null)[] = [];

        for (let i = 0; i < 7; i++) {
            result.push(itr.next());
        }

        const expected: (number | null)[] = [1, 2, 3, 1, 2, 3, null];

        expect(result).toStrictEqual(expected);
    });

    it('should give next with nested repeats', () => {
        const arrayItr = createArrayIterator([1, 2]);
        const innerRepeatItr = createRepeatIterator(arrayItr, 2);
        const itr = createRepeatIterator(innerRepeatItr, 2);

        const result: (number | null)[] = [];

        for (let i = 0; i < 9; i++) {
            result.push(itr.next());
        }

        const expected: (number | null)[] = [1, 2, 1, 2, 1, 2, 1, 2, null];

        expect(result).toStrictEqual(expected);
    });

    it('should give the previous element', () => {
        const arrayItr = createArrayIterator([1, 2, 3]);
        const itr = createRepeatIterator(arrayItr, 2);

        const result: (number | null)[] = [];

        result.push(itr.nextBack());
        result.push(itr.next());
        result.push(itr.next());
        result.push(itr.next());
        result.push(itr.next());
        result.push(itr.nextBack());
        result.push(itr.nextBack());
        result.push(itr.nextBack());
        result.push(itr.nextBack());
        result.push(itr.nextBack());

        const expected: (number | null)[] = [
            null,
            1,
            2,
            3,
            1,
            1,
            3,
            2,
            1,
            null,
        ];

        expect(result).toStrictEqual(expected);
    });

    it('should give previous with nested repeats', () => {
        const arrayItr = createArrayIterator([1, 2]);
        const innerRepeatItr = createRepeatIterator(arrayItr, 2);
        const itr = createRepeatIterator(innerRepeatItr, 2);

        const result: (number | null)[] = [];

        result.push(itr.nextBack());

        for (let i = 0; i < 9; i++) {
            result.push(itr.next());
        }

        for (let i = 0; i < 9; i++) {
            result.push(itr.nextBack());
        }

        const expected: (number | null)[] = [
            null,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            null,
            2,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            null,
        ];

        expect(result).toStrictEqual(expected);
    });

    it('should reset to the start', () => {
        const arrayItr = createArrayIterator([1, 2, 3]);
        const itr = createRepeatIterator(arrayItr, 2);

        const result: (number | null)[] = [];

        itr.next();
        itr.next();
        itr.next();
        itr.next();
        itr.toStart();

        for (let i = 0; i < 7; i++) {
            result.push(itr.next());
        }

        const expected: (number | null)[] = [1, 2, 3, 1, 2, 3, null];

        expect(result).toStrictEqual(expected);
    });

    it('should reset to the end', () => {
        const arrayItr = createArrayIterator([1, 2, 3]);
        const itr = createRepeatIterator(arrayItr, 2);

        const result: (number | null)[] = [];

        itr.next();
        itr.next();
        itr.next();
        itr.next();
        itr.toEnd();

        for (let i = 0; i < 7; i++) {
            result.push(itr.nextBack());
        }

        const expected: (number | null)[] = [3, 2, 1, 3, 2, 1, null];

        expect(result).toStrictEqual(expected);
    });
});
