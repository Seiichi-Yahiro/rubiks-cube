import { Success } from 'parsimmon';
import { RotationCommand } from 'src/algorithms/rotationCommand';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { playerActions } from 'src/redux/player/playerActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import { AppStore, setupStore } from 'src/redux/store';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('PlayerListeners', () => {
    let store: AppStore;

    beforeEach(() => {
        store = setupStore();
    });

    describe('parseListener', () => {
        it('should parse the notation when the notation changes', () => {
            store.dispatch(playerActions.updateNotation('F U R'));
            const state = store.getState();

            expect(state.player.rotationCommands.status).toBe(true);
            expect(
                (state.player.rotationCommands as Success<RotationCommand[]>)
                    .value.length,
            ).toBe(3);
        });

        it('should parse the notation when the cube dimension changes', () => {
            store.dispatch(playerActions.updateNotation('3F'));
            store.dispatch(cubeActions.setCubeDimension(2));
            const state = store.getState();

            expect(state.player.rotationCommands.status).toBe(false);
        });
    });

    describe('playAnimationLoopListener', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.runOnlyPendingTimers();
            vi.useRealTimers();
            vi.restoreAllMocks();
        });

        it('should stop when all commands are run', async () => {
            const nextCommandSpy = vi.spyOn(playerActions, 'nextCommand');
            const applyRotationCommandsSpy = vi.spyOn(
                cubeActions,
                'applyRotationCommands',
            );

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

            let state = store.getState();
            expect(state.player.status).toBe(PlayerStatus.PLAYING);

            for (let i = 0; i < 2; i++) {
                await vi.advanceTimersByTimeAsync(1000);
                store.dispatch(cubeActions.animationFinished());

                await vi.advanceTimersByTimeAsync(50);
            }

            state = store.getState();
            expect(state.player.status).toBe(PlayerStatus.STOPPED);

            expect(nextCommandSpy).toHaveBeenCalledTimes(3);
            expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(2);
        });

        it('should stop when stop is pressed', async () => {
            const nextCommandSpy = vi.spyOn(playerActions, 'nextCommand');
            const applyRotationCommandsSpy = vi.spyOn(
                cubeActions,
                'applyRotationCommands',
            );

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

            let state = store.getState();
            expect(state.player.status).toBe(PlayerStatus.PLAYING);

            store.dispatch(playerActions.stop());

            await vi.advanceTimersByTimeAsync(1000);
            store.dispatch(cubeActions.animationFinished());

            await vi.advanceTimersByTimeAsync(50);

            state = store.getState();
            expect(state.player.status).toBe(PlayerStatus.STOPPED);

            expect(nextCommandSpy).toHaveBeenCalledTimes(1);
            expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(1);
        });

        it('should stop when stop is pressed after pause', async () => {
            const nextCommandSpy = vi.spyOn(playerActions, 'nextCommand');
            const applyRotationCommandsSpy = vi.spyOn(
                cubeActions,
                'applyRotationCommands',
            );

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

            let state = store.getState();
            expect(state.player.status).toBe(PlayerStatus.PLAYING);

            store.dispatch(playerActions.pause());

            await vi.advanceTimersByTimeAsync(1000);
            store.dispatch(cubeActions.animationFinished());

            await vi.advanceTimersByTimeAsync(50);
            store.dispatch(playerActions.stop());

            state = store.getState();
            expect(state.player.status).toBe(PlayerStatus.STOPPED);

            expect(nextCommandSpy).toHaveBeenCalledTimes(1);
            expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(1);
        });

        it('should resume after unpause', async () => {
            const nextCommandSpy = vi.spyOn(playerActions, 'nextCommand');
            const applyRotationCommandsSpy = vi.spyOn(
                cubeActions,
                'applyRotationCommands',
            );

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

            let state = store.getState();
            expect(state.player.status).toBe(PlayerStatus.PLAYING);

            store.dispatch(playerActions.pause());

            await vi.advanceTimersByTimeAsync(1000);
            store.dispatch(cubeActions.animationFinished());

            await vi.advanceTimersByTimeAsync(50);
            store.dispatch(playerActions.unPause());

            await vi.advanceTimersByTimeAsync(1000);
            store.dispatch(cubeActions.animationFinished());

            await vi.advanceTimersByTimeAsync(50);

            state = store.getState();
            expect(state.player.status).toBe(PlayerStatus.STOPPED);

            expect(nextCommandSpy).toHaveBeenCalledTimes(3);
            expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(2);
        });
    });
});
