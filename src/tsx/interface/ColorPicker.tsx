import React from 'react';
import './ColorPicker.scss';
import { ChromePicker } from 'react-color';
import { useRedux } from '../states/States';
import { Color } from '../cube/CubeTypes';
import { useDispatch } from 'react-redux';
import { cubeActions } from '../states/cube/CubeActions';
import useComplexState from '../hooks/useComplexState';
import { Button, ClickAwayListener } from '@material-ui/core';
import createClassName from '../utils/createClassName';

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
        })
    );

    const resetColors = () => {
        dispatch(cubeActions.resetColors());
    };

    const colors = Object.entries(colorMap)
        .filter(
            ([key, _]) => key !== Color.DEFAULT && key !== Color.TRANSPARENT
        )
        .map(([key, value]: [Color, string]) => (
            <div
                key={key}
                className={createClassName('color-group__color-square', {
                    'color-group__color-square--selected':
                        selectedColor === key,
                })}
                style={{
                    backgroundColor: value,
                }}
                onClick={() =>
                    setState({ selectedColor: key, pickerColor: value })
                }
            />
        ));

    return (
        <div className="color-picker-component">
            <ClickAwayListener
                onClickAway={() => {
                    if (selectedColor) {
                        setState({ selectedColor: undefined });
                    }
                }}
            >
                <div>
                    <div className="color-group">{colors}</div>
                    {selectedColor && (
                        <div className="color-picker">
                            <ChromePicker
                                disableAlpha={true}
                                color={pickerColor}
                                onChange={(color) =>
                                    setState({ pickerColor: color.hex })
                                }
                                onChangeComplete={(color) =>
                                    dispatch(
                                        cubeActions.setColor(
                                            selectedColor,
                                            color.hex
                                        )
                                    )
                                }
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

export default ColorPicker;
