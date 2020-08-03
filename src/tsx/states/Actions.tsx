import { Action } from 'redux';
import { CubeActionType } from './cube/CubeActions';
import { PlayerActionType } from './player/PlayerActions';

export type AppAction = Action<CubeActionType | PlayerActionType>;
