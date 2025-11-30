import type { SteppableIterator } from 'src/utils/iterators/types';

export interface FlattenIterator<Item> extends SteppableIterator<Item> {
    outerIterator: SteppableIterator<SteppableIterator<Item>>;
    innerIterator?: SteppableIterator<Item>;
}

export const createFlattenIterator = <Item>(
    iterator: SteppableIterator<SteppableIterator<Item>>,
): FlattenIterator<Item> => {
    const outerIterator = iterator;
    let innerIterator: SteppableIterator<Item> | undefined;

    const next = (): Item | null => {
        if (innerIterator) {
            const innerResult = innerIterator.next();

            if (innerResult !== null) {
                return innerResult;
            }
        }

        const outerResult = outerIterator.next();

        if (outerResult) {
            innerIterator = outerResult;
            return next();
        } else {
            return null;
        }
    };

    const nextBack = (): Item | null => {
        if (innerIterator) {
            const innerResult = innerIterator.nextBack();

            if (innerResult !== null) {
                return innerResult;
            }
        }

        const outerResult = outerIterator.nextBack();

        if (outerResult) {
            innerIterator = outerResult;
            return nextBack();
        } else {
            return null;
        }
    };

    return {
        outerIterator,
        innerIterator,
        next,
        nextBack,
        toStart: () => {
            innerIterator?.toStart();

            let innerItr = outerIterator.nextBack();

            while (innerItr) {
                innerItr.toStart();
                innerItr = outerIterator.nextBack();
            }

            innerIterator = undefined;
        },
        toEnd: () => {
            innerIterator?.toEnd();

            let innerItr = outerIterator.next();

            while (innerItr) {
                innerItr.toEnd();
                innerItr = outerIterator.next();
            }

            innerIterator = undefined;
        },
    };
};
