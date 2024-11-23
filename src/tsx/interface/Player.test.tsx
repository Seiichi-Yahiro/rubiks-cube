import { addListener } from '@reduxjs/toolkit';
import { waitFor } from '@testing-library/dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Success } from 'parsimmon';
import React from 'react';
import { Provider } from 'react-redux';
import {
    RotationAxis,
    RotationCommand,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { playerActions } from 'src/redux/player/playerActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import { AppStore, setupStore } from 'src/redux/store';
import Player from 'src/tsx/interface/Player';
import { makeNotationParser } from '../../algorithms/parser';

describe('Player', () => {
    const spyOnPlayerAction = (
        actions: typeof playerActions,
        action: keyof typeof playerActions,
    ) => {
        const t = actions[action].type;
        const match = actions[action].match;
        const spy = jest.spyOn(actions, action);
        actions[action].type = t;
        actions[action].match = match;
        return spy;
    };

    const spyOnCubeAction = (
        actions: typeof cubeActions,
        action: keyof typeof cubeActions,
    ) => {
        const t = actions[action].type;
        const match = actions[action].match;
        const spy = jest.spyOn(actions, action);
        actions[action].type = t;
        actions[action].match = match;
        return spy;
    };

    describe('NotationInput', () => {
        it('should parse the notation when the notation changes', () => {
            const store = setupStore();

            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const textField = screen.getByLabelText('player.input.algorithm');

            expect(textField).toBeInTheDocument();

            fireEvent.change(textField!, { target: { value: 'F U R' } });

            const state = store.getState();

            expect(state.player.rotationCommands.status).toBe(true);
            expect(
                (state.player.rotationCommands as Success<RotationCommand[]>)
                    .value.length,
            ).toBe(3);
        });
    });

    describe('play', () => {
        let store: AppStore;

        beforeEach(() => {
            store = setupStore();
        });

        const expectDisabledPlay = async () => {
            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const stateBefore = store.getState();

            let play = screen.getByRole('button', {
                name: 'player.input.play',
            });
            expect(play).toHaveAttribute('aria-disabled', 'true');

            fireEvent.click(play);

            play = await screen.findByRole('button', {
                name: 'player.input.play',
            });
            expect(play).toHaveAttribute('aria-disabled', 'true');

            const stateAfter = store.getState();

            expect(stateAfter.player.status).toBe(PlayerStatus.STOPPED);
            expect(stateAfter.cube.cubicles).toBe(stateBefore.cube.cubicles);
        };

        it('should not allow when no notation', async () => {
            store.dispatch(playerActions.updateNotation(''));
            await expectDisabledPlay();
        });

        it('should not allow when invalid notation', async () => {
            store.dispatch(playerActions.updateNotation('F A R'));
            await expectDisabledPlay();
        });

        const expectAllowPlay = () => {
            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const play = screen.getByRole('button', {
                name: 'player.input.play',
            });
            expect(play).toHaveAttribute('aria-disabled', 'false');

            fireEvent.click(play);

            const state = store.getState();
            expect(state.player.status).toBe(PlayerStatus.PLAYING);
        };

        it('should allow play when notation valid', async () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            expectAllowPlay();
        });

        it('should allow play when paused', async () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            store.dispatch(
                playerActions.play(
                    (
                        store.getState().player.rotationCommands as Success<
                            RotationCommand[]
                        >
                    ).value,
                ),
            );
            store.dispatch(playerActions.pause());

            expectAllowPlay();
        });

        it('should not have play when playing', async () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            store.dispatch(
                playerActions.play(
                    (
                        store.getState().player.rotationCommands as Success<
                            RotationCommand[]
                        >
                    ).value,
                ),
            );

            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const play = screen.queryByRole('button', {
                name: 'player.input.play',
            });

            expect(play).not.toBeInTheDocument();
        });
    });

    describe('skip', () => {
        let store: AppStore;
        let animationSingleRotationCommandSpy: jest.SpyInstance;
        let applyRotationCommandsSpy: jest.SpyInstance;

        beforeEach(() => {
            store = setupStore();

            store.dispatch(playerActions.setAnimationLoopDelay(0));

            store.dispatch(
                addListener({
                    actionCreator: cubeActions.animateSingleRotationCommand,
                    effect: async (_action, listenerApi) => {
                        await listenerApi.delay(0);
                        listenerApi.dispatch(cubeActions.animationFinished());
                    },
                }),
            );

            animationSingleRotationCommandSpy = spyOnCubeAction(
                cubeActions,
                'animateSingleRotationCommand',
            );

            applyRotationCommandsSpy = spyOnCubeAction(
                cubeActions,
                'applyRotationCommands',
            );
        });

        afterEach(() => {
            animationSingleRotationCommandSpy.mockRestore();
            applyRotationCommandsSpy.mockRestore();
        });

        const expectNotAllowSkip = async () => {
            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const stateBefore = store.getState();

            let skip = screen.getByRole('button', {
                name: /player\.input\.skip(?:Remaining)?ToEnd/,
            });
            expect(skip).toHaveAttribute('aria-disabled', 'true');

            fireEvent.click(skip);

            skip = await screen.findByRole('button', {
                name: /player\.input\.skip(?:Remaining)?ToEnd/,
            });
            expect(skip).toHaveAttribute('aria-disabled', 'true');

            const stateAfter = store.getState();

            expect(stateAfter.player.status).toBe(stateBefore.player.status);
            expect(stateAfter.cube.cubicles).toBe(stateBefore.cube.cubicles);
        };

        it('should not allow skip when no notation', async () => {
            store.dispatch(playerActions.updateNotation(''));
            await expectNotAllowSkip();
        });

        it('should not allow skip when invalid notation', async () => {
            store.dispatch(playerActions.updateNotation('F A R'));
            await expectNotAllowSkip();
        });

        it('should not allow skip when playing', async () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            store.dispatch(
                playerActions.play(
                    (
                        store.getState().player.rotationCommands as Success<
                            RotationCommand[]
                        >
                    ).value,
                ),
            );

            await expectNotAllowSkip();
        });

        it('should skip remaining steps forwards when paused', async () => {
            store.dispatch(playerActions.updateNotation('F U R'));

            const pauseWhenAnimationStarts = new Promise((resolve) => {
                store.dispatch(
                    addListener({
                        actionCreator: cubeActions.animateSingleRotationCommand,
                        effect: async (_action, listenerApi) => {
                            listenerApi.unsubscribe();
                            store.dispatch(playerActions.pause());
                            await listenerApi.delay(50);
                            resolve(true);
                        },
                    }),
                );
            });

            store.dispatch(
                playerActions.play(
                    (
                        store.getState().player.rotationCommands as Success<
                            RotationCommand[]
                        >
                    ).value,
                ),
            );

            await pauseWhenAnimationStarts;

            animationSingleRotationCommandSpy.mockClear();

            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const stateBefore = store.getState();

            const skip: HTMLElement | null = screen.getByRole('button', {
                name: 'player.input.skipRemainingToEnd',
            });
            expect(skip).toHaveAttribute('aria-disabled', 'false');

            fireEvent.click(skip);

            await new Promise((resolve) => {
                store.dispatch(
                    addListener({
                        actionCreator: cubeActions.applyRotationCommands,
                        effect: async (_action, listenerApi) => {
                            listenerApi.unsubscribe();
                            await listenerApi.delay(50);
                            resolve(true);
                        },
                    }),
                );
            });

            //expect(skip).toHaveAttribute('aria-disabled', 'true'); // TODO enable again when properly implemented

            const stateAfter = store.getState();

            expect(stateAfter.player.status).toBe(PlayerStatus.PAUSED);
            expect(stateAfter.cube.cubicles).not.toBe(
                stateBefore.cube.cubicles,
            );

            const remainingRotationCommands: SingleRotationCommand[] = [
                {
                    axis: RotationAxis.Y,
                    rotation: -90,
                    slices: [1],
                },
                {
                    axis: RotationAxis.X,
                    rotation: 90,
                    slices: [3],
                },
            ];
            expect(applyRotationCommandsSpy).toHaveBeenCalledWith(
                remainingRotationCommands,
            );

            expect(animationSingleRotationCommandSpy).toHaveBeenCalledTimes(0);
        });

        it('should skip remaining steps backwards when paused', async () => {
            store.dispatch(playerActions.updateNotation('F U R'));

            const originalState = store.getState();

            const pauseAfterTwoCommands = new Promise((resolve) => {
                let counter = 0;

                store.dispatch(
                    addListener({
                        actionCreator: cubeActions.animateSingleRotationCommand,
                        effect: async (_action, listenerApi) => {
                            counter += 1;

                            if (counter === 2) {
                                listenerApi.unsubscribe();
                                store.dispatch(playerActions.pause());
                                await listenerApi.delay(50);
                                resolve(true);
                            }
                        },
                    }),
                );
            });

            store.dispatch(
                playerActions.play(
                    (
                        store.getState().player.rotationCommands as Success<
                            RotationCommand[]
                        >
                    ).value,
                ),
            );

            await pauseAfterTwoCommands;

            animationSingleRotationCommandSpy.mockClear();

            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const stateBefore = store.getState();

            const skip: HTMLElement | null = screen.getByRole('button', {
                name: 'player.input.skipRemainingToStart',
            });
            expect(skip).toHaveAttribute('aria-disabled', 'false');

            fireEvent.click(skip);

            await new Promise((resolve) => {
                store.dispatch(
                    addListener({
                        actionCreator: cubeActions.applyRotationCommands,
                        effect: async (_action, listenerApi) => {
                            listenerApi.unsubscribe();
                            await listenerApi.delay(50);
                            resolve(true);
                        },
                    }),
                );
            });

            //expect(skip).toHaveAttribute('aria-disabled', 'true'); // TODO enable again when properly implemented

            const stateAfter = store.getState();

            expect(stateAfter.player.status).toBe(PlayerStatus.PAUSED);
            expect(stateAfter.cube.cubicles).not.toBe(
                stateBefore.cube.cubicles,
            );
            expect(stateAfter.cube.cubicles).toStrictEqual(
                originalState.cube.cubicles,
            );

            const remainingRotationCommands: SingleRotationCommand[] = [
                {
                    axis: RotationAxis.Y,
                    rotation: 90,
                    slices: [1],
                },
                {
                    axis: RotationAxis.Z,
                    rotation: -90,
                    slices: [1],
                },
            ];
            expect(applyRotationCommandsSpy).toHaveBeenCalledWith(
                remainingRotationCommands,
            );

            expect(animationSingleRotationCommandSpy).toHaveBeenCalledTimes(0);
        });

        describe('skip to start / end', () => {
            const testSkip = async (
                buttonName: string,
                remainingRotationCommands: RotationCommand[],
            ) => {
                store.dispatch(playerActions.updateNotation('F U R'));

                render(
                    <Provider store={store}>
                        <Player />
                    </Provider>,
                );

                const stateBefore = store.getState();

                let skip: HTMLElement | null = screen.getByRole('button', {
                    name: buttonName,
                });
                expect(skip).toHaveAttribute('aria-disabled', 'false');

                fireEvent.click(skip);

                skip = await screen.findByRole('button', {
                    name: buttonName,
                });
                expect(skip).toHaveAttribute('aria-disabled', 'false');

                const stateAfter = store.getState();

                expect(stateAfter.player.status).toBe(PlayerStatus.STOPPED);
                expect(stateAfter.cube.cubicles).not.toBe(
                    stateBefore.cube.cubicles,
                );

                expect(applyRotationCommandsSpy).toHaveBeenCalledWith(
                    remainingRotationCommands,
                );
            };

            it('should skip to end when valid notation', async () => {
                const remainingRotationCommands: SingleRotationCommand[] = [
                    {
                        axis: RotationAxis.Z,
                        rotation: 90,
                        slices: [1],
                    },
                    {
                        axis: RotationAxis.Y,
                        rotation: -90,
                        slices: [1],
                    },
                    {
                        axis: RotationAxis.X,
                        rotation: 90,
                        slices: [3],
                    },
                ];

                await testSkip(
                    'player.input.skipToEnd',
                    remainingRotationCommands,
                );
            });

            it('should skip to start when valid notation', async () => {
                const remainingRotationCommands: SingleRotationCommand[] = [
                    {
                        axis: RotationAxis.X,
                        rotation: -90,
                        slices: [3],
                    },
                    {
                        axis: RotationAxis.Y,
                        rotation: 90,
                        slices: [1],
                    },
                    {
                        axis: RotationAxis.Z,
                        rotation: -90,
                        slices: [1],
                    },
                ];

                await testSkip(
                    'player.input.skipToStart',
                    remainingRotationCommands,
                );
            });
        });
    });

    describe('stop', () => {
        let store: AppStore;

        beforeEach(() => {
            store = setupStore();
        });

        const expectStop = () => {
            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const stop = screen.getByRole('button', {
                name: 'player.input.stop',
            });
            expect(stop).toHaveAttribute('aria-disabled', 'false');

            fireEvent.click(stop);

            const stateAfter = store.getState();

            expect(stateAfter.player.status).toBe(PlayerStatus.STOPPED);
        };

        it('should not allow stop when stopped', async () => {
            store.dispatch(playerActions.stop());

            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const stateBefore = store.getState();

            let stop = screen.getByRole('button', {
                name: 'player.input.stop',
            });
            expect(stop).toHaveAttribute('aria-disabled', 'true');

            fireEvent.click(stop);

            stop = await screen.findByRole('button', {
                name: 'player.input.stop',
            });
            expect(stop).toHaveAttribute('aria-disabled', 'true');

            const stateAfter = store.getState();

            expect(stateAfter.player.status).toBe(PlayerStatus.STOPPED);
            expect(stateAfter.cube.cubicles).toBe(stateBefore.cube.cubicles);
        });

        it('should stop when playing', async () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            store.dispatch(
                playerActions.play(
                    (
                        store.getState().player.rotationCommands as Success<
                            RotationCommand[]
                        >
                    ).value,
                ),
            );

            expectStop();
        });

        it('should stop when paused', async () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            store.dispatch(
                playerActions.play(
                    (
                        store.getState().player.rotationCommands as Success<
                            RotationCommand[]
                        >
                    ).value,
                ),
            );
            store.dispatch(playerActions.pause());

            expectStop();
        });
    });

    describe('pause', () => {
        let store: AppStore;

        beforeEach(() => {
            store = setupStore();
        });

        const expectNoPauseButton = () => {
            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const pause = screen.queryByRole('button', {
                name: 'player.input.pause',
            });

            expect(pause).not.toBeInTheDocument();
        };

        it('should not have pause button when stopped', () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            store.dispatch(playerActions.stop());

            expectNoPauseButton();
        });

        it('should pause when playing', () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            store.dispatch(
                playerActions.play(
                    (
                        store.getState().player.rotationCommands as Success<
                            RotationCommand[]
                        >
                    ).value,
                ),
            );

            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const pause = screen.getByRole('button', {
                name: 'player.input.pause',
            });

            expect(pause).toHaveAttribute('aria-disabled', 'false');

            fireEvent.click(pause);

            const stateAfter = store.getState();

            expect(stateAfter.player.status).toBe(PlayerStatus.PAUSED);
        });

        it('should not have pause button when paused', () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            store.dispatch(
                playerActions.play(
                    (
                        store.getState().player.rotationCommands as Success<
                            RotationCommand[]
                        >
                    ).value,
                ),
            );
            store.dispatch(playerActions.pause());

            expectNoPauseButton();
        });
    });

    describe('shuffle', () => {
        let store: AppStore;

        beforeEach(() => {
            store = setupStore();
        });

        const expectNotAllowShuffle = () => {
            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const stateBefore = store.getState();

            const shuffle = screen.getByRole('button', {
                name: 'player.input.shuffle',
            });

            expect(shuffle).toHaveAttribute('aria-disabled', 'true');

            fireEvent.click(shuffle);

            const stateAfter = store.getState();

            expect(stateAfter.player.notation).toBe(
                stateBefore.player.notation,
            );
        };

        it('should not allow shuffle when playing', () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            store.dispatch(
                playerActions.play(
                    (
                        store.getState().player.rotationCommands as Success<
                            RotationCommand[]
                        >
                    ).value,
                ),
            );

            expectNotAllowShuffle();
        });

        it('should not allow shuffle when paused', () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            store.dispatch(
                playerActions.play(
                    (
                        store.getState().player.rotationCommands as Success<
                            RotationCommand[]
                        >
                    ).value,
                ),
            );
            store.dispatch(playerActions.pause());

            expectNotAllowShuffle();
        });

        it('should shuffle the notation', () => {
            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const stateBefore = store.getState();

            const shuffle = screen.getByRole('button', {
                name: 'player.input.shuffle',
            });

            expect(shuffle).toHaveAttribute('aria-disabled', 'false');

            fireEvent.click(shuffle);

            const stateAfter = store.getState();

            expect(stateAfter.player.notation).not.toBe(
                stateBefore.player.notation,
            );
        });
    });

    describe('reset', () => {
        let store: AppStore;

        beforeEach(() => {
            store = setupStore();
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        const expectNotAllowReset = () => {
            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const stateBefore = store.getState();

            const reset = screen.getByRole('button', {
                name: 'player.input.reset',
            });

            expect(reset).toHaveAttribute('aria-disabled', 'true');

            fireEvent.click(reset);

            const stateAfter = store.getState();

            expect(stateAfter.cube.cubicles).toBe(stateBefore.cube.cubicles);
        };

        it('should not allow reset when playing', async () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            store.dispatch(
                playerActions.play(
                    (
                        store.getState().player.rotationCommands as Success<
                            RotationCommand[]
                        >
                    ).value,
                ),
            );

            await jest.advanceTimersByTimeAsync(1000);
            store.dispatch(cubeActions.animationFinished());

            await jest.advanceTimersByTimeAsync(50);

            expectNotAllowReset();
        });

        it('should not allow reset when paused', async () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            store.dispatch(
                playerActions.play(
                    (
                        store.getState().player.rotationCommands as Success<
                            RotationCommand[]
                        >
                    ).value,
                ),
            );

            await jest.advanceTimersByTimeAsync(1000);
            store.dispatch(cubeActions.animationFinished());

            await jest.advanceTimersByTimeAsync(50);
            store.dispatch(playerActions.pause());

            expectNotAllowReset();
        });

        it('should reset the cube', async () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            store.dispatch(
                playerActions.play(
                    (
                        store.getState().player.rotationCommands as Success<
                            RotationCommand[]
                        >
                    ).value,
                ),
            );

            await jest.advanceTimersByTimeAsync(1000);
            store.dispatch(cubeActions.animationFinished());

            await jest.advanceTimersByTimeAsync(50);
            store.dispatch(playerActions.stop());

            render(
                <Provider store={store}>
                    <Player />
                </Provider>,
            );

            const stateBefore = store.getState();

            const reset = screen.getByRole('button', {
                name: 'player.input.reset',
            });

            expect(reset).toHaveAttribute('aria-disabled', 'false');

            fireEvent.click(reset);

            const stateAfter = store.getState();

            expect(stateAfter.cube.cubicles).not.toBe(
                stateBefore.cube.cubicles,
            );
        });
    });

    describe('user flows', () => {
        const expectCommands = (
            makeNotationParser(3).rotationCommands.parse('F U R') as Success<
                SingleRotationCommand[]
            >
        ).value;

        describe('playAnimationLoopListener', () => {
            let store: AppStore;
            let generateRotationCommandsSpy: jest.SpyInstance;
            let animationSingleRotationCommandSpy: jest.SpyInstance;
            let applyRotationCommandsSpy: jest.SpyInstance;

            beforeEach(() => {
                store = setupStore();

                store.dispatch(playerActions.setAnimationLoopDelay(0));

                store.dispatch(
                    addListener({
                        actionCreator: cubeActions.animateSingleRotationCommand,
                        effect: async (_action, listenerApi) => {
                            await listenerApi.delay(0);
                            listenerApi.dispatch(
                                cubeActions.animationFinished(),
                            );
                        },
                    }),
                );

                generateRotationCommandsSpy = spyOnPlayerAction(
                    playerActions,
                    'generateRotationCommands',
                );

                animationSingleRotationCommandSpy = spyOnCubeAction(
                    cubeActions,
                    'animateSingleRotationCommand',
                );

                applyRotationCommandsSpy = spyOnCubeAction(
                    cubeActions,
                    'applyRotationCommands',
                );
            });

            afterEach(() => {
                generateRotationCommandsSpy.mockRestore();
                animationSingleRotationCommandSpy.mockRestore();
                applyRotationCommandsSpy.mockRestore();
            });

            it('should stop when all commands are run', async () => {
                store.dispatch(playerActions.updateNotation('F U'));
                store.dispatch(
                    playerActions.play(
                        (
                            store.getState().player.rotationCommands as Success<
                                RotationCommand[]
                            >
                        ).value,
                    ),
                );

                const state = store.getState();
                expect(state.player.status).toBe(PlayerStatus.PLAYING);

                await waitFor(() => {
                    expect(store.getState().player.status).toBe(
                        PlayerStatus.STOPPED,
                    );
                });

                expect(generateRotationCommandsSpy).toHaveBeenCalledTimes(3);
                expect(animationSingleRotationCommandSpy).toHaveBeenCalledTimes(
                    2,
                );
                expect(animationSingleRotationCommandSpy).toHaveBeenCalledWith(
                    expectCommands[0],
                );
                expect(animationSingleRotationCommandSpy).toHaveBeenCalledWith(
                    expectCommands[1],
                );
                expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(2);
            });

            it('should stop when stop is pressed', async () => {
                store.dispatch(playerActions.updateNotation('F U'));

                const stopWhenAnimationStarts = new Promise((resolve) => {
                    store.dispatch(
                        addListener({
                            actionCreator:
                                cubeActions.animateSingleRotationCommand,
                            effect: async (_action, listenerApi) => {
                                listenerApi.unsubscribe();
                                store.dispatch(playerActions.stop());
                                await listenerApi.delay(50);
                                resolve(true);
                            },
                        }),
                    );
                });

                store.dispatch(
                    playerActions.play(
                        (
                            store.getState().player.rotationCommands as Success<
                                RotationCommand[]
                            >
                        ).value,
                    ),
                );

                await stopWhenAnimationStarts;

                const state = store.getState();
                expect(state.player.status).toBe(PlayerStatus.STOPPED);

                expect(generateRotationCommandsSpy).toHaveBeenCalledTimes(1);
                expect(animationSingleRotationCommandSpy).toHaveBeenCalledTimes(
                    1,
                );
                expect(animationSingleRotationCommandSpy).toHaveBeenCalledWith(
                    expectCommands[0],
                );
                expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(1);
            });

            it('should pause', async () => {
                store.dispatch(playerActions.updateNotation('F U'));

                const pauseWhenAnimationStarts = new Promise((resolve) => {
                    store.dispatch(
                        addListener({
                            actionCreator:
                                cubeActions.animateSingleRotationCommand,
                            effect: async (_action, listenerApi) => {
                                listenerApi.unsubscribe();
                                store.dispatch(playerActions.pause());
                                await listenerApi.delay(50);
                                resolve(true);
                            },
                        }),
                    );
                });

                store.dispatch(
                    playerActions.play(
                        (
                            store.getState().player.rotationCommands as Success<
                                RotationCommand[]
                            >
                        ).value,
                    ),
                );

                await pauseWhenAnimationStarts;

                const state = store.getState();
                expect(state.player.status).toBe(PlayerStatus.PAUSED);

                expect(generateRotationCommandsSpy).toHaveBeenCalledTimes(1);
                expect(animationSingleRotationCommandSpy).toHaveBeenCalledTimes(
                    1,
                );
                expect(animationSingleRotationCommandSpy).toHaveBeenCalledWith(
                    expectCommands[0],
                );
                expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(1);
            });

            it('should stop when stop is pressed after pause', async () => {
                store.dispatch(playerActions.updateNotation('F U'));

                const pauseWhenAnimationStartsThenStop = new Promise(
                    (resolve) => {
                        store.dispatch(
                            addListener({
                                actionCreator:
                                    cubeActions.animateSingleRotationCommand,
                                effect: async (_action, listenerApi) => {
                                    listenerApi.unsubscribe();
                                    store.dispatch(playerActions.pause());
                                    await listenerApi.delay(25);
                                    store.dispatch(playerActions.stop());
                                    await listenerApi.delay(25);
                                    resolve(true);
                                },
                            }),
                        );
                    },
                );

                store.dispatch(
                    playerActions.play(
                        (
                            store.getState().player.rotationCommands as Success<
                                RotationCommand[]
                            >
                        ).value,
                    ),
                );

                await pauseWhenAnimationStartsThenStop;

                const state = store.getState();
                expect(state.player.status).toBe(PlayerStatus.STOPPED);

                expect(generateRotationCommandsSpy).toHaveBeenCalledTimes(1);
                expect(animationSingleRotationCommandSpy).toHaveBeenCalledTimes(
                    1,
                );
                expect(animationSingleRotationCommandSpy).toHaveBeenCalledWith(
                    expectCommands[0],
                );
                expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(1);
            });

            it('should resume after unpause', async () => {
                store.dispatch(playerActions.updateNotation('F U'));

                const pauseWhenAnimationStartsThenResume = new Promise(
                    (resolve) => {
                        store.dispatch(
                            addListener({
                                actionCreator:
                                    cubeActions.animateSingleRotationCommand,
                                effect: async (_action, listenerApi) => {
                                    listenerApi.unsubscribe();
                                    store.dispatch(playerActions.pause());
                                    await listenerApi.delay(50);
                                    store.dispatch(playerActions.resume());
                                    await listenerApi.delay(50);
                                    resolve(true);
                                },
                            }),
                        );
                    },
                );

                store.dispatch(
                    playerActions.play(
                        (
                            store.getState().player.rotationCommands as Success<
                                RotationCommand[]
                            >
                        ).value,
                    ),
                );

                await pauseWhenAnimationStartsThenResume;

                const state = store.getState();
                expect(state.player.status).toBe(PlayerStatus.STOPPED);

                expect(generateRotationCommandsSpy).toHaveBeenCalledTimes(3);
                expect(animationSingleRotationCommandSpy).toHaveBeenCalledTimes(
                    2,
                );
                expect(animationSingleRotationCommandSpy).toHaveBeenCalledWith(
                    expectCommands[0],
                );
                expect(animationSingleRotationCommandSpy).toHaveBeenCalledWith(
                    expectCommands[1],
                );
                expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(2);
            });
        });
    });
});
