import type { ColorResult } from '@uiw/color-convert';
import Chrome, { ChromeInputType } from '@uiw/react-color-chrome';
import { RotateCcw } from 'lucide-react';
import React, { type CSSProperties, useCallback, useState } from 'react';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import IconButton from 'src/tsx/components/IconButton';
import { CubeColorKey } from 'src/tsx/cube/cubeTypes';
import cn from 'src/utils/cn';
import './ColorPicker.css';

const ColorPicker: React.FC = () => {
    const dispatch = useAppDispatch();
    const cubeColors = useRedux((state) => state.cube.colors);

    const [activeColorKey, setActiveColorKey] = useState<CubeColorKey>(
        CubeColorKey.FRONT,
    );

    const resetColors = useCallback(() => {
        dispatch(cubeActions.resetColors());
    }, [dispatch]);

    const updateColor = useCallback(
        (color: ColorResult) => {
            dispatch(cubeActions.setColor(activeColorKey, color.hex));
        },
        [dispatch, activeColorKey],
    );

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="flex flex-row items-center gap-1">
                {(
                    Object.entries(cubeColors) as [
                        CubeColorKey,
                        CSSProperties['color'],
                    ][]
                )
                    .filter(
                        ([key, _]) =>
                            key !== CubeColorKey.INSIDE &&
                            key !== CubeColorKey.UNKNOWN,
                    )
                    .map(([colorKey, colorValue]) => (
                        <button
                            key={colorKey}
                            onClick={() => setActiveColorKey(colorKey)}
                            className={cn(
                                'size-7 rounded-full border border-app-border transition-[border-radius]',
                                {
                                    'rounded-b-md': colorKey === activeColorKey,
                                },
                            )}
                            style={{ backgroundColor: colorValue }}
                        />
                    ))}
                <IconButton onClick={resetColors}>
                    <RotateCcw />
                </IconButton>
            </div>
            <Chrome
                className="hide-arrow !border-app-border !shadow-none" // special class to hide the placement arrow, as there doesn't seem to be a way to remove it programmatically
                showAlpha={false}
                inputType={ChromeInputType.HEXA}
                color={cubeColors[activeColorKey]}
                onChange={updateColor}
            />
        </div>
    );
};

export default React.memo(ColorPicker);
