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

export type AppStore = ReturnType<typeof setupStore>;

export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']; // TODO type inference doesn't work
