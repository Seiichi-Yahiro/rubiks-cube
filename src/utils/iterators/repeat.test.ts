import iterators from 'src/utils/iterators';
import arrayIterator from 'src/utils/iterators/array';
import repeatIterator from 'src/utils/iterators/repeat';
import { IteratorResult } from 'src/utils/iterators/types';

describe('RepeatIterator', () => {
    it('should give the next element', () => {
        const arrayItr = arrayIterator.create([1, 2, 3]);
        const itr = repeatIterator.create(arrayItr, 2);

        const result: IteratorResult<number>[] = [];

        for (let i = 0; i < 7; i++) {
            result.push(iterators.next(itr));
        }

        const expected: IteratorResult<number>[] = [
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultValue(3),
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultValue(3),
            iterators.resultEnd,
        ];

        expect(result).toEqual(expected);
    });

    it('should give next with nested repeats', () => {
        const arrayItr = arrayIterator.create([1, 2]);
        const innerRepeatItr = repeatIterator.create(arrayItr, 2);
        const itr = repeatIterator.create(innerRepeatItr, 2);

        const result: IteratorResult<number>[] = [];

        for (let i = 0; i < 9; i++) {
            result.push(iterators.next(itr));
        }

        const expected: IteratorResult<number>[] = [
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultEnd,
        ];

        expect(result).toEqual(expected);
    });

    it('should give the previous element', () => {
        const arrayItr = arrayIterator.create([1, 2, 3]);
        const itr = repeatIterator.create(arrayItr, 2);

        const result: IteratorResult<number>[] = [];

        result.push(iterators.nextBack(itr));
        result.push(iterators.next(itr));
        result.push(iterators.next(itr));
        result.push(iterators.next(itr));
        result.push(iterators.next(itr));
        result.push(iterators.nextBack(itr));
        result.push(iterators.nextBack(itr));
        result.push(iterators.nextBack(itr));
        result.push(iterators.nextBack(itr));
        result.push(iterators.nextBack(itr));

        const expected: IteratorResult<number>[] = [
            iterators.resultStart,
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultValue(3),
            iterators.resultValue(1),
            iterators.resultValue(1),
            iterators.resultValue(3),
            iterators.resultValue(2),
            iterators.resultValue(1),
            iterators.resultStart,
        ];

        expect(result).toEqual(expected);
    });

    it('should give previous with nested repeats', () => {
        const arrayItr = arrayIterator.create([1, 2]);
        const innerRepeatItr = repeatIterator.create(arrayItr, 2);
        const itr = repeatIterator.create(innerRepeatItr, 2);

        const result: IteratorResult<number>[] = [];

        result.push(iterators.nextBack(itr));

        for (let i = 0; i < 9; i++) {
            result.push(iterators.next(itr));
        }

        for (let i = 0; i < 9; i++) {
            result.push(iterators.nextBack(itr));
        }

        const expected: IteratorResult<number>[] = [
            iterators.resultStart,
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultEnd,
            iterators.resultValue(2),
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultValue(1),
            iterators.resultValue(2),
            iterators.resultValue(1),
            iterators.resultStart,
        ];

        expect(result).toEqual(expected);
    });
});
