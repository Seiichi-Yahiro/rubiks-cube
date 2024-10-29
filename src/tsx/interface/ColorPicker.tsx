import React from 'react';
import { ChromePicker } from 'react-color';
import { useRedux } from '../states/States';
import { Color } from '../cube/CubeTypes';
import { useDispatch } from 'react-redux';
import { cubeActions } from '../states/cube/CubeActions';
import useComplexState from '../hooks/useComplexState';
import { Button, ClickAwayListener } from '@mui/material';
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
                className={createClassName(
                    'border border-cube-gray w-5 h-5 cursor-pointer',
                    {
                        'animate-wiggle': selectedColor === key,
                    }
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
        <div className="flex flex-1 flex-row justify-between items-center">
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
                        <div className="absolute mt-1 z-10">
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

export default React.memo(ColorPicker);
