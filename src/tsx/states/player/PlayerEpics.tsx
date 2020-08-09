import { AppEpic } from '../States';
import { playerActions, PlayerActionType } from './PlayerActions';
import {
    concatMap,
    debounceTime,
    delay,
    filter,
    first,
    map,
    withLatestFrom,
} from 'rxjs/operators';
import { makeNotationParser } from '../../cube/algorithms/Parser';
import { cubeActions, CubeActionType } from '../cube/CubeActions';
import { combineLatest, fromEvent, merge, Subject } from 'rxjs';
import { ofType } from 'redux-observable';
import {
    SingleRotationCommand,
    isLoopedRotationCommands,
    isOk,
    RotationCommand,
} from '../../cube/algorithms/RotationCommand';
import { AppAction } from '../Actions';
import Maybe from '../../utils/Maybe';
import { PlayerStatus } from './PlayerState';

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
    const play$ = action$.pipe(ofType(PlayerActionType.PLAY_ALGORITHM));

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
            withLatestFrom(state$),
            map(([_, state]) => state.player.rotationCommands),
            filter(isOk),
            map((it) => it.value),
            map(singleRotationCommandGenerator)
        )
        .subscribe((it) => {
            rotationCommandGenerator = Maybe.some(it);
            subject.next(true);
        });

    action$.pipe(ofType(PlayerActionType.STOP_ALGORITHM)).subscribe((_) => {
        rotationCommandGenerator = Maybe.none();
    });

    const commands$ = subject.pipe(
        withLatestFrom(state$),
        filter(([_, state]) => state.player.status === PlayerStatus.PLAYING),
        map((_) =>
            rotationCommandGenerator
                .map((it) => it.next().value)
                .map<AppAction>(playerActions.setCurrentRotationCommand)
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
        ),
        debounceTime(10)
    );

    const applyRotationCommand$ = action$.pipe(
        ofType(PlayerActionType.SET_CURRENT_ROTATION_COMMAND),
        concatMap((_) => transitionEnd$.pipe(first())),
        withLatestFrom(state$),
        map(([_, state]) => state.player.currentCommand),
        filter((command) => command !== undefined),
        map((command) => [command!]),
        map(cubeActions.applyRotationCommands)
    );

    action$
        .pipe(ofType(CubeActionType.APPLY_ROTATION_COMMANDS), delay(10))
        .subscribe((_) => subject.next(true));

    return merge(commands$, applyRotationCommand$);
};

export const playerEpics = [parseNotation, player];
