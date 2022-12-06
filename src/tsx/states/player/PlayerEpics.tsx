import { AppEpic } from '../States';
import { playerActions } from './PlayerActions';
import {
    concatMap,
    delay,
    filter,
    first,
    map,
    mapTo,
    withLatestFrom,
} from 'rxjs/operators';
import { makeNotationParser } from '../../cube/algorithms/Parser';
import { cubeActions } from '../cube/CubeActions';
import { fromEvent, merge, Subject } from 'rxjs';
import {
    isLoopedRotationCommands,
    RotationCommand,
    SingleRotationCommand,
} from '../../cube/algorithms/RotationCommand';
import Maybe from '../../utils/Maybe';
import { PlayerStatus } from './PlayerState';
import { Action } from 'redux';
import { ofType } from 'redux-observable';

const parseNotation: AppEpic = (action$, state$) =>
    action$.pipe(
        ofType(
            cubeActions.setCubeDimension.type,
            playerActions.updateNotation.type
        ),
        withLatestFrom(state$),
        map(([_, state]) => {
            const parser = makeNotationParser(state.cube.dimension);
            return parser.rotationCommands.parse(state.player.notation);
        }),
        map(playerActions.parsedNotation)
    );

function* singleRotationCommandGenerator(
    rotationCommands: RotationCommand[]
): Generator<SingleRotationCommand> {
    for (const rotationCommand of rotationCommands) {
        if (isLoopedRotationCommands(rotationCommand)) {
            for (let i = 0; i < rotationCommand.iterations; i++) {
                yield* singleRotationCommandGenerator(rotationCommand.commands);
            }
        } else {
            yield rotationCommand;
        }
    }
}

const player: AppEpic = (action$, state$) => {
    const play$ = action$.pipe(filter(playerActions.play.match));
    const unPause$ = action$.pipe(filter(playerActions.unPause.match));
    const stop$ = action$.pipe(filter(playerActions.stop.match));

    let rotationCommandGenerator: Maybe<
        Generator<SingleRotationCommand, SingleRotationCommand>
    > = Maybe.none();

    const rotationCommandDelay$ = new Subject<boolean>();

    play$
        .pipe(
            filter((_) => rotationCommandGenerator.isNone()),
            map((it) => it.payload),
            map(singleRotationCommandGenerator)
        )
        .subscribe((it) => {
            rotationCommandGenerator = Maybe.some(it);
            rotationCommandDelay$.next(true);
        });

    unPause$.subscribe((_) => rotationCommandDelay$.next(true));

    stop$.subscribe((_) => {
        rotationCommandGenerator = Maybe.none();
    });

    const setCurrentRotationCommand$ = rotationCommandDelay$.pipe(
        withLatestFrom(state$),
        filter(([_, state]) => state.player.status === PlayerStatus.PLAYING),
        map((_) =>
            rotationCommandGenerator
                .map((it) => it.next().value)
                .map<Action>(playerActions.setCurrentRotationCommand)
                .unwrapOr(playerActions.stop)
        )
    );

    const transitionEnd$ = fromEvent<TransitionEvent>(
        window,
        'transitionend'
    ).pipe(
        filter(
            (event) =>
                event.propertyName === 'transform' &&
                (event.target as HTMLElement).className.includes(
                    'rubiks-cube__cubicle'
                )
        )
    );

    const applyRotationCommand$ = action$.pipe(
        filter(playerActions.setCurrentRotationCommand.match),
        map((action) => [action.payload]),
        map(cubeActions.applyRotationCommands),
        concatMap((action) => transitionEnd$.pipe(first(), mapTo(action)))
    );

    action$
        .pipe(filter(cubeActions.applyRotationCommands.match), delay(50))
        .subscribe((_) => rotationCommandDelay$.next(true));

    return merge(setCurrentRotationCommand$, applyRotationCommand$);
};

export const playerEpics = [parseNotation, player];
