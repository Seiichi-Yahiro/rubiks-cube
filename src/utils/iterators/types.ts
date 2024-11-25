export interface SteppableIterator<Item> {
    next: () => Item | null;
    nextBack: () => Item | null;
    toStart: () => void;
    toEnd: () => void;
}
