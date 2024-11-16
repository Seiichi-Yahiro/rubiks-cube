import {
    createListenerMiddleware,
    TypedAddListener,
    TypedStartListening,
} from '@reduxjs/toolkit';
import {
    animationFinishedListener,
    createCubiclesListener,
    saveColorMapListener,
} from 'src/redux/cube/cubeListeners';
import {
    parseListener,
    playAnimationLoopListener,
    skipListener,
    skipRemainingListener,
} from 'src/redux/player/playerListeners';
import type { AppDispatch, AppState } from 'src/redux/store';

export type AppStartListening = TypedStartListening<AppState, AppDispatch>;
export type AppAddListener = TypedAddListener<AppState, AppDispatch>;

const setupListenerMiddleware = () => {
    const middleware = createListenerMiddleware();

    createCubiclesListener(middleware.startListening);
    animationFinishedListener(middleware.startListening);
    saveColorMapListener(middleware.startListening);

    parseListener(middleware.startListening);
    skipListener(middleware.startListening);
    skipRemainingListener(middleware.startListening);
    playAnimationLoopListener(middleware.startListening);

    return middleware;
};

export default setupListenerMiddleware;
