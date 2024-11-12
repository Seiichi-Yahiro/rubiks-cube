import { isAnyOf } from '@reduxjs/toolkit';
import { debounce } from 'lodash';
import { makeNotationParser } from 'src/algorithms/parser';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { AppStartListening } from 'src/redux/listener';
import { playerActions } from 'src/redux/player/playerActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import { cubicleClassname } from 'src/tsx/cube/Cubicle';

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

export const playAnimationLoopListener = (startListening: AppStartListening) =>
    startListening({
        actionCreator: playerActions.play,
        effect: async (_action, listenerApi) => {
            listenerApi.unsubscribe();

            const debouncedAnimationFinishedDispatch = debounce(
                () => listenerApi.dispatch(playerActions.animationFinished()),
                50,
            );

            const sendAnimationFinishedEvents = (event: TransitionEvent) => {
                const isCorrectEvent =
                    event.propertyName === 'transform' &&
                    (event.target as HTMLElement).className.includes(
                        cubicleClassname,
                    );

                if (isCorrectEvent) {
                    debouncedAnimationFinishedDispatch();
                }
            };

            window.addEventListener(
                'transitionend',
                sendAnimationFinishedEvents,
            );

            while (true) {
                listenerApi.dispatch(playerActions.nextCommand());

                let state = listenerApi.getState();

                if (!state.player.currentCommand) {
                    listenerApi.dispatch(playerActions.stop());
                    break;
                }

                await listenerApi.condition((action) =>
                    playerActions.animationFinished.match(action),
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

            window.removeEventListener(
                'transitionend',
                sendAnimationFinishedEvents,
            );

            listenerApi.subscribe();
        },
    });
