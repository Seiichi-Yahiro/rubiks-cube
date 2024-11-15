import iterator from 'src/utils/iterators';
import {
    type Iterator,
    type IteratorBase,
    type IteratorResult,
    IteratorResultType,
    IteratorType,
} from 'src/utils/iterators/types';

export interface FlattenIterator<I extends Iterator<Iterator<unknown>>>
    extends IteratorBase {
    iteratorType: IteratorType.Flatten;
    outerIterator: I;
    innerIterator?: Iterator<unknown>;
}

const create = <I extends Iterator<Iterator<unknown>>>(
    iterator: I,
): FlattenIterator<I> => ({
    iteratorType: IteratorType.Flatten,
    outerIterator: iterator,
});

const next = <Item, I extends Iterator<Iterator<Item>>>(
    self: FlattenIterator<I>,
): IteratorResult<Item> => {
    if (self.innerIterator) {
        const innerResult = iterator.next(self.innerIterator as Iterator<Item>);

        if (innerResult.resultType === IteratorResultType.Value) {
            return innerResult;
        }
    }

    const outerResult = iterator.next(self.outerIterator);

    if (outerResult.resultType === IteratorResultType.Value) {
        self.innerIterator = outerResult.value;
        return next(self);
    } else {
        return outerResult;
    }
};

const nextBack = <Item, I extends Iterator<Iterator<Item>>>(
    self: FlattenIterator<I>,
): IteratorResult<Item> => {
    if (self.innerIterator) {
        const innerResult = iterator.nextBack(
            self.innerIterator as Iterator<Item>,
        );

        if (innerResult.resultType === IteratorResultType.Value) {
            return innerResult;
        }
    }

    const outerResult = iterator.nextBack(self.outerIterator);

    if (outerResult.resultType === IteratorResultType.Value) {
        self.innerIterator = outerResult.value;
        return nextBack(self);
    } else {
        return outerResult;
    }
};

const flattenIterator = { create, next, nextBack };

export default flattenIterator;
