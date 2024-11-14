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

    self.iterationIndex += 1;

    if (self.iterationIndex < self.repetitions) {
        self.iterator = iterators.clone(self.originalIterator);
        return next(self);
    } else {
        return iterators.resultEnd;
    }
};

const repeatIterator = { create, next };

export default repeatIterator;
