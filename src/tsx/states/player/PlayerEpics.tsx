import { AppEpic } from '../States';
import { playerActions, PlayerActionType } from './PlayerActions';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    startWith,
    withLatestFrom,
} from 'rxjs/operators';
import { makeNotationParser } from '../../cube/algorithms/Parser';
import { CubeActionType } from '../cube/CubeActions';
import { combineLatest } from 'rxjs';
import { ofType } from 'redux-observable';

const parseNotation: AppEpic = (action$, state$) => {
    const parser$ = action$.pipe(
        ofType(CubeActionType.SET_CUBE_DIMENSION),
        withLatestFrom(state$),
        map(([_, state]) => state.cube.dimension),
        startWith(state$.value.cube.dimension),
        map((dimension) => makeNotationParser(dimension).rotationCommands)
    );

    const notation$ = action$.pipe(
        ofType(PlayerActionType.UPDATE_NOTATION),
        debounceTime(500),
        withLatestFrom(state$),
        map(([_, state]) => state.player.notation),
        distinctUntilChanged()
    );

    return combineLatest([parser$, notation$]).pipe(
        map(([parser, notation]) => parser.parse(notation)),
        map(playerActions.parsedNotation)
    );
};

export const playerEpics = [parseNotation];
