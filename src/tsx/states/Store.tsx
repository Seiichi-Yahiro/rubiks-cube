import { configureStore } from '@reduxjs/toolkit';
import { epicMiddleWare, setupEpics } from './Epics';
import { reducer } from './States';

export const setupStore = () => {
    const store = configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: false }).concat(epicMiddleWare),
    });
    setupEpics();
    return store;
};
