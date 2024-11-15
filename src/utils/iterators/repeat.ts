import iterators from 'src/utils/iterators';
import {
    type Iterator,
    type IteratorBase,
    type IteratorResult,
    IteratorResultType,
    IteratorType,
} from 'src/utils/iterators/types';

export interface RepeatIterator<I extends Iterator<unknown>>
    extends IteratorBase {
    iteratorType: IteratorType.Repeat;
    iterationIndex: number;
    repetitions: number;
    iterator: I;
    originalIterator: I;
    finalIterator?: I;
}

const create = <I extends Iterator<unknown>>(
    itr: I,
    repetitions: number,
): RepeatIterator<I> => ({
    iteratorType: IteratorType.Repeat,
    iterationIndex: 0,
    repetitions,
    iterator: itr,
    originalIterator: iterators.clone(itr),
});

const next = <Item, I extends Iterator<Item>>(
    self: RepeatIterator<I>,
): IteratorResult<Item> => {
    const result = iterators.next(self.iterator);

    if (result.resultType === IteratorResultType.Value) {
        return result;
    }

    if (!self.finalIterator) {
        self.finalIterator = iterators.clone(self.iterator);
    }

    self.iterationIndex += 1;

    if (self.iterationIndex < self.repetitions) {
        self.iterator = iterators.clone(self.originalIterator);
        return next(self);
    } else {
        return iterators.resultEnd;
    }
};

const nextBack = <Item, I extends Iterator<Item>>(
    self: RepeatIterator<I>,
): IteratorResult<Item> => {
    if (self.iterationIndex === self.repetitions) {
        self.iterationIndex -= 1;
    }

    const result = iterators.nextBack(self.iterator);

    if (result.resultType === IteratorResultType.Value) {
        return result;
    }

    if (self.iterationIndex > 0) {
        self.iterationIndex -= 1;
        self.iterator = iterators.clone(self.finalIterator!); // finalIterator should exist when iterationIndex has been greater than 0 before
        return nextBack(self);
    } else {
        return iterators.resultStart;
    }
};

const repeatIterator = { create, next, nextBack };

export default repeatIterator;
