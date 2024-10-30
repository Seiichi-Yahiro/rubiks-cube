import React from 'react';
import Chrome, { ChromeInputType } from '@uiw/react-color-chrome';
import { useRedux } from '../states/States';
import { Color } from '../cube/CubeTypes';
import { useDispatch } from 'react-redux';
import { cubeActions } from '../states/cube/CubeActions';
import useComplexState from '../hooks/useComplexState';
import { Button, ClickAwayListener } from '@mui/material';
import createClassName from '../utils/createClassName';
import { GithubPlacement } from '@uiw/react-color-github';
import './ColorPicker.css';

interface State {
    selectedColor?: Color;
    pickerColor: string;
}

const ColorPicker: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const colorMap = useRedux((state) => state.cube.colorMap);

    const [{ selectedColor, pickerColor }, setState] = useComplexState<State>(
        () => ({
            selectedColor: undefined,
            pickerColor: '',
        }),
    );

    const resetColors = () => {
        dispatch(cubeActions.resetColors());
    };

    const colors = Object.entries(colorMap)
        .filter(
            ([key, _]) => key !== Color.DEFAULT && key !== Color.TRANSPARENT,
        )
        .map(([key, value]: [Color, string]) => (
            <div
                key={key}
                className={createClassName(
                    'h-5 w-5 cursor-pointer border border-cube-gray',
                    {
                        'animate-wiggle': selectedColor === key,
                    },
                )}
                style={{
                    backgroundColor: value,
                }}
                onClick={() =>
                    setState({ selectedColor: key, pickerColor: value })
                }
            />
        ));

    return (
        <div className="flex flex-1 flex-row items-center justify-between">
            <ClickAwayListener
                onClickAway={() => {
                    if (selectedColor) {
                        setState({ selectedColor: undefined });
                    }
                }}
            >
                <div>
                    <div className="grid grid-cols-6 gap-1">{colors}</div>
                    {selectedColor && (
                        <div className="absolute z-10 mt-1">
                            <Chrome
                                className="hide-arrow" // special class to hide the GitHub placement arrow, as there doesn't seem to be a way to remove it programmatically
                                showAlpha={false}
                                placement={GithubPlacement.Top}
                                inputType={ChromeInputType.HEXA}
                                color={pickerColor}
                                onChange={(color) => {
                                    setState({ pickerColor: color.hex });
                                    dispatch(
                                        cubeActions.setColor(
                                            selectedColor,
                                            color.hex,
                                        ),
                                    );
                                }}
                            />
                        </div>
                    )}
                </div>
            </ClickAwayListener>
            <Button size={'small'} onClick={resetColors}>
                Reset Colors
            </Button>
        </div>
    );
};

export default React.memo(ColorPicker);
