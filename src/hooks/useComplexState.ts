import { isFunction } from 'lodash';
import { useCallback, useState } from 'react';

function useComplexState<S>(
    initialState: S | (() => S),
): [S, (newState: Partial<S> | ((prevState: S) => Partial<S>)) => void] {
    const [state, setState] = useState(initialState);
    const updateState = useCallback(
        (newState: Partial<S> | ((prevState: S) => Partial<S>)) =>
            setState((prevState) => ({
                ...prevState,
                ...(isFunction(newState) ? newState(prevState) : newState),
            })),
        [],
    );
    return [state, updateState];
}

export default useComplexState;
