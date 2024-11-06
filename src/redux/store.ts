import { configureStore } from '@reduxjs/toolkit';
import { epicMiddleWare, setupEpics } from 'src/redux/epics';
import { reducer } from 'src/redux/states';

export const setupStore = () => {
    const store = configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: false }).concat(epicMiddleWare),
    });
    setupEpics();
    return store;
};
