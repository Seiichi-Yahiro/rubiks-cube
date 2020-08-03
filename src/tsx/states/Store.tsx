import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { epicMiddleWare, setupEpics } from './Epics';
import { reducer } from './States';

const middleware = [...getDefaultMiddleware({ thunk: false }), epicMiddleWare];

export const setupStore = () => {
    const store = configureStore({ reducer, middleware });
    setupEpics();
    return store;
};
