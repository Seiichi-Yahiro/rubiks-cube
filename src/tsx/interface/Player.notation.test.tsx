import { fireEvent, render, screen } from '@testing-library/react';
import type { Success } from 'parsimmon';
import React from 'react';
import { Provider } from 'react-redux';
import type { RotationCommand } from 'src/algorithms/rotationCommand';
import { setupStore } from 'src/redux/store';
import Player from 'src/tsx/interface/Player';

describe('NotationInput', () => {
    it('should parse the notation when the notation changes', () => {
        const store = setupStore();

        render(
            <Provider store={store}>
                <Player />
            </Provider>,
        );

        const textField = screen.getByLabelText('player.input.algorithm');

        expect(textField).toBeInTheDocument();

        fireEvent.change(textField!, { target: { value: 'F U R' } });

        const state = store.getState();

        expect(state.player.rotationCommands.status).toBe(true);
        expect(
            (state.player.rotationCommands as Success<RotationCommand[]>).value
                .length,
        ).toBe(3);
    });
});
