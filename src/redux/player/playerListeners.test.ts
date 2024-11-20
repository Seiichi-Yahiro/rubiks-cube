describe('PlayerListeners', () => {
    /*describe('playAnimationLoopListener', () => {
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
    });*/
});
