import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { playerActions } from 'src/redux/player/playerActions';
import { setupStore } from 'src/redux/store';
import CubeSelector from 'src/tsx/cube/settings/CubeSelector';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('CubeSelector', () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('should parse the notation when the cube type changes', async () => {
        window.HTMLElement.prototype.scrollIntoView = vi.fn();

        const store = setupStore();
        store.dispatch(playerActions.updateNotation('3F'));

        render(
            <Provider store={store}>
                <CubeSelector />
            </Provider>,
        );

        const cubeSelectorButton = screen.getByRole('combobox');
        fireEvent.click(cubeSelectorButton);

        const cubeType2Button = await screen.findByText('2x2x2');
        fireEvent.click(cubeType2Button);

        const state = store.getState();

        expect(state.player.rotationCommands.status).toBe(false);
    });
});
