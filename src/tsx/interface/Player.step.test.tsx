import { addListener } from '@reduxjs/toolkit';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { Direction, playerActions } from 'src/redux/player/playerActions';
import { type AppStore, setupStore } from 'src/redux/store';
import { delay, spyOnAction } from 'src/test-helper';
import Player from 'src/tsx/interface/Player';
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    type MockInstance,
} from 'vitest';

describe('Player step', () => {
    let store: AppStore;
    let nextStepSpy: MockInstance;
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

        nextStepSpy = spyOnAction(playerActions, 'nextStep');

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
        nextStepSpy.mockRestore();
        animateSingleRotationCommandSpy.mockRestore();
        applyRotationCommandsSpy.mockRestore();
    });

    it('should not allow step forward when step forward is being animated', async () => {
        store.dispatch(playerActions.updateNotation('F U R'));

        render(
            <Provider store={store}>
                <Player />
            </Provider>,
        );

        const nextStep = screen.getByRole('button', {
            name: 'player.input.stepNext',
        });

        fireEvent.click(nextStep);
        await delay(25);

        expect(nextStep).toHaveAttribute('aria-disabled', 'true');

        fireEvent.click(nextStep);
        await delay(25);

        expect(nextStepSpy).toHaveBeenCalledTimes(1);
        expect(nextStepSpy).toHaveBeenCalledWith(Direction.Forwards);
        expect(nextStep).toHaveAttribute('aria-disabled', 'false');
    });

    it('should not allow step backward when step forward is being animated', async () => {
        store.dispatch(playerActions.updateNotation('F U R'));
        store.dispatch(playerActions.nextStep(Direction.Forwards));

        await delay(75);
        nextStepSpy.mockClear();

        render(
            <Provider store={store}>
                <Player />
            </Provider>,
        );

        const nextStep = screen.getByRole('button', {
            name: 'player.input.stepNext',
        });

        const nextStepBack = screen.getByRole('button', {
            name: 'player.input.stepPrevious',
        });

        fireEvent.click(nextStep);
        await delay(25);

        expect(nextStepBack).toHaveAttribute('aria-disabled', 'true');

        fireEvent.click(nextStepBack);
        await delay(25);

        expect(nextStepSpy).toHaveBeenCalledTimes(1);
        expect(nextStepSpy).toHaveBeenCalledWith(Direction.Forwards);
        expect(nextStepBack).toHaveAttribute('aria-disabled', 'false');
    });

    it('should not allow step forward when step backwards is being animated', async () => {
        store.dispatch(playerActions.updateNotation('F U R'));
        store.dispatch(playerActions.nextStep(Direction.Forwards));

        await delay(75);

        nextStepSpy.mockClear();

        render(
            <Provider store={store}>
                <Player />
            </Provider>,
        );

        const nextStepBack = screen.getByRole('button', {
            name: 'player.input.stepPrevious',
        });

        const nextStep = screen.getByRole('button', {
            name: 'player.input.stepNext',
        });

        fireEvent.click(nextStepBack);
        await delay(25);

        expect(nextStep).toHaveAttribute('aria-disabled', 'true');

        fireEvent.click(nextStepBack);
        await delay(50);

        expect(nextStepSpy).toHaveBeenCalledTimes(1);
        expect(nextStepSpy).toHaveBeenCalledWith(Direction.Backwards);
        expect(nextStep).toHaveAttribute('aria-disabled', 'false');
    });

    it('should not allow step backward when step backwards is being animated', async () => {
        store.dispatch(playerActions.updateNotation('F U R'));

        store.dispatch(playerActions.nextStep(Direction.Forwards));
        await delay(75);

        store.dispatch(playerActions.nextStep(Direction.Forwards));
        await delay(75);

        nextStepSpy.mockClear();

        render(
            <Provider store={store}>
                <Player />
            </Provider>,
        );

        const nextStepBack = screen.getByRole('button', {
            name: 'player.input.stepPrevious',
        });

        fireEvent.click(nextStepBack);
        await delay(25);

        expect(nextStepBack).toHaveAttribute('aria-disabled', 'true');

        fireEvent.click(nextStepBack);
        await delay(50);

        expect(nextStepSpy).toHaveBeenCalledTimes(1);
        expect(nextStepSpy).toHaveBeenCalledWith(Direction.Backwards);
        expect(nextStepBack).toHaveAttribute('aria-disabled', 'false');
    });
});
