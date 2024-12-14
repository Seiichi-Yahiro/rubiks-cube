import { addListener } from '@reduxjs/toolkit';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Success } from 'parsimmon';
import React from 'react';
import { Provider } from 'react-redux';
import {
    RotationAxis,
    RotationCommand,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { Direction, playerActions } from 'src/redux/player/playerActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import { AppStore, setupStore } from 'src/redux/store';
import { delay, spyOnAction } from 'src/test-helper';
import { TooltipProvider } from 'src/tsx/components/Tooltip';
import Player from 'src/tsx/player/Player';
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    type MockInstance,
} from 'vitest';

describe('Player skip', () => {
    let store: AppStore;
    let skipRemainingSpy: MockInstance;
    let animateSingleRotationCommandSpy: MockInstance;
    let applyRotationCommandsSpy: MockInstance;

    beforeEach(() => {
        store = setupStore();

        store.dispatch(playerActions.setAnimationLoopDelay(0));

        store.dispatch(
            addListener({
                actionCreator: cubeActions.animateSingleRotationCommand,
                effect: async (_action, listenerApi) => {
                    await listenerApi.delay(50);
                    listenerApi.dispatch(cubeActions.animationFinished());
                },
            }),
        );

        skipRemainingSpy = spyOnAction(playerActions, 'skipRemaining');

        animateSingleRotationCommandSpy = spyOnAction(
            cubeActions,
            'animateSingleRotationCommand',
        );

        applyRotationCommandsSpy = spyOnAction(
            cubeActions,
            'applyRotationCommands',
        );
    });

    afterEach(() => {
        cleanup();
        skipRemainingSpy.mockRestore();
        animateSingleRotationCommandSpy.mockRestore();
        applyRotationCommandsSpy.mockRestore();
    });

    const expectNotAllowSkip = async () => {
        render(
            <Provider store={store}>
                <TooltipProvider>
                    <Player />
                </TooltipProvider>
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

    it('should not allow skip remaining steps forwards when step forward is being animated', async () => {
        store.dispatch(playerActions.updateNotation('F U R'));

        render(
            <Provider store={store}>
                <TooltipProvider>
                    <Player />
                </TooltipProvider>
            </Provider>,
        );

        const nextStep = screen.getByRole('button', {
            name: 'player.input.stepNext',
        });

        fireEvent.click(nextStep);
        await delay(25);

        const skip = await screen.findByRole('button', {
            name: 'player.input.skipRemainingToEnd',
        });

        expect(skip).toHaveAttribute('aria-disabled', 'true');

        fireEvent.click(skip);
        await delay(25);

        expect(skipRemainingSpy).toHaveBeenCalledTimes(0);
        expect(skip).toHaveAttribute('aria-disabled', 'false');
    });

    it('should not allow skip remaining steps forwards when step backward is being animated', async () => {
        store.dispatch(playerActions.updateNotation('F U R'));
        store.dispatch(playerActions.nextStep(Direction.Forwards));

        render(
            <Provider store={store}>
                <TooltipProvider>
                    <Player />
                </TooltipProvider>
            </Provider>,
        );

        const nextStepBack = screen.getByRole('button', {
            name: 'player.input.stepPrevious',
        });

        fireEvent.click(nextStepBack);
        await delay(25);

        const skip = await screen.findByRole('button', {
            name: 'player.input.skipRemainingToEnd',
        });

        expect(skip).toHaveAttribute('aria-disabled', 'true');

        fireEvent.click(skip);
        await delay(25);

        expect(skipRemainingSpy).toHaveBeenCalledTimes(0);
        expect(skip).toHaveAttribute('aria-disabled', 'false');
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

        animateSingleRotationCommandSpy.mockClear();

        render(
            <Provider store={store}>
                <TooltipProvider>
                    <Player />
                </TooltipProvider>
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
        expect(stateAfter.cube.cubicles).not.toBe(stateBefore.cube.cubicles);

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

        expect(animateSingleRotationCommandSpy).toHaveBeenCalledTimes(0);
    });

    it('should not allow skip remaining steps backwards when step forward is being animated', async () => {
        store.dispatch(playerActions.updateNotation('F U R'));
        store.dispatch(playerActions.nextStep(Direction.Forwards));
        await delay(75);

        skipRemainingSpy.mockClear();

        render(
            <Provider store={store}>
                <TooltipProvider>
                    <Player />
                </TooltipProvider>
            </Provider>,
        );

        const nextStep = screen.getByRole('button', {
            name: 'player.input.stepNext',
        });

        fireEvent.click(nextStep);
        await delay(25);

        const skip = await screen.findByRole('button', {
            name: 'player.input.skipRemainingToStart',
        });

        expect(skip).toHaveAttribute('aria-disabled', 'true');

        fireEvent.click(skip);
        await delay(25);

        expect(skipRemainingSpy).toHaveBeenCalledTimes(0);
        expect(skip).toHaveAttribute('aria-disabled', 'false');
    });

    it('should not allow skip remaining steps backwards when step backward is being animated', async () => {
        store.dispatch(playerActions.updateNotation('F U R'));

        store.dispatch(playerActions.nextStep(Direction.Forwards));
        await delay(75);

        store.dispatch(playerActions.nextStep(Direction.Forwards));
        await delay(75);

        render(
            <Provider store={store}>
                <TooltipProvider>
                    <Player />
                </TooltipProvider>
            </Provider>,
        );

        const nextStepBack = screen.getByRole('button', {
            name: 'player.input.stepPrevious',
        });

        fireEvent.click(nextStepBack);
        await delay(25);

        const skip = await screen.findByRole('button', {
            name: 'player.input.skipRemainingToStart',
        });

        expect(skip).toHaveAttribute('aria-disabled', 'true');

        fireEvent.click(skip);
        await delay(25);

        expect(skipRemainingSpy).toHaveBeenCalledTimes(0);
        expect(skip).toHaveAttribute('aria-disabled', 'false');
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

        animateSingleRotationCommandSpy.mockClear();

        render(
            <Provider store={store}>
                <TooltipProvider>
                    <Player />
                </TooltipProvider>
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
        expect(stateAfter.cube.cubicles).not.toBe(stateBefore.cube.cubicles);
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

        expect(animateSingleRotationCommandSpy).toHaveBeenCalledTimes(0);
    });

    describe('skip to start / end', () => {
        const testSkip = async (
            buttonName: string,
            remainingRotationCommands: RotationCommand[],
        ) => {
            store.dispatch(playerActions.updateNotation('F U R'));

            render(
                <Provider store={store}>
                    <TooltipProvider>
                        <Player />
                    </TooltipProvider>
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

            await testSkip('player.input.skipToEnd', remainingRotationCommands);
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
