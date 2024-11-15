import { isAnyOf } from '@reduxjs/toolkit';
import { makeNotationParser } from 'src/algorithms/parser';
import {
    invertSingleRotationCommand,
    isOk,
} from 'src/algorithms/rotationCommand';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { AppStartListening } from 'src/redux/listener';
import { playerActions } from 'src/redux/player/playerActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import iterators from 'src/utils/iterators';

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

export const skipToStartListener = (startListening: AppStartListening) =>
    startListening({
        actionCreator: playerActions.skipToStart,
        effect: (_action, listenerApi) => {
            const state = listenerApi.getState();

            if (
                state.player.status === PlayerStatus.PAUSED &&
                state.player.rotationCommandsIterator
            ) {
                const itr = iterators.clone(
                    state.player.rotationCommandsIterator,
                );

                const remainingRotationCommands = iterators
                    .collect(itr, true)
                    .map(invertSingleRotationCommand);

                listenerApi.dispatch(
                    playerActions.setRotationCommandIterator({
                        iterator: itr,
                        result: iterators.resultStart,
                    }),
                );

                listenerApi.dispatch(
                    cubeActions.applyRotationCommands(
                        remainingRotationCommands,
                    ),
                );
            }
        },
    });

export const skipToEndListener = (startListening: AppStartListening) =>
    startListening({
        actionCreator: playerActions.skipToEnd,
        effect: (_action, listenerApi) => {
            const state = listenerApi.getState();

            if (
                state.player.status === PlayerStatus.STOPPED &&
                isOk(state.player.rotationCommands)
            ) {
                listenerApi.dispatch(
                    cubeActions.applyRotationCommands(
                        state.player.rotationCommands.value,
                    ),
                );
            } else if (
                state.player.status === PlayerStatus.PAUSED &&
                state.player.rotationCommandsIterator
            ) {
                const itr = iterators.clone(
                    state.player.rotationCommandsIterator,
                );

                const remainingRotationCommands = iterators.collect(itr);

                listenerApi.dispatch(
                    playerActions.setRotationCommandIterator({
                        iterator: itr,
                        result: iterators.resultEnd,
                    }),
                );

                listenerApi.dispatch(
                    cubeActions.applyRotationCommands(
                        remainingRotationCommands,
                    ),
                );
            }
        },
    });

export const playAnimationLoopListener = (startListening: AppStartListening) =>
    startListening({
        actionCreator: playerActions.play,
        effect: async (_action, listenerApi) => {
            listenerApi.unsubscribe();

            while (true) {
                listenerApi.dispatch(playerActions.nextCommand());

                let state = listenerApi.getState();

                if (!state.player.currentCommand) {
                    listenerApi.dispatch(playerActions.stop());
                    break;
                }

                await listenerApi.condition((action) =>
                    cubeActions.animationFinished.match(action),
                );

                listenerApi.dispatch(
                    cubeActions.applyRotationCommands([
                        state.player.currentCommand,
                    ]),
                );

                state = listenerApi.getState();

                if (state.player.status === PlayerStatus.STOPPED) {
                    break;
                } else if (state.player.status === PlayerStatus.PAUSED) {
                    const [action] = await listenerApi.take(
                        (action) =>
                            playerActions.stop.match(action) ||
                            playerActions.unPause.match(action),
                    );

                    if (playerActions.stop.match(action)) {
                        break;
                    }
                } else if (state.player.status === PlayerStatus.PLAYING) {
                    await listenerApi.delay(50);
                }
            }

            listenerApi.subscribe();
        },
    });
