import type { ArrayIterator } from 'src/utils/iterators/array';
import type { FlattenIterator } from 'src/utils/iterators/flatten';
import type { RepeatIterator } from 'src/utils/iterators/repeat';

export enum IteratorType {
    Array = 'Array',
    Repeat = 'Repeat',
    Flatten = 'Flatten',
}

export interface IteratorBase {
    iteratorType: IteratorType;
}

export type Iterator<Item> =
    | ArrayIterator<Item>
    | RepeatIterator<Iterator<Item>>
    | FlattenIterator<Iterator<Iterator<Item>>>;

export enum IteratorResultType {
    Start = 'Start',
    End = 'End',
    Value = 'Value',
}

export interface IteratorResultEdge {
    resultType: IteratorResultType.Start | IteratorResultType.End;
}

export interface IteratorResultValue<Item> {
    resultType: IteratorResultType.Value;
    value: Item;
}

export type IteratorResult<T> = IteratorResultEdge | IteratorResultValue<T>;
