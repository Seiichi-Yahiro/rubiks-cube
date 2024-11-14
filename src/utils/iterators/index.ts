import { cloneDeep } from 'lodash';
import arrayIterator from 'src/utils/iterators/array';
import flattenIterator from 'src/utils/iterators/flatten';
import repeatIterator from 'src/utils/iterators/repeat';
import {
    type Iterator,
    type IteratorResult,
    IteratorResultEdge,
    IteratorResultType,
    IteratorResultValue,
    IteratorType,
} from 'src/utils/iterators/types';

const clone = <I extends Iterator<unknown>>(self: I): I => cloneDeep(self);

const next = <Item>(self: Iterator<Item>): IteratorResult<Item> => {
    switch (self.iteratorType) {
        case IteratorType.Array: {
            return arrayIterator.next(self);
        }
        case IteratorType.Repeat: {
            return repeatIterator.next(self);
        }
        case IteratorType.Flatten: {
            return flattenIterator.next(self);
        }
    }
};

const resultStart: IteratorResultEdge = {
    resultType: IteratorResultType.Start,
};

const resultEnd: IteratorResultEdge = { resultType: IteratorResultType.End };

const resultValue = <Item>(item: Item): IteratorResultValue<Item> => ({
    resultType: IteratorResultType.Value,
    value: item,
});

const iterator = { next, clone, resultStart, resultEnd, resultValue };

export default iterator;
