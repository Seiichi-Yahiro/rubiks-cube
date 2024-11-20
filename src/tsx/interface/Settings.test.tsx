import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { cubeActions } from '../../redux/cube/cubeActions';
import { playerActions } from '../../redux/player/playerActions';
import { setupStore } from '../../redux/store';
import Settings from './Settings';

describe('Settings', () => {
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
