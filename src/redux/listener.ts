import {
    createListenerMiddleware,
    TypedAddListener,
    TypedStartListening,
} from '@reduxjs/toolkit';
import {
    animationFinishedListener,
    createCubiclesListener,
    saveColorMapListener,
    setColorMapCssVariablesListener,
} from 'src/redux/cube/cubeListeners';
import {
    iteratorListener,
    parseListener,
    setupPlayAnimationLoopListener,
    setupStepListener,
    skipListener,
    skipRemainingListener,
    startPlayAnimationLoopListener,
    startStepLoopListener,
} from 'src/redux/player/playerListeners';
import type { AppDispatch, AppState } from 'src/redux/store';

export type AppStartListening = TypedStartListening<AppState, AppDispatch>;
export type AppAddListener = TypedAddListener<AppState, AppDispatch>;

const setupListenerMiddleware = () => {
    const middleware = createListenerMiddleware();

    createCubiclesListener(middleware.startListening);
    animationFinishedListener(middleware.startListening);

    setColorMapCssVariablesListener(middleware.startListening);
    saveColorMapListener(middleware.startListening);

    parseListener(middleware.startListening);

    skipListener(middleware.startListening);
    skipRemainingListener(middleware.startListening);

    setupStepListener(middleware.startListening);
    startStepLoopListener(middleware.startListening);

    setupPlayAnimationLoopListener(middleware.startListening);
    startPlayAnimationLoopListener(middleware.startListening);

    iteratorListener(middleware.startListening);

    return middleware;
};

export default setupListenerMiddleware;
