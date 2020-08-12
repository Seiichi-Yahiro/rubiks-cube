import { ofType } from 'redux-observable';
import { cubeActions } from './CubeActions';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AppEpic } from '../States';
import { generateCubicles } from '../../cube/CubeUtils';

const initEpic: AppEpic = (action$, state$) =>
    action$.pipe(
        filter(cubeActions.init.match),
        withLatestFrom(state$),
        map(([_, state]) => cubeActions.setCubeDimension(state.cube.dimension))
    );

const updateCubicles: AppEpic = (action$, state$) =>
    action$.pipe(
        ofType(cubeActions.setCubeDimension.type, cubeActions.resetCube.type),
        withLatestFrom(state$),
        map(([_, state]) =>
            cubeActions.updateCubicles(
                generateCubicles(
                    state.cube.size / state.cube.dimension,
                    state.cube.gapFactor,
                    state.cube.dimension
                )
            )
        )
    );

export const cubeEpics = [initEpic, updateCubicles];
