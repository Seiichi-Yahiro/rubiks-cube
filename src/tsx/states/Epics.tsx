import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { cubeEpics } from './cube/CubeEpics';
import { AppState } from './States';
import { AppAction } from './Actions';
import { playerEpics } from './player/PlayerEpics';

const epics = combineEpics(...cubeEpics, ...playerEpics);
export const epicMiddleWare = createEpicMiddleware<
    AppAction,
    AppAction,
    AppState
>();

export const setupEpics = () => epicMiddleWare.run(epics);
