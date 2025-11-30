import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { Success } from 'parsimmon';
import { Provider } from 'react-redux';
import type { RotationCommand } from 'src/algorithms/rotationCommand';
import { setupStore } from 'src/redux/store';
import { TooltipProvider } from 'src/tsx/components/Tooltip';
import Player from 'src/tsx/player/Player';
import { afterEach, describe, expect, it } from 'vitest';

describe('NotationInput', () => {
    afterEach(() => {
        cleanup();
    });

    it('should parse the notation when the notation changes', () => {
        const store = setupStore();

        render(
            <Provider store={store}>
                <TooltipProvider>
                    <Player />
                </TooltipProvider>
            </Provider>,
        );

        const textField = screen.getByLabelText('player.input.algorithm');

        expect(textField).toBeInTheDocument();

        fireEvent.change(textField, { target: { value: 'F U R' } });

        const state = store.getState();

        expect(state.player.rotationCommands.status).toBe(true);
        expect(
            (state.player.rotationCommands as Success<RotationCommand[]>).value
                .length,
        ).toBe(3);
    });
});
