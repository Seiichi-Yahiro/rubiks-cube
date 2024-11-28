import { addListener } from '@reduxjs/toolkit';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { Success } from 'parsimmon';
import React from 'react';
import { Provider } from 'react-redux';
import { makeNotationParser } from 'src/algorithms/parser';
import {
    type RotationCommand,
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

describe('Player pause', () => {
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

    it('should pause when playing', async () => {
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

        let pause: HTMLElement | null = null;

        const pauseWhenAnimationStarts = new Promise((resolve) => {
            store.dispatch(
                addListener({
                    actionCreator: cubeActions.animateSingleRotationCommand,
                    effect: async (_action, listenerApi) => {
                        listenerApi.unsubscribe();
                        fireEvent.click(pause!);
                        await listenerApi.delay(50);
                        resolve(true);
                    },
                }),
            );
        });

        fireEvent.click(play);

        pause = screen.getByRole('button', {
            name: 'player.input.pause',
        });

        expect(pause).toHaveAttribute('aria-disabled', 'false');

        await pauseWhenAnimationStarts;

        pause = screen.queryByRole('button', {
            name: 'player.input.pause',
        });

        expect(pause).not.toBeInTheDocument();

        const state = store.getState();
        expect(state.player.status).toBe(PlayerStatus.PAUSED);

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

    it('should pause when playing', () => {
        store.dispatch(playerActions.updateNotation('F U R'));
        /*store.dispatch(
            playerActions.play(
                (
                    store.getState().player.rotationCommands as Success<
                        RotationCommand[]
                    >
                ).value,
            ),
        );*/

        render(
            <Provider store={store}>
                <Player />
            </Provider>,
        );

        const play = screen.getByRole('button', {
            name: 'player.input.play',
        });

        fireEvent.click(play);

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
