import { configureStore } from '@reduxjs/toolkit';
import setupListenerMiddleware from 'src/redux/listener';
import { createReducer } from 'src/redux/reducer';

export const setupStore = () => {
    return configureStore({
        reducer: createReducer(),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: false }).prepend(
                setupListenerMiddleware().middleware,
            ),
    });
};

type Store = ReturnType<typeof setupStore>;

export type AppState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch']; // TODO type inference doesn't work
