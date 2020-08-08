import { AppEpic } from '../States';
import { playerActions, PlayerActionType } from './PlayerActions';
import {
    concatMap,
    debounceTime,
    filter,
    first,
    map,
    mapTo,
    withLatestFrom,
} from 'rxjs/operators';
import { makeNotationParser } from '../../cube/algorithms/Parser';
import { cubeActions, CubeActionType } from '../cube/CubeActions';
import { combineLatest, fromEvent, merge, Subject } from 'rxjs';
import { ofType } from 'redux-observable';
import {
    Command,
    isLoop,
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

function* commandGenerator(
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
}

const player: AppEpic = (action$, state$) => {
    const play$ = action$.pipe(ofType(PlayerActionType.PLAY_ALGORITHM));

    let generator: Maybe<Generator<Command, Command>> = Maybe.none();
    const subject = new Subject<boolean>();

    play$
        .pipe(filter((_) => generator.isSome()))
        .subscribe((_) => subject.next(true));

    play$
        .pipe(
            filter((_) => generator.isNone()),
            withLatestFrom(state$),
            map(([_, state]) => state.player.rotationCommands),
            filter(isOk),
            map((it) => it.value),
            map(commandGenerator)
        )
        .subscribe((it) => {
            generator = Maybe.some(it);
            subject.next(true);
        });

    action$.pipe(ofType(PlayerActionType.STOP_ALGORITHM)).subscribe((_) => {
        generator = Maybe.none();
    });

    const commands$ = subject.pipe(
        withLatestFrom(state$),
        filter(([_, state]) => state.player.status === PlayerStatus.PLAYING),
        map((_) =>
            generator
                .map((it) => it.next().value)
                .map<AppAction>(cubeActions.executeRotationCommand)
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
        debounceTime(50)
    );

    const applyRotation$ = action$.pipe(
        ofType(CubeActionType.EXECUTE_ROTATION_COMMAND),
        concatMap((_) => transitionEnd$.pipe(first())),
        mapTo(cubeActions.applyRotation())
    );

    action$
        .pipe(ofType(CubeActionType.APPLY_ROTATION))
        .subscribe((_) => subject.next(true));

    return merge(commands$, applyRotation$);
};

export const playerEpics = [parseNotation, player];
