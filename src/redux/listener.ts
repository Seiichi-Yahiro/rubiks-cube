import {
    createListenerMiddleware,
    TypedAddListener,
    TypedStartListening,
} from '@reduxjs/toolkit';
import {
    createCubiclesListener,
    saveColorMapListener,
} from 'src/redux/cube/cubeListeners';
import {
    parseListener,
    playAnimationLoopListener,
    skipToEndListener,
} from 'src/redux/player/playerListeners';
import type { AppDispatch, AppState } from 'src/redux/store';

export type AppStartListening = TypedStartListening<AppState, AppDispatch>;
export type AppAddListener = TypedAddListener<AppState, AppDispatch>;

const setupListenerMiddleware = () => {
    const middleware = createListenerMiddleware();

    createCubiclesListener(middleware.startListening);
    saveColorMapListener(middleware.startListening);

    parseListener(middleware.startListening);
    skipToEndListener(middleware.startListening);
    playAnimationLoopListener(middleware.startListening);

    return middleware;
};

export default setupListenerMiddleware;
