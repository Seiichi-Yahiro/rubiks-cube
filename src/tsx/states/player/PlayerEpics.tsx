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
import { combineLatest, fromEvent, merge, Subject } from 'rxjs';
import {
    isLoopedRotationCommands,
    RotationCommand,
    SingleRotationCommand,
} from '../../cube/algorithms/RotationCommand';
import Maybe from '../../utils/Maybe';
import { PlayerStatus } from './PlayerState';
import { Action } from 'redux';

const parseNotation: AppEpic = (action$, _state$) => {
    const parser$ = action$.pipe(
        filter(cubeActions.setCubeDimension.match),
        map((action) => makeNotationParser(action.payload).rotationCommands)
    );

    const notation$ = action$.pipe(
        filter(playerActions.updateNotation.match),
        map((action) => action.payload)
    );

    return combineLatest([parser$, notation$]).pipe(
        map(([parser, notation]) => parser.parse(notation)),
        map(playerActions.parsedNotation)
    );
};

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

    let rotationCommandGenerator: Maybe<Generator<
        SingleRotationCommand,
        SingleRotationCommand
    >> = Maybe.none();
    const subject = new Subject<boolean>();

    play$
        .pipe(filter((_) => rotationCommandGenerator.isSome()))
        .subscribe((_) => subject.next(true));

    play$
        .pipe(
            filter((_) => rotationCommandGenerator.isNone()),
            map((it) => it.payload),
            map(singleRotationCommandGenerator)
        )
        .subscribe((it) => {
            rotationCommandGenerator = Maybe.some(it);
            subject.next(true);
        });

    action$.pipe(filter(playerActions.stop.match)).subscribe((_) => {
        rotationCommandGenerator = Maybe.none();
    });

    const commands$ = subject.pipe(
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
        .pipe(filter(cubeActions.applyRotationCommands.match), delay(10))
        .subscribe((_) => subject.next(true));

    return merge(commands$, applyRotationCommand$);
};

export const playerEpics = [parseNotation, player];
