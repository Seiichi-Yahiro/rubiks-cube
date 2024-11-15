import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { COLOR_MAP, defaultColorMap } from 'src/redux/localStorage';
import { AppStore, setupStore } from 'src/redux/store';
import { Color } from 'src/tsx/cube/cubeTypes';
import ColorPicker from 'src/tsx/interface/ColorPicker';

describe('ColorPicker', () => {
    let store: AppStore;
    let setItemSpy: jest.SpyInstance;

    beforeEach(() => {
        store = setupStore();
        setItemSpy = jest
            .spyOn(Storage.prototype, 'setItem')
            .mockImplementation(() => {});
    });

    afterEach(() => {
        setItemSpy.mockRestore();
    });

    it('should have 6 color buttons', () => {
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
        render(
            <Provider store={store}>
                <ColorPicker />
            </Provider>,
        );

        const stateBefore = store.getState();

        const colorButton = screen.getByRole('button', { name: Color.BLUE });

        fireEvent.click(colorButton);

        const hexInput = await screen.findByDisplayValue(
            Color.BLUE.toUpperCase(),
        );

        fireEvent.change(hexInput, { target: { value: '#000000' } });

        const stateAfter = store.getState();

        expect(stateAfter.cube.colorMap).toEqual({
            ...stateBefore.cube.colorMap,
            [Color.BLUE]: '#000000',
        });

        expect(colorButton).toHaveAttribute('aria-label', '#000000');
        expect(colorButton).toHaveStyle({ backgroundColor: '#000000' });
    });

    it('should save colors in local storage when a color is set', async () => {
        render(
            <Provider store={store}>
                <ColorPicker />
            </Provider>,
        );

        const colorButton = screen.getByRole('button', { name: Color.BLUE });

        fireEvent.click(colorButton);

        const hexInput = await screen.findByDisplayValue(
            Color.BLUE.toUpperCase(),
        );

        fireEvent.change(hexInput, { target: { value: '#000000' } });

        expect(setItemSpy).toHaveBeenCalledWith(
            COLOR_MAP,
            JSON.stringify({ ...defaultColorMap, [Color.BLUE]: '#000000' }),
        );
    });

    it('should reset colors', () => {
        store.dispatch(cubeActions.setColor(Color.BLUE, '#000000'));

        render(
            <Provider store={store}>
                <ColorPicker />
            </Provider>,
        );

        const colorButton = screen.getByRole('button', { name: '#000000' });
        const resetButton = screen.getByText('interface.settings.reset-colors');

        fireEvent.click(resetButton);

        const state = store.getState();

        expect(state.cube.colorMap).toEqual(defaultColorMap);
        expect(colorButton).toHaveAttribute('aria-label', Color.BLUE);
        expect(colorButton).toHaveStyle({ backgroundColor: Color.BLUE });
    });

    it('should save colors in local storage when colors are reset', () => {
        store.dispatch(cubeActions.setColor(Color.BLUE, '#000000'));

        render(
            <Provider store={store}>
                <ColorPicker />
            </Provider>,
        );

        const resetButton = screen.getByText('interface.settings.reset-colors');

        fireEvent.click(resetButton);

        expect(setItemSpy).toHaveBeenCalledWith(
            COLOR_MAP,
            JSON.stringify(defaultColorMap),
        );
    });
});