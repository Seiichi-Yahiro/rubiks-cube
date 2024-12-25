import {
    ForkedTaskAPI,
    isAnyOf,
    ListenerEffectAPI,
    TaskAbortError,
} from '@reduxjs/toolkit';
import { makeNotationParser } from 'src/algorithms/parser';
import {
    createRotationCommandIterator,
    invertRotationCommands,
    invertSingleRotationCommand,
    isOk,
    RotationCommand,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { AppStartListening } from 'src/redux/listener';
import { Direction, playerActions } from 'src/redux/player/playerActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import type { AppDispatch, AppState } from 'src/redux/store';

export const parseListener = (startListening: AppStartListening) =>
    startListening({
        matcher: isAnyOf(
            cubeActions.setCubeDimension,
            playerActions.updateNotation,
        ),
        effect: (_action, listenerApi) => {
            const state = listenerApi.getState();
            const parser = makeNotationParser(state.cube.dimension);
            const parseResult = parser.rotationCommands.parse(
                state.player.notation,
            );
            listenerApi.dispatch(playerActions.parsedNotation(parseResult));
        },
    });

export const setupPlayAnimationLoopListener = (
    startListening: AppStartListening,
) =>
    startListening({
        actionCreator: playerActions.play,
        effect: async (action, listenerApi) => {
            listenerApi.dispatch(
                playerActions.createRotationCommandIterator(action.payload),
            );

            listenerApi.dispatch(playerActions.resume());
        },
    });

export const startPlayAnimationLoopListener = (
    startListening: AppStartListening,
) =>
    startListening({
        actionCreator: playerActions.resume,
        effect: async (_action, listenerApi) => {
            listenerApi.unsubscribe();

            const playLoopTask = listenerApi.fork((forkApi) =>
                createPlayLoopTask(forkApi, listenerApi),
            );

            await listenerApi.condition(
                isAnyOf(playerActions.stop, playerActions.pause),
            );
            playLoopTask.cancel();

            listenerApi.subscribe();
        },
    });

const createPlayLoopTask = async (
    forkApi: ForkedTaskAPI,
    listenerApi: ListenerEffectAPI<AppState, AppDispatch>,
) => {
    try {
        while (true) {
            listenerApi.dispatch(
                playerActions.generateRotationCommands({
                    direction: Direction.Forwards,
                    amount: 1,
                }),
            );

            const [
                {
                    payload: { commands: generatedCommands },
                },
            ] = await forkApi.pause(
                listenerApi.take(playerActions.generatedRotationCommands.match),
            );

            if (generatedCommands.length === 0) {
                listenerApi.dispatch(playerActions.stop());
                break;
            } else if (generatedCommands.length > 1) {
                throw new Error(
                    `Expected one command but got ${generatedCommands.length}`,
                );
            }

            listenerApi.dispatch(
                cubeActions.animateSingleRotationCommand(generatedCommands[0]),
            );

            await forkApi.pause(
                listenerApi.condition(cubeActions.animationFinished.match),
            );

            const state = listenerApi.getState();
            await forkApi.delay(state.player.animationLoopDelay);
        }
    } catch (err) {
        if (err instanceof TaskAbortError) {
            return;
        } else {
            throw err;
        }
    }
};

export const setupStepListener = (startListening: AppStartListening) =>
    startListening({
        predicate: (action, currentState) =>
            currentState.player.status === PlayerStatus.STOPPED &&
            playerActions.nextStep.match(action) &&
            action.payload === Direction.Forwards,
        effect: async (
            action: ReturnType<typeof playerActions.nextStep>,
            listenerApi,
        ) => {
            const state = listenerApi.getState();

            if (!isOk(state.player.rotationCommands)) {
                return;
            }

            listenerApi.dispatch(
                playerActions.createRotationCommandIterator(
                    state.player.rotationCommands.value,
                ),
            );

            listenerApi.dispatch(playerActions.pause());

            // delay next dispatch otherwise step loop fork will miss it
            await listenerApi.delay(state.player.animationLoopDelay);
            listenerApi.dispatch(action);
        },
    });

export const startStepLoopListener = (startListening: AppStartListening) =>
    startListening({
        actionCreator: playerActions.pause,
        effect: async (_action, listenerApi) => {
            listenerApi.unsubscribe();
            const stepLoopTask = listenerApi.fork((forkApi) =>
                createStepLoopTask(forkApi, listenerApi),
            );

            await listenerApi.condition(
                isAnyOf(playerActions.stop, playerActions.resume),
            );

            stepLoopTask.cancel();
            listenerApi.subscribe();
        },
    });

const createStepLoopTask = async (
    forkApi: ForkedTaskAPI,
    listenerApi: ListenerEffectAPI<AppState, AppDispatch>,
) => {
    try {
        while (true) {
            const [{ payload: direction }] = await forkApi.pause(
                listenerApi.take(playerActions.nextStep.match),
            );

            listenerApi.dispatch(
                playerActions.generateRotationCommands({
                    direction,
                    amount: 1,
                }),
            );

            const [
                {
                    payload: { commands: generatedCommands },
                },
            ] = await forkApi.pause(
                listenerApi.take(playerActions.generatedRotationCommands.match),
            );

            if (generatedCommands.length === 1) {
                let rotationCommand = generatedCommands[0];

                if (direction === Direction.Backwards) {
                    rotationCommand =
                        invertSingleRotationCommand(rotationCommand);
                }

                listenerApi.dispatch(
                    cubeActions.animateSingleRotationCommand(rotationCommand),
                );

                await forkApi.pause(
                    listenerApi.condition(cubeActions.animationFinished.match),
                );
            } else if (generatedCommands.length > 1) {
                throw new Error(
                    `Expected one command but got ${generatedCommands.length}`,
                );
            }
        }
    } catch (err) {
        if (err instanceof TaskAbortError) {
            return;
        } else {
            throw err;
        }
    }
};

export const skipListener = (startListening: AppStartListening) =>
    startListening({
        actionCreator: playerActions.skip,
        effect: (action, listenerApi) => {
            const state = listenerApi.getState();

            if (
                !(
                    state.player.status === PlayerStatus.STOPPED &&
                    isOk(state.player.rotationCommands)
                )
            ) {
                return;
            }

            let rotationCommands: RotationCommand[] =
                state.player.rotationCommands.value;

            if (action.payload === Direction.Backwards) {
                rotationCommands = invertRotationCommands(rotationCommands);
            }

            listenerApi.dispatch(
                cubeActions.applyRotationCommands(rotationCommands),
            );
        },
    });

export const skipRemainingListener = (startListening: AppStartListening) =>
    startListening({
        actionCreator: playerActions.skipRemaining,
        effect: async (action, listenerApi) => {
            listenerApi.unsubscribe();

            const state = listenerApi.getState();

            if (state.player.status !== PlayerStatus.PAUSED) {
                return;
            }

            listenerApi.dispatch(
                playerActions.generateRotationCommands({
                    direction: action.payload,
                    amount: 'Remaining',
                }),
            );

            const [
                {
                    payload: { commands: generatedCommands },
                },
            ] = await listenerApi.take(
                playerActions.generatedRotationCommands.match,
            );

            let remainingRotationCommands = generatedCommands;

            if (action.payload === Direction.Backwards) {
                remainingRotationCommands = generatedCommands.map(
                    invertSingleRotationCommand,
                );
            }

            listenerApi.dispatch(
                cubeActions.applyRotationCommands(remainingRotationCommands),
            );

            listenerApi.subscribe();
        },
    });

export const iteratorListener = (startListening: AppStartListening) =>
    startListening({
        actionCreator: playerActions.createRotationCommandIterator,
        effect: async (action, listenerApi) => {
            listenerApi.unsubscribe();

            const iteratorLoopTask = listenerApi.fork((forkApi) =>
                createIteratorLoopTask(forkApi, listenerApi, action.payload),
            );

            await listenerApi.condition(playerActions.stop.match);
            iteratorLoopTask.cancel();

            listenerApi.subscribe();
        },
    });

const createIteratorLoopTask = async (
    forkApi: ForkedTaskAPI,
    listenerApi: ListenerEffectAPI<AppState, AppDispatch>,
    rotationCommands: RotationCommand[],
) => {
    const itr = createRotationCommandIterator(rotationCommands);

    try {
        while (true) {
            const [
                {
                    payload: { direction, amount },
                },
            ] = await forkApi.pause(
                listenerApi.take(playerActions.generateRotationCommands.match),
            );

            const generate = {
                [Direction.Forwards]: itr.next,
                [Direction.Backwards]: itr.nextBack,
            }[direction];

            const commands: SingleRotationCommand[] = [];

            const commandsToCreate = amount === 'Remaining' ? Infinity : amount;

            for (let i = 0; i < commandsToCreate; i++) {
                const result = generate();

                if (result) {
                    commands.push(result);
                } else {
                    break;
                }
            }

            listenerApi.dispatch(
                playerActions.generatedRotationCommands({
                    commands,
                    direction,
                }),
            );
        }
    } catch (err) {
        if (err instanceof TaskAbortError) {
            return;
        } else {
            throw err;
        }
    }
};
