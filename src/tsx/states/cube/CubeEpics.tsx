import { ofType } from 'redux-observable';
import { cubeActions } from './CubeActions';
import { map, withLatestFrom } from 'rxjs/operators';
import { AppEpic } from '../States';
import { generateCubicles } from '../../cube/CubeUtils';
import { EMPTY } from 'rxjs';
import { COLOR_MAP } from '../LocalStorage';

const updateCubicles: AppEpic = (action$, state$) =>
    action$.pipe(
        ofType(cubeActions.setCubeDimension.type, cubeActions.resetCube.type),
        withLatestFrom(state$),
        map(([_, state]) =>
            cubeActions.updateCubicles(
                generateCubicles(
                    state.cube.size / state.cube.dimension,
                    state.cube.gapFactor,
                    state.cube.dimension,
                ),
            ),
        ),
    );

const saveColors: AppEpic = (action$, state$) => {
    action$
        .pipe(
            ofType(cubeActions.setColor.type, cubeActions.resetColors.type),
            withLatestFrom(state$),
        )
        .subscribe(([_, state]) => {
            const colorMap = state.cube.colorMap;
            localStorage.setItem(COLOR_MAP, JSON.stringify(colorMap));
        });

    return EMPTY;
};

export const cubeEpics = [updateCubicles, saveColors];
