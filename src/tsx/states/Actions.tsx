export interface IAction<T, S> {
    type: T;
    payload: Partial<S>;
}

export type ActionCreator<T, S> = (prevState: S) => IAction<T, S>;
