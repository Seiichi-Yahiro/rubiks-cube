import { combineReducers } from 'redux';
import { Epic } from 'redux-observable';
import { AppAction } from './Actions';
import { cubeReducer, ICubeState } from './cube/CubeState';
import { useSelector } from 'react-redux';
import { IPlayerState, playerReducer } from './player/PlayerState';

export interface AppState {
    cube: ICubeState;
    player: IPlayerState;
}

export const reducer = combineReducers<AppState>({
    cube: cubeReducer,
    player: playerReducer,
});

export type AppEpic = Epic<AppAction, AppAction, AppState>;

export const useRedux = function <T>(selector: (state: AppState) => T) {
    return useSelector<AppState, T>(selector);
};
