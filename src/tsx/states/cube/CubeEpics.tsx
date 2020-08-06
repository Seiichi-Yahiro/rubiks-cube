import { ofType } from 'redux-observable';
import { cubeActions, CubeActionType } from './CubeActions';
import { map, withLatestFrom } from 'rxjs/operators';
import { AppEpic } from '../States';
import { generateCubicles } from '../../cube/CubeUtils';

const initEpic: AppEpic = (action$, state$) =>
    action$.pipe(
        ofType(CubeActionType.INIT_CUBE),
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

export const cubeEpics = [initEpic];
