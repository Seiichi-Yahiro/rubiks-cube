import arrayIterator from 'src/utils/iterators/array';
import iterators from 'src/utils/iterators/index';
import repeatIterator from 'src/utils/iterators/repeat';

describe('iterators', () => {
    describe('collect', () => {
        it('should collect into array', () => {
            const itr = repeatIterator.create(
                arrayIterator.create([1, 2, 3]),
                2,
            );
            const result = iterators.collect(itr);
            const expected = [1, 2, 3, 1, 2, 3];

            expect(result).toStrictEqual(expected);
        });

        it('should collect into array backwards', () => {
            const itr = repeatIterator.create(
                arrayIterator.create([1, 2, 3]),
                2,
            );

            iterators.next(itr);
            iterators.next(itr);
            iterators.next(itr);
            iterators.next(itr);

            const result = iterators.collect(itr, true);
            const expected = [1, 3, 2, 1];

            expect(result).toStrictEqual(expected);
        });

        it('should collect empty array if nothing left', () => {
            const itr = repeatIterator.create(
                arrayIterator.create([1, 2, 3]),
                2,
            );

            for (let i = 0; i < 6; i++) {
                iterators.next(itr);
            }

            const result = iterators.collect(itr);

            expect(result).toHaveLength(0);
        });
    });
});
