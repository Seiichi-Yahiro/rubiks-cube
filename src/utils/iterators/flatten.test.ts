import {
    createArrayIterator,
    createFlattenIterator,
} from 'src/utils/iterators';

describe('FlattenIterator', () => {
    it('should give the next element', () => {
        const arrayItr = createArrayIterator([
            createArrayIterator([1, 2]),
            createArrayIterator([3]),
        ]);
        const itr = createFlattenIterator(arrayItr);

        const result: (number | null)[] = [];

        for (let i = 0; i < 4; i++) {
            result.push(itr.next());
        }

        const expected: (number | null)[] = [1, 2, 3, null];

        expect(result).toStrictEqual(expected);
    });

    it('should give the previous element', () => {
        const arrayItr = createArrayIterator([
            createArrayIterator([1, 2]),
            createArrayIterator([3]),
        ]);
        const itr = createFlattenIterator(arrayItr);

        const result: (number | null)[] = [];

        result.push(itr.nextBack());

        for (let i = 0; i < 4; i++) {
            result.push(itr.next());
        }

        for (let i = 0; i < 4; i++) {
            result.push(itr.nextBack());
        }

        const expected: (number | null)[] = [
            null,
            1,
            2,
            3,
            null,
            3,
            2,
            1,
            null,
        ];

        expect(result).toStrictEqual(expected);
    });

    it('should reset to the start', () => {
        const arrayItr = createArrayIterator([
            createArrayIterator([1, 2]),
            createArrayIterator([3]),
        ]);
        const itr = createFlattenIterator(arrayItr);

        const result: (number | null)[] = [];

        itr.next();
        itr.next();
        itr.next();
        itr.toStart();

        for (let i = 0; i < 4; i++) {
            result.push(itr.next());
        }

        const expected: (number | null)[] = [1, 2, 3, null];

        expect(result).toStrictEqual(expected);
    });

    it('should reset to the end', () => {
        const arrayItr = createArrayIterator([
            createArrayIterator([1, 2]),
            createArrayIterator([3]),
        ]);
        const itr = createFlattenIterator(arrayItr);

        const result: (number | null)[] = [];

        itr.next();
        itr.toEnd();

        for (let i = 0; i < 4; i++) {
            result.push(itr.nextBack());
        }

        const expected: (number | null)[] = [3, 2, 1, null];

        expect(result).toStrictEqual(expected);
    });
});
