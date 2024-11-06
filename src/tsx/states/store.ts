import { configureStore } from '@reduxjs/toolkit';
import { epicMiddleWare, setupEpics } from './epics';
import { reducer } from './states';

export const setupStore = () => {
    const store = configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: false }).concat(epicMiddleWare),
    });
    setupEpics();
    return store;
};
