import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { cubeEpics } from 'src/redux/cube/cubeEpics';
import { AppState } from 'src/redux/states';
import { playerEpics } from 'src/redux/player/playerEpics';
import { Action } from 'redux';

const epics = combineEpics(...cubeEpics, ...playerEpics);
export const epicMiddleWare = createEpicMiddleware<Action, Action, AppState>();

export const setupEpics = () => epicMiddleWare.run(epics);
