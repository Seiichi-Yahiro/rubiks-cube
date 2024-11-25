import type { SteppableIterator } from 'src/utils/iterators/types';

export interface ArrayIterator<Item> extends SteppableIterator<Item> {
    index: number;
    array: Item[];
}

export const createArrayIterator = <Item>(
    array: Item[],
): ArrayIterator<Item> => {
    let index = 0;

    return {
        index,
        array,
        next: () => {
            if (index < array.length) {
                const value = array[index];
                index += 1;
                return value;
            } else {
                return null;
            }
        },
        nextBack: () => {
            if (index > 0) {
                index -= 1;
                return array[index];
            } else {
                return null;
            }
        },
        toStart: () => {
            index = 0;
        },
        toEnd: () => {
            index = array.length;
        },
    };
};
