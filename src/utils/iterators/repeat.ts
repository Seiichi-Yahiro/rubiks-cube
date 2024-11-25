import type { SteppableIterator } from 'src/utils/iterators/types';

export interface RepeatIterator<Item> extends SteppableIterator<Item> {
    iterationIndex: number;
    repetitions: number;
    iterator: SteppableIterator<Item>;
}

export const createRepeatIterator = <Item>(
    iterator: SteppableIterator<Item>,
    repetitions: number,
): RepeatIterator<Item> => {
    let iterationIndex = 0;

    const next = (): Item | null => {
        const result = iterator.next();

        if (result) {
            return result;
        }

        iterationIndex += 1;

        if (iterationIndex < repetitions) {
            iterator.toStart();
            return next();
        } else {
            return null;
        }
    };

    const nextBack = (): Item | null => {
        if (iterationIndex === repetitions) {
            iterationIndex -= 1;
        }

        const result = iterator.nextBack();

        if (result) {
            return result;
        }

        if (iterationIndex > 0) {
            iterationIndex -= 1;
            iterator.toEnd();
            return nextBack();
        } else {
            return null;
        }
    };

    return {
        iterationIndex,
        repetitions,
        iterator,
        next,
        nextBack,
        toStart: () => {
            iterationIndex = 0;
            iterator.toStart();
        },
        toEnd: () => {
            iterationIndex = repetitions;
            iterator.toEnd();
        },
    };
};
