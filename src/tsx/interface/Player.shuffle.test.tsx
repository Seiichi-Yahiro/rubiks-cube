import { addListener } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import type { Success } from 'parsimmon';
import React from 'react';
import { Provider } from 'react-redux';
import type { RotationCommand } from 'src/algorithms/rotationCommand';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { playerActions } from 'src/redux/player/playerActions';
import { AppStore, setupStore } from 'src/redux/store';
import Player from 'src/tsx/interface/Player';

describe('Player shuffle', () => {
    let store: AppStore;

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

        expect(stateAfter.player.notation).toBe(stateBefore.player.notation);
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
