import { Action } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { cubeEpics } from 'src/redux/cube/cubeEpics';
import { playerEpics } from 'src/redux/player/playerEpics';
import { AppState } from 'src/redux/states';

const epics = combineEpics(...cubeEpics, ...playerEpics);
export const epicMiddleWare = createEpicMiddleware<Action, Action, AppState>();

export const setupEpics = () => epicMiddleWare.run(epics);
