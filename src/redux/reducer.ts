import { combineReducers } from 'redux';
import { createCubeReducer } from 'src/redux/cube/cubeReducer';
import { createPlayerReducer } from 'src/redux/player/playerReducer';

export const createReducer = () =>
    combineReducers({
        cube: createCubeReducer(),
        player: createPlayerReducer(),
    });
