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

const nextBack = <Item>(self: Iterator<Item>): IteratorResult<Item> => {
    switch (self.iteratorType) {
        case IteratorType.Array: {
            return arrayIterator.nextBack(self);
        }
        case IteratorType.Repeat: {
            return repeatIterator.nextBack(self);
        }
        case IteratorType.Flatten: {
            return flattenIterator.nextBack(self);
        }
    }
};

const collect = <Item>(self: Iterator<Item>, backwards = false): Item[] => {
    const values: Item[] = [];

    const produce = backwards ? nextBack : next;
    let result = produce(self);

    while (result.resultType === IteratorResultType.Value) {
        values.push(result.value);
        result = produce(self);
    }

    return values;
};

const resultStart: IteratorResultEdge = {
    resultType: IteratorResultType.Start,
};

const resultEnd: IteratorResultEdge = { resultType: IteratorResultType.End };

const resultValue = <Item>(item: Item): IteratorResultValue<Item> => ({
    resultType: IteratorResultType.Value,
    value: item,
});

const iterator = {
    clone,
    next,
    nextBack,
    collect,
    resultStart,
    resultEnd,
    resultValue,
};

export default iterator;
