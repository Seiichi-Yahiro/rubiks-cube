import { Button, Popover, PopoverOrigin } from '@mui/material';
import Chrome, { ChromeInputType } from '@uiw/react-color-chrome';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import useComplexState from 'src/hooks/useComplexState';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { Color } from 'src/tsx/cube/cubeTypes';
import 'src/tsx/interface/ColorPicker.css';
import createClassName from 'src/utils/createClassName';

interface State {
    selectedColor?: Color;
    pickerColor: string;
}

const anchorOrigin: PopoverOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
};

const ColorPicker: React.FC = () => {
    const { t } = useTranslation();
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
        <div className="flex flex-1 flex-row items-center justify-evenly min-w-56">
            <div>
                <div
                    ref={colorsRef}
                    className="grid grid-cols-3 sm:grid-cols-6 gap-1"
                >
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
                        className="hide-arrow" // special class to hide the placement arrow, as there doesn't seem to be a way to remove it programmatically
                        showAlpha={false}
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
            <Button
                size={'small'}
                onClick={resetColors}
                className="whitespace-pre sm:whitespace-normal"
            >
                {t('interface.settings.reset-colors')}
            </Button>
        </div>
    );
};

export default React.memo(ColorPicker);
