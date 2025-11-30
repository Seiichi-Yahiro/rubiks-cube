import { addListener } from '@reduxjs/toolkit';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { Success } from 'parsimmon';
import { Provider } from 'react-redux';
import type { RotationCommand } from 'src/algorithms/rotationCommand';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { playerActions } from 'src/redux/player/playerActions';
import { AppStore, setupStore } from 'src/redux/store';
import { TooltipProvider } from 'src/tsx/components/Tooltip';
import Player from 'src/tsx/player/Player';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('Player reset', () => {
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

    afterEach(() => {
        cleanup();
    });

    const expectNotAllowReset = () => {
        render(
            <Provider store={store}>
                <TooltipProvider>
                    <Player />
                </TooltipProvider>
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

    it('should not allow reset when playing', () => {
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

        expectNotAllowReset();
    });

    it('should not allow reset when paused', () => {
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

        await new Promise((resolve) => {
            store.dispatch(
                addListener({
                    actionCreator: cubeActions.applyRotationCommands,
                    effect: (_action, listenerApi) => {
                        listenerApi.unsubscribe();
                        resolve(true);
                    },
                }),
            );
        });

        store.dispatch(playerActions.stop());

        render(
            <Provider store={store}>
                <TooltipProvider>
                    <Player />
                </TooltipProvider>
            </Provider>,
        );

        const stateBefore = store.getState();

        const reset = screen.getByRole('button', {
            name: 'player.input.reset',
        });

        expect(reset).toHaveAttribute('aria-disabled', 'false');

        fireEvent.click(reset);

        const stateAfter = store.getState();

        expect(stateAfter.cube.cubicles).not.toBe(stateBefore.cube.cubicles);
    });
});
