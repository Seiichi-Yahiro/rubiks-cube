import React, { useRef } from 'react';
import Chrome, { ChromeInputType } from '@uiw/react-color-chrome';
import { useAppDispatch, useRedux } from '../hooks/redux';
import { Color } from '../cube/cubeTypes';
import { cubeActions } from '../states/cube/cubeActions';
import useComplexState from '../hooks/useComplexState';
import { Button, Popover, PopoverOrigin } from '@mui/material';
import createClassName from '../utils/createClassName';
import { GithubPlacement } from '@uiw/react-color-github';
import './ColorPicker.css';

interface State {
    selectedColor?: Color;
    pickerColor: string;
}

const anchorOrigin: PopoverOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
};

const ColorPicker: React.FC = () => {
    const dispatch = useAppDispatch();
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

    const colorsRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex flex-1 flex-row items-center justify-between">
            <div>
                <div ref={colorsRef} className="grid grid-cols-6 gap-1">
                    {colors}
                </div>
                <Popover
                    className="mt-1"
                    open={selectedColor !== undefined}
                    anchorEl={colorsRef.current}
                    anchorOrigin={anchorOrigin}
                    onClose={() => setState({ selectedColor: undefined })}
                >
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
                                    selectedColor!, // popover is only visible when selectedColor is defined
                                    color.hex,
                                ),
                            );
                        }}
                    />
                </Popover>
            </div>
            <Button size={'small'} onClick={resetColors}>
                Reset Colors
            </Button>
        </div>
    );
};

export default React.memo(ColorPicker);
