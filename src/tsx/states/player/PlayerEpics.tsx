import { AppEpic } from '../States';
import { playerActions, PlayerActionType } from './PlayerActions';
import {
    concatMap,
    debounceTime,
    exhaustMap,
    filter,
    first,
    map,
    mapTo,
    repeat,
    takeUntil,
    tap,
    withLatestFrom,
} from 'rxjs/operators';
import { makeNotationParser } from '../../cube/algorithms/Parser';
import { cubeActions, CubeActionType } from '../cube/CubeActions';
import { combineLatest, concat, fromEvent, Observable, of } from 'rxjs';
import { ofType } from 'redux-observable';
import {
    Command,
    isLoop,
    isOk,
    RotationCommand,
} from '../../cube/algorithms/RotationCommand';
import { fromArray } from 'rxjs/internal/observable/fromArray';

const parseNotation: AppEpic = (action$, state$) => {
    const parser$ = action$.pipe(
        ofType(CubeActionType.SET_CUBE_DIMENSION),
        withLatestFrom(state$),
        map(([_, state]) => state.cube.dimension),
        map((dimension) => makeNotationParser(dimension).rotationCommands)
    );

    const notation$ = action$.pipe(
        ofType(PlayerActionType.UPDATE_NOTATION),
        withLatestFrom(state$),
        map(([_, state]) => state.player.notation)
    );

    return combineLatest([parser$, notation$]).pipe(
        map(([parser, notation]) => parser.parse(notation)),
        map(playerActions.parsedNotation)
    );
};

/*function* commandGenerator(
    rotationCommands: RotationCommand[]
): Generator<Command> {
    for (const rotationCommand of rotationCommands) {
        if (isLoop(rotationCommand)) {
            for (let i = 0; i < rotationCommand.iterations; i++) {
                yield* commandGenerator(rotationCommand.commands);
            }
        } else {
            yield rotationCommand;
        }
    }
}*/

const transitionEnd$ = fromEvent<TransitionEvent>(window, 'transitionend').pipe(
    filter(
        (event) =>
            event.propertyName === 'transform' &&
            (event.target as HTMLElement).className.includes(
                'rubiks-cube__cubicle'
            )
    ),
    tap((_) => console.log('transitionend')),
    debounceTime(50)
);

const player: AppEpic = (action$, state$) => {
    const play$ = action$.pipe(ofType(PlayerActionType.PLAY_ALGORITHM));
    const pause$ = action$.pipe(ofType(PlayerActionType.PAUSE_ALGORITHM));
    const stop$ = action$.pipe(ofType(PlayerActionType.STOP_ALGORITHM));

    // TODO check for 0 in iterations
    const flattenRotationCommands = (
        rotationCommands: RotationCommand[]
    ): Observable<Command> =>
        fromArray(rotationCommands).pipe(
            concatMap((command) => {
                if (isLoop(command)) {
                    return flattenRotationCommands(command.commands).pipe(
                        repeat(command.iterations)
                    );
                } else {
                    return of(command);
                }
            })
        );

    return play$.pipe(
        withLatestFrom(state$),
        map(([_, state]) => state.player.rotationCommands),
        filter(isOk),
        map((rotationCommands) => rotationCommands.value),
        exhaustMap((rotationCommands) =>
            flattenRotationCommands(rotationCommands).pipe(
                map(cubeActions.executeRotationCommand),
                concatMap((command) =>
                    concat(
                        of(command),
                        transitionEnd$.pipe(
                            first(),
                            mapTo(cubeActions.applyRotation())
                        )
                    )
                ),
                takeUntil(stop$)
            )
        )
    );
};

export const playerEpics = [parseNotation, player];
