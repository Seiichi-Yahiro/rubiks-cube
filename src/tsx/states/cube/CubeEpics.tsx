import { ofType } from 'redux-observable';
import { cubeActions } from './CubeActions';
import { map, withLatestFrom } from 'rxjs/operators';
import { AppEpic } from '../States';
import { generateCubicles } from '../../cube/CubeUtils';

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

export const cubeEpics = [updateCubicles];
