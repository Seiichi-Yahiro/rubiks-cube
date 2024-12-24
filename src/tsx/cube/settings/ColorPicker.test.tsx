import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { CUBE_COLORS, defaultColorMap } from 'src/redux/localStorage';
import { setupStore } from 'src/redux/store';
import { CubeColorKey } from 'src/tsx/cube/cubeTypes';
import ColorPicker from 'src/tsx/cube/settings/ColorPicker';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('ColorPicker', () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
        localStorage.clear();
    });

    it('should have 6 color buttons', () => {
        const store = setupStore();

        render(
            <Provider store={store}>
                <ColorPicker />
            </Provider>,
        );

        const colorButtons = screen.queryAllByRole('button', {
            name: /^#[A-F0-9]{6}$/i,
        });

        expect(colorButtons).toHaveLength(6);
    });

    it('should set color', async () => {
        const store = setupStore();

        render(
            <Provider store={store}>
                <ColorPicker />
            </Provider>,
        );

        const stateBefore = store.getState();

        const colorButton = screen.getByRole('button', {
            name: defaultColorMap[CubeColorKey.FRONT],
        });

        fireEvent.click(colorButton);

        const hexInput = await screen.findByDisplayValue(
            defaultColorMap[CubeColorKey.FRONT].toUpperCase(),
        );

        fireEvent.change(hexInput, { target: { value: '#000000' } });

        const stateAfter = store.getState();

        expect(stateAfter.cube.colors).toEqual({
            ...stateBefore.cube.colors,
            [CubeColorKey.FRONT]: '#000000',
        });

        expect(colorButton).toHaveAttribute('aria-label', '#000000');
        expect(colorButton).toHaveStyle({ backgroundColor: '#000000' });
    });

    it('should save colors in local storage when a color is set', async () => {
        const store = setupStore();
        const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

        render(
            <Provider store={store}>
                <ColorPicker />
            </Provider>,
        );

        const colorButton = screen.getByRole('button', {
            name: defaultColorMap[CubeColorKey.FRONT],
        });

        fireEvent.click(colorButton);

        const hexInput = await screen.findByDisplayValue(
            defaultColorMap[CubeColorKey.FRONT].toUpperCase(),
        );

        fireEvent.change(hexInput, { target: { value: '#000000' } });

        expect(setItemSpy).toHaveBeenCalledWith(
            CUBE_COLORS,
            JSON.stringify({
                ...defaultColorMap,
                [CubeColorKey.FRONT]: '#000000',
            }),
        );
    });

    it('should reset colors', () => {
        const store = setupStore();

        store.dispatch(cubeActions.setColor(CubeColorKey.FRONT, '#000000'));

        render(
            <Provider store={store}>
                <ColorPicker />
            </Provider>,
        );

        const colorButton = screen.getByRole('button', { name: '#000000' });
        const resetButton = screen.getByText('interface.settings.reset-colors');

        fireEvent.click(resetButton);

        const state = store.getState();

        expect(state.cube.colors).toEqual(defaultColorMap);
        expect(colorButton).toHaveAttribute(
            'aria-label',
            defaultColorMap[CubeColorKey.FRONT],
        );
        expect(colorButton).toHaveStyle({
            backgroundColor: defaultColorMap[CubeColorKey.FRONT],
        });
    });

    it('should save colors in local storage when colors are reset', () => {
        const store = setupStore();
        const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

        store.dispatch(cubeActions.setColor(CubeColorKey.FRONT, '#000000'));

        render(
            <Provider store={store}>
                <ColorPicker />
            </Provider>,
        );

        const resetButton = screen.getByText('interface.settings.reset-colors');

        fireEvent.click(resetButton);

        expect(setItemSpy).toHaveBeenCalledWith(
            CUBE_COLORS,
            JSON.stringify(defaultColorMap),
        );
    });
});
