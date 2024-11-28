import { createArrayIterator } from 'src/utils/iterators';
import { describe, expect, it } from 'vitest';

describe('ArrayIterator', () => {
    it('should give the next element', () => {
        const itr = createArrayIterator([1, 2, 3]);

        const result: (number | null)[] = [];

        for (let i = 0; i < 4; i++) {
            result.push(itr.next());
        }

        const expected: (number | null)[] = [1, 2, 3, null];

        expect(result).toStrictEqual(expected);
    });

    it('should give the previous element', () => {
        const itr = createArrayIterator([1, 2, 3]);

        const result: (number | null)[] = [];

        result.push(itr.nextBack());
        result.push(itr.next());
        result.push(itr.next());
        result.push(itr.nextBack());
        result.push(itr.nextBack());
        result.push(itr.nextBack());

        const expected: (number | null)[] = [null, 1, 2, 2, 1, null];

        expect(result).toStrictEqual(expected);
    });

    it('should reset to the start', () => {
        const itr = createArrayIterator([1, 2, 3]);

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
        const itr = createArrayIterator([1, 2, 3]);

        const result: (number | null)[] = [];

        itr.toEnd();
        for (let i = 0; i < 4; i++) {
            result.push(itr.nextBack());
        }

        const expected: (number | null)[] = [3, 2, 1, null];

        expect(result).toStrictEqual(expected);
    });
});
