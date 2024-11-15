import iterators from 'src/utils/iterators';
import arrayIterator from 'src/utils/iterators/array';
import flattenIterator from 'src/utils/iterators/flatten';
import { IteratorResult } from 'src/utils/iterators/types';

describe('FlattenIterator', () => {
    it('should give the next element', () => {
        const arrayItr = arrayIterator.create([
            arrayIterator.create([1, 2]),
            arrayIterator.create([3]),
        ]);
        const itr = flattenIterator.create(arrayItr);

        const result: IteratorResult<number>[] = [];

        for (let i = 0; i < 4; i++) {
            result.push(iterators.next(itr));
        }

        const expected: IteratorResult<number>[] = [
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultValue(3),
            iterators.resultEnd,
        ];

        expect(result).toEqual(expected);
    });

    it('should give the previous element', () => {
        const arrayItr = arrayIterator.create([
            arrayIterator.create([1, 2]),
            arrayIterator.create([3]),
        ]);
        const itr = flattenIterator.create(arrayItr);

        const result: IteratorResult<number>[] = [];

        result.push(iterators.nextBack(itr));

        for (let i = 0; i < 4; i++) {
            result.push(iterators.next(itr));
        }

        for (let i = 0; i < 4; i++) {
            result.push(iterators.nextBack(itr));
        }

        const expected: IteratorResult<number>[] = [
            iterators.resultStart,
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultValue(3),
            iterators.resultEnd,
            iterators.resultValue(3),
            iterators.resultValue(2),
            iterators.resultValue(1),
            iterators.resultStart,
        ];

        expect(result).toEqual(expected);
    });
});