import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { cubeEpics } from './cube/cubeEpics';
import { AppState } from './states';
import { playerEpics } from './player/playerEpics';
import { Action } from 'redux';

const epics = combineEpics(...cubeEpics, ...playerEpics);
export const epicMiddleWare = createEpicMiddleware<Action, Action, AppState>();

export const setupEpics = () => epicMiddleWare.run(epics);
