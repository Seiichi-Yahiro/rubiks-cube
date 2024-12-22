import Button from '@mui/material/Button';
import type { PopoverOrigin } from '@mui/material/Popover';
import Popover from '@mui/material/Popover';
import Chrome, { ChromeInputType } from '@uiw/react-color-chrome';
import React, { type CSSProperties, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import useComplexState from 'src/hooks/useComplexState';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { CubeColorKey } from 'src/tsx/cube/cubeTypes';
import 'src/tsx/interface/ColorPicker.css';
import cn from 'src/utils/cn';

interface State {
    selectedColor?: CubeColorKey;
    pickerColor: string;
}

const anchorOrigin: PopoverOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
};

const ColorPicker: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const cubeColors = useRedux((state) => state.cube.colors);

    const [{ selectedColor, pickerColor }, setState] = useComplexState<State>(
        () => ({
            selectedColor: undefined,
            pickerColor: '',
        }),
    );

    const resetColors = () => {
        dispatch(cubeActions.resetColors());
    };

    const colors = (
        Object.entries(cubeColors) as [CubeColorKey, CSSProperties['color']][]
    )
        .filter(([key, _]) => key !== CubeColorKey.INSIDE)
        .map(([key, value]) => (
            <button
                key={key}
                className={cn(
                    'h-5 w-5 cursor-pointer border border-app-border',
                    {
                        'animate-wiggle': selectedColor === key,
                    },
                )}
                aria-label={value}
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
        <div className="flex min-w-56 flex-1 flex-row items-center justify-evenly">
            <div>
                <div
                    ref={colorsRef}
                    className="grid grid-cols-3 gap-1 sm:grid-cols-6"
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
