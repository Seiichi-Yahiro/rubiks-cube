import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { cubeEpics } from './cube/CubeEpics';
import { AppState } from './States';
import { playerEpics } from './player/PlayerEpics';
import { Action } from 'redux';

const epics = combineEpics(...cubeEpics, ...playerEpics);
export const epicMiddleWare = createEpicMiddleware<Action, Action, AppState>();

export const setupEpics = () => epicMiddleWare.run(epics);
