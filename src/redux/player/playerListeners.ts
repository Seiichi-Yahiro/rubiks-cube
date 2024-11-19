import { isAnyOf } from '@reduxjs/toolkit';
import { makeNotationParser } from 'src/algorithms/parser';
import {
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
import iterators from 'src/utils/iterators';
import {
    IteratorResultEdge,
    IteratorResultType,
} from '../../utils/iterators/types';

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
        effect: (action, listenerApi) => {
            const state = listenerApi.getState();

            if (
                !(
                    state.player.status === PlayerStatus.PAUSED &&
                    state.player.rotationCommandsIterator
                )
            ) {
                return;
            }

            const itr = iterators.clone(
                state.player.rotationCommandsIterator.itr,
            );

            let remainingRotationCommands: SingleRotationCommand[];
            let result: IteratorResultEdge;

            if (action.payload === Direction.Backwards) {
                remainingRotationCommands = iterators
                    .collect(itr, true)
                    .map(invertSingleRotationCommand);

                result = iterators.resultStart;
            } else {
                remainingRotationCommands = iterators.collect(itr);
                result = iterators.resultEnd;
            }

            listenerApi.dispatch(
                playerActions.setRotationCommandIterator({
                    itr,
                    result,
                }),
            );

            listenerApi.dispatch(
                cubeActions.applyRotationCommands(remainingRotationCommands),
            );
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

                if (
                    !state.player.rotationCommandsIterator ||
                    state.player.rotationCommandsIterator.result.resultType !==
                        IteratorResultType.Value
                ) {
                    listenerApi.dispatch(playerActions.stop());
                    break;
                }

                listenerApi.dispatch(
                    cubeActions.animateSingleRotationCommand(
                        state.player.rotationCommandsIterator.result.value,
                    ),
                );

                await listenerApi.condition((action) =>
                    cubeActions.animationFinished.match(action),
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
