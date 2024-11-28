import { addListener } from '@reduxjs/toolkit';
import {
    act,
    cleanup,
    fireEvent,
    render,
    screen,
} from '@testing-library/react';
import { Success } from 'parsimmon';
import React from 'react';
import { Provider } from 'react-redux';
import { makeNotationParser } from 'src/algorithms/parser';
import {
    RotationCommand,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { playerActions } from 'src/redux/player/playerActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import { AppStore, setupStore } from 'src/redux/store';
import { spyOnAction } from 'src/test-helper';
import Player from 'src/tsx/interface/Player';
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    type MockInstance,
} from 'vitest';

describe('Player play', () => {
    let store: AppStore;
    let generateRotationCommandsSpy: MockInstance;
    let animateSingleRotationCommandSpy: MockInstance;
    let applyRotationCommandsSpy: MockInstance;

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
        cleanup();
        generateRotationCommandsSpy.mockRestore();
        animateSingleRotationCommandSpy.mockRestore();
        applyRotationCommandsSpy.mockRestore();
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

        const stop = screen.getByRole('button', {
            name: 'player.input.stop',
        });

        const play = screen.getByRole('button', {
            name: 'player.input.play',
        });
        expect(play).toHaveAttribute('aria-disabled', 'false');

        fireEvent.click(play);

        const state = store.getState();
        expect(state.player.status).toBe(PlayerStatus.PLAYING);

        fireEvent.click(stop);
    };

    it('should allow play when notation valid', () => {
        store.dispatch(playerActions.updateNotation('F U R'));
        expectAllowPlay();
    });

    it('should allow play when paused', () => {
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

    it('should not have play when playing', () => {
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

        const stop = screen.getByRole('button', {
            name: 'player.input.stop',
        });

        const play = screen.queryByRole('button', {
            name: 'player.input.play',
        });

        expect(play).not.toBeInTheDocument();

        fireEvent.click(stop);
    });

    it('should stop when all commands are run', async () => {
        const notation = 'F U';
        store.dispatch(playerActions.updateNotation(notation));

        const waitForStop = new Promise((resolve) => {
            store.dispatch(
                addListener({
                    actionCreator: playerActions.stop,
                    effect: async (_action, listenerApi) => {
                        listenerApi.unsubscribe();
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

        await waitForStop;
        expect(store.getState().player.status).toBe(PlayerStatus.STOPPED);

        const expectCommands = (
            makeNotationParser(3).rotationCommands.parse(notation) as Success<
                SingleRotationCommand[]
            >
        ).value;

        expect(generateRotationCommandsSpy).toHaveBeenCalledTimes(3);
        expect(animateSingleRotationCommandSpy).toHaveBeenCalledTimes(2);
        expect(animateSingleRotationCommandSpy).toHaveBeenCalledWith(
            expectCommands[0],
        );
        expect(animateSingleRotationCommandSpy).toHaveBeenCalledWith(
            expectCommands[1],
        );
        expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(2);
    });

    it('should resume from pause', async () => {
        const notation = 'F U';
        store.dispatch(playerActions.updateNotation(notation));

        render(
            <Provider store={store}>
                <Player />
            </Provider>,
        );

        const resume = screen.getByRole('button', {
            name: 'player.input.play',
        });

        const pauseWhenAnimationStartsThenResume = new Promise((resolve) => {
            store.dispatch(
                addListener({
                    actionCreator: cubeActions.animateSingleRotationCommand,
                    effect: async (_action, listenerApi) => {
                        listenerApi.unsubscribe();
                        await act(() =>
                            listenerApi.dispatch(playerActions.pause()),
                        );
                        await listenerApi.delay(50);
                        fireEvent.click(resume);
                        await listenerApi.delay(50);
                        resolve(true);
                    },
                }),
            );
        });

        const waitForStop = new Promise((resolve) => {
            store.dispatch(
                addListener({
                    actionCreator: playerActions.stop,
                    effect: async (_action, listenerApi) => {
                        listenerApi.unsubscribe();
                        await listenerApi.delay(50);
                        resolve(true);
                    },
                }),
            );
        });

        fireEvent.click(resume); // acts still as play here

        await pauseWhenAnimationStartsThenResume;
        await waitForStop;

        const state = store.getState();
        expect(state.player.status).toBe(PlayerStatus.STOPPED);

        const expectCommands = (
            makeNotationParser(3).rotationCommands.parse(notation) as Success<
                SingleRotationCommand[]
            >
        ).value;

        expect(generateRotationCommandsSpy).toHaveBeenCalledTimes(3);
        expect(animateSingleRotationCommandSpy).toHaveBeenCalledTimes(2);
        expect(animateSingleRotationCommandSpy).toHaveBeenCalledWith(
            expectCommands[0],
        );
        expect(animateSingleRotationCommandSpy).toHaveBeenCalledWith(
            expectCommands[1],
        );
        expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(2);
    });
});
