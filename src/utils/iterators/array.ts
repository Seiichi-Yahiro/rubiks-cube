import iterators from 'src/utils/iterators';
import {
    type IteratorBase,
    type IteratorResult,
    IteratorType,
} from 'src/utils/iterators/types';

export interface ArrayIterator<Item> extends IteratorBase {
    iteratorType: IteratorType.Array;
    index: number;
    array: Item[];
}

const create = <Item>(array: Item[]): ArrayIterator<Item> => ({
    iteratorType: IteratorType.Array,
    index: 0,
    array,
});

const next = <Item>(self: ArrayIterator<Item>): IteratorResult<Item> => {
    if (self.index < self.array.length) {
        const value = self.array[self.index];
        self.index += 1;
        return iterators.resultValue(value);
    } else {
        return iterators.resultEnd;
    }
};

const nextBack = <Item>(self: ArrayIterator<Item>): IteratorResult<Item> => {
    if (self.index > 0) {
        self.index -= 1;
        const value = self.array[self.index];
        return iterators.resultValue(value);
    } else {
        return iterators.resultStart;
    }
};

const arrayIterator = { create, next, nextBack };

export default arrayIterator;
