import { ofType } from 'redux-observable';
import { EMPTY } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { COLOR_MAP } from 'src/redux/localStorage';
import { AppEpic } from 'src/redux/states';
import { generateCubicles } from 'src/tsx/cube/cubeUtils';

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
