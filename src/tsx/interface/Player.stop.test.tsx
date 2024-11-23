import { addListener } from '@reduxjs/toolkit';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Success } from 'parsimmon';
import React from 'react';
import { Provider } from 'react-redux';
import { makeNotationParser } from 'src/algorithms/parser';
import { SingleRotationCommand } from 'src/algorithms/rotationCommand';
import { spyOnAction } from 'src/jest-helper';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { playerActions } from 'src/redux/player/playerActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import { AppStore, setupStore } from 'src/redux/store';
import Player from 'src/tsx/interface/Player';

describe('Player stop', () => {
    let store: AppStore;
    let generateRotationCommandsSpy: jest.SpyInstance;
    let animateSingleRotationCommandSpy: jest.SpyInstance;
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

        generateRotationCommandsSpy = spyOnAction(
            playerActions,
            'generateRotationCommands',
        );

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
        generateRotationCommandsSpy.mockRestore();
        animateSingleRotationCommandSpy.mockRestore();
        applyRotationCommandsSpy.mockRestore();
    });

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

    it('should stop when stop is pressed while playing', async () => {
        const notation = 'F U';
        store.dispatch(playerActions.updateNotation(notation));

        render(
            <Provider store={store}>
                <Player />
            </Provider>,
        );

        const play = screen.getByRole('button', {
            name: 'player.input.play',
        });

        const stop = screen.getByRole('button', {
            name: 'player.input.stop',
        });

        const stopWhenAnimationStarts = new Promise((resolve) => {
            store.dispatch(
                addListener({
                    actionCreator: cubeActions.animateSingleRotationCommand,
                    effect: async (_action, listenerApi) => {
                        listenerApi.unsubscribe();
                        fireEvent.click(stop);
                        await listenerApi.delay(25);
                        resolve(true);
                    },
                }),
            );
        });

        fireEvent.click(play);

        expect(stop).toHaveAttribute('aria-disabled', 'false');

        await stopWhenAnimationStarts;

        const state = store.getState();
        expect(state.player.status).toBe(PlayerStatus.STOPPED);

        expect(stop).toHaveAttribute('aria-disabled', 'true');

        const expectCommands = (
            makeNotationParser(3).rotationCommands.parse(notation) as Success<
                SingleRotationCommand[]
            >
        ).value;

        expect(generateRotationCommandsSpy).toHaveBeenCalledTimes(1);
        expect(animateSingleRotationCommandSpy).toHaveBeenCalledTimes(1);
        expect(animateSingleRotationCommandSpy).toHaveBeenCalledWith(
            expectCommands[0],
        );
        expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(1);
    });

    it('should stop when stop is pressed after pause', async () => {
        const notation = 'F U';
        store.dispatch(playerActions.updateNotation(notation));

        render(
            <Provider store={store}>
                <Player />
            </Provider>,
        );

        const play = screen.getByRole('button', {
            name: 'player.input.play',
        });

        const stop = screen.getByRole('button', {
            name: 'player.input.stop',
        });

        const pauseWhenAnimationStartsThenStop = new Promise((resolve) => {
            store.dispatch(
                addListener({
                    actionCreator: cubeActions.animateSingleRotationCommand,
                    effect: async (_action, listenerApi) => {
                        listenerApi.unsubscribe();
                        await act(() =>
                            listenerApi.dispatch(playerActions.pause()),
                        );
                        await listenerApi.delay(25);
                        fireEvent.click(stop);
                        await listenerApi.delay(25);
                        resolve(true);
                    },
                }),
            );
        });

        fireEvent.click(play);

        expect(stop).toHaveAttribute('aria-disabled', 'false');

        await pauseWhenAnimationStartsThenStop;

        const state = store.getState();
        expect(state.player.status).toBe(PlayerStatus.STOPPED);

        expect(stop).toHaveAttribute('aria-disabled', 'true');

        const expectCommands = (
            makeNotationParser(3).rotationCommands.parse(notation) as Success<
                SingleRotationCommand[]
            >
        ).value;

        expect(generateRotationCommandsSpy).toHaveBeenCalledTimes(1);
        expect(animateSingleRotationCommandSpy).toHaveBeenCalledTimes(1);
        expect(animateSingleRotationCommandSpy).toHaveBeenCalledWith(
            expectCommands[0],
        );
        expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(1);
    });
});
