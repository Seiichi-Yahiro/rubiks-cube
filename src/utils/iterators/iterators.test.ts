import {
    collectArray,
    createArrayIterator,
    createRepeatIterator,
} from 'src/utils/iterators';
import { describe, expect, it } from 'vitest';

describe('iterators', () => {
    describe('collect', () => {
        it('should collect into array', () => {
            const itr = createRepeatIterator(createArrayIterator([1, 2, 3]), 2);
            const result = collectArray(itr);
            const expected = [1, 2, 3, 1, 2, 3];

            expect(result).toStrictEqual(expected);
        });

        it('should collect into array backwards', () => {
            const itr = createRepeatIterator(createArrayIterator([1, 2, 3]), 2);

            itr.next();
            itr.next();
            itr.next();
            itr.next();

            const result = collectArray(itr, true);
            const expected = [1, 3, 2, 1];

            expect(result).toStrictEqual(expected);
        });

        it('should collect empty array if nothing left', () => {
            const itr = createRepeatIterator(createArrayIterator([1, 2, 3]), 2);

            for (let i = 0; i < 6; i++) {
                itr.next();
            }

            const result = collectArray(itr);

            expect(result).toHaveLength(0);
        });
    });
});
