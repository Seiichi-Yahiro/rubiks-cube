import { Action, combineReducers } from 'redux';
import { Epic } from 'redux-observable';
import { cubeReducer, ICubeState } from 'src/redux/cube/cubeState';
import { IPlayerState, playerReducer } from 'src/redux/player/playerState';

export interface AppState {
    cube: ICubeState;
    player: IPlayerState;
}

export const reducer = combineReducers({
    cube: cubeReducer,
    player: playerReducer,
});

export type AppEpic = Epic<Action, Action, AppState>;
