export * from 'src/utils/iterators/array';
export * from 'src/utils/iterators/flatten';
export * from 'src/utils/iterators/repeat';
import type { SteppableIterator } from 'src/utils/iterators/types';

export const collectArray = <Item>(
    iterator: SteppableIterator<Item>,
    backwards = false,
): Item[] => {
    const values: Item[] = [];

    const produceItem = backwards ? iterator.nextBack : iterator.next;

    let result = produceItem();

    while (result !== null) {
        values.push(result);
        result = produceItem();
    }

    return values;
};
