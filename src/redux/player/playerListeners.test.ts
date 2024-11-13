import { Success } from 'parsimmon';
import { RotationCommand } from 'src/algorithms/rotationCommand';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { playerActions } from 'src/redux/player/playerActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import { AppStore, setupStore } from 'src/redux/store';

describe('PlayerListeners', () => {
    describe('parseListener', () => {
        let store: AppStore;

        beforeEach(() => {
            store = setupStore();
        });

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
        let store: AppStore;
        let nextCommandSpy: jest.SpyInstance;
        let applyRotationCommandsSpy: jest.SpyInstance;

        beforeEach(() => {
            store = setupStore();
            jest.useFakeTimers();
            nextCommandSpy = jest.spyOn(playerActions, 'nextCommand');
            applyRotationCommandsSpy = jest.spyOn(
                cubeActions,
                'applyRotationCommands',
            );
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
            nextCommandSpy.mockRestore();
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

            let state = store.getState();
            expect(state.player.status).toBe(PlayerStatus.PLAYING);

            for (let i = 0; i < 2; i++) {
                await jest.advanceTimersByTimeAsync(1000);
                store.dispatch(cubeActions.animationFinished());

                await jest.advanceTimersByTimeAsync(50);
            }

            state = store.getState();
            expect(state.player.status).toBe(PlayerStatus.STOPPED);

            expect(nextCommandSpy).toHaveBeenCalledTimes(3);
            expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(2);
        });

        it('should stop when stop is pressed', async () => {
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

            await jest.advanceTimersByTimeAsync(1000);
            store.dispatch(cubeActions.animationFinished());

            await jest.advanceTimersByTimeAsync(50);

            state = store.getState();
            expect(state.player.status).toBe(PlayerStatus.STOPPED);

            expect(nextCommandSpy).toHaveBeenCalledTimes(1);
            expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(1);
        });

        it('should stop when stop is pressed after pause', async () => {
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

            await jest.advanceTimersByTimeAsync(1000);
            store.dispatch(cubeActions.animationFinished());

            await jest.advanceTimersByTimeAsync(50);
            store.dispatch(playerActions.stop());

            state = store.getState();
            expect(state.player.status).toBe(PlayerStatus.STOPPED);

            expect(nextCommandSpy).toHaveBeenCalledTimes(1);
            expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(1);
        });

        it('should resume after unpause', async () => {
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

            await jest.advanceTimersByTimeAsync(1000);
            store.dispatch(cubeActions.animationFinished());

            await jest.advanceTimersByTimeAsync(50);
            store.dispatch(playerActions.unPause());

            await jest.advanceTimersByTimeAsync(1000);
            store.dispatch(cubeActions.animationFinished());

            await jest.advanceTimersByTimeAsync(50);

            state = store.getState();
            expect(state.player.status).toBe(PlayerStatus.STOPPED);

            expect(nextCommandSpy).toHaveBeenCalledTimes(3);
            expect(applyRotationCommandsSpy).toHaveBeenCalledTimes(2);
        });
    });
});
