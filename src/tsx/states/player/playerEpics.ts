import { AppEpic } from '../states';
import { playerActions } from './playerActions';
import {
    concatMap,
    delay,
    filter,
    first,
    map,
    mapTo,
    withLatestFrom,
} from 'rxjs/operators';
import { makeNotationParser } from '../../cube/algorithms/parser';
import { cubeActions } from '../cube/cubeActions';
import { fromEvent, merge, Subject } from 'rxjs';
import {
    isLoopedRotationCommands,
    RotationCommand,
    SingleRotationCommand,
} from '../../cube/algorithms/rotationCommand';
import Maybe from '../../utils/maybe';
import { PlayerStatus } from './playerState';
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { cubicleClassname } from '../../cube/Cubicle';

const parseNotation: AppEpic = (action$, state$) =>
    action$.pipe(
        ofType(
            cubeActions.setCubeDimension.type,
            playerActions.updateNotation.type,
        ),
        withLatestFrom(state$),
        map(([_, state]) => {
            const parser = makeNotationParser(state.cube.dimension);
            return parser.rotationCommands.parse(state.player.notation);
        }),
        map(playerActions.parsedNotation),
    );

function* singleRotationCommandGenerator(
    rotationCommands: RotationCommand[],
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
            map(singleRotationCommandGenerator),
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
                .unwrapOr(playerActions.stop),
        ),
    );

    const transitionEnd$ = fromEvent<TransitionEvent>(
        window,
        'transitionend',
    ).pipe(
        filter(
            (event) =>
                event.propertyName === 'transform' &&
                (event.target as HTMLElement).className.includes(
                    cubicleClassname,
                ),
        ),
    );

    const applyRotationCommand$ = action$.pipe(
        filter(playerActions.setCurrentRotationCommand.match),
        map((action) => [action.payload]),
        map(cubeActions.applyRotationCommands),
        concatMap((action) => transitionEnd$.pipe(first(), mapTo(action))),
    );

    action$
        .pipe(filter(cubeActions.applyRotationCommands.match), delay(50))
        .subscribe((_) => rotationCommandDelay$.next(true));

    return merge(setCurrentRotationCommand$, applyRotationCommand$);
};

export const playerEpics = [parseNotation, player];
