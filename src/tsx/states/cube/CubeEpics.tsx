import { ofType } from 'redux-observable';
import { cubeActions } from './CubeActions';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    withLatestFrom,
} from 'rxjs/operators';
import { AppEpic } from '../States';
import { EMPTY, merge } from 'rxjs';
import { COLOR_MAP } from '../LocalStorage';
import { fromWorker } from 'observable-webworker';
import { ICubicle } from '../../cube/CubeTypes';
import { ApplyRotationCommandWorkerInput } from './workers/ApplyRotationCommandWorker';
import { GenerateCubiclesWorkerInput } from './workers/GenerateCubiclesWorker';

const generateCubicles: AppEpic = (action$, state$) => {
    const dimension$ = action$.pipe(
        filter(cubeActions.setCubeDimension.match),
        map((action) => action.payload),
        distinctUntilChanged()
    );
    const reset$ = action$.pipe(
        filter(cubeActions.resetCube.match),
        debounceTime(250)
    );

    const input$ = merge(dimension$, reset$).pipe(
        withLatestFrom(state$),
        map(
            ([_, state]): GenerateCubiclesWorkerInput => ({
                cubeSize: state.cube.size,
                gapFactor: state.cube.gapFactor,
                dimension: state.cube.dimension,
            })
        )
    );

    return fromWorker<GenerateCubiclesWorkerInput, ICubicle[]>(
        () =>
            new Worker('./workers/GenerateCubiclesWorker', { type: 'module' }),
        input$
    ).pipe(map(cubeActions.updateCubicles));
};

const applyRotationCommands: AppEpic = (action$, state$) => {
    const input$ = action$.pipe(
        filter(cubeActions.applyRotationCommands.match),
        map((action) => action.payload),
        withLatestFrom(state$),
        map(
            ([rotationCommands, state]): ApplyRotationCommandWorkerInput => ({
                rotationCommands,
                cubicles: state.cube.cubicles,
                dimension: state.cube.dimension,
            })
        )
    );

    return fromWorker<ApplyRotationCommandWorkerInput, ICubicle[]>(
        () =>
            new Worker('./workers/ApplyRotationCommandWorker', {
                type: 'module',
            }),
        input$
    ).pipe(map(cubeActions.updateCubicles));
};

const saveColors: AppEpic = (action$, state$) => {
    action$
        .pipe(
            ofType(cubeActions.setColor.type, cubeActions.resetColors.type),
            withLatestFrom(state$)
        )
        .subscribe(([_, state]) => {
            const colorMap = state.cube.colorMap;
            localStorage.setItem(COLOR_MAP, JSON.stringify(colorMap));
        });

    return EMPTY;
};

export const cubeEpics = [generateCubicles, applyRotationCommands, saveColors];
