import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { playerActions } from 'src/redux/player/playerActions';
import { setupStore } from 'src/redux/store';
import Settings from 'src/tsx/interface/Settings';
import { afterEach, describe, expect, it } from 'vitest';

describe('Settings', () => {
    afterEach(() => {
        cleanup();
    });

    it('should parse the notation when the cube dimension changes', () => {
        const store = setupStore();
        store.dispatch(playerActions.updateNotation('3F'));

        render(
            <Provider store={store}>
                <Settings />
            </Provider>,
        );

        const dimensionSlider = screen.getByLabelText(
            'interface.settings.cube-dimension',
        );

        fireEvent.change(dimensionSlider, { target: { value: 2 } });

        store.dispatch(cubeActions.setCubeDimension(2));
        const state = store.getState();

        expect(state.player.rotationCommands.status).toBe(false);
    });
});
