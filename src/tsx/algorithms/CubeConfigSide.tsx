import React, { type CSSProperties } from 'react';
import type { HelpArrow } from 'src/algorithms/algorithmTypes';
import HelpArrows from 'src/tsx/algorithms/HelpArrows';
import {
    type CubeColorKey,
    cubeColorKeyToClassName,
} from 'src/tsx/cube/cubeTypes';
import cn from 'src/utils/cn';

export enum ViewMode {
    Full = 'Full',
    Top = 'Top',
}

interface CubeConfigSideProps {
    faces: CubeColorKey[][];
    helpArrows?: HelpArrow[];
    faceSize: number;
    viewMode: ViewMode;
    style?: CSSProperties;
    className?: string;
}

const CubeConfigSide: React.FC<CubeConfigSideProps> = ({
    faces,
    helpArrows,
    faceSize,
    viewMode,
    className,
    style,
}) => {
    const faceStyle = {
        width: `${faceSize}rem`,
        height: `${faceSize}rem`,
    };

    return viewMode === ViewMode.Full ? (
        <div
            className={cn(
                'relative grid [backface-visibility:hidden]',
                className,
            )}
            style={{
                gridTemplateColumns: `repeat(${faces[0].length}, ${faceSize}rem)`,
                ...style,
            }}
        >
            {faces.flatMap((row, rowIndex) =>
                row.map((colorKey, columnIndex) => (
                    <div
                        key={`${rowIndex}-${columnIndex}`}
                        className={cn(
                            'cube-face-border border',
                            cubeColorKeyToClassName(colorKey),
                        )}
                        style={faceStyle}
                    />
                )),
            )}
            {helpArrows && (
                <HelpArrows arrows={helpArrows} faceSize={faceSize} />
            )}
        </div>
    ) : (
        <div className={cn('flex', className)} style={style}>
            {faces[0].map((colorKey, index) => (
                <div
                    key={index}
                    className={cn(
                        'cube-face-border border',
                        cubeColorKeyToClassName(colorKey),
                    )}
                    style={faceStyle}
                />
            ))}
        </div>
    );
};

export default CubeConfigSide;
