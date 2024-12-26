import React, { type CSSProperties } from 'react';
import type { HelpArrow } from 'src/algorithms/algorithmTypes';
import HelpArrows from 'src/tsx/algorithms/HelpArrows';
import type { CubeColorKey } from 'src/tsx/cube/cubeTypes';
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
    const faceClassName = 'border border-[--cube-face-inside]';

    const createFaceStyle = (colorKey: CubeColorKey) => ({
        backgroundColor: `var(${colorKey})`,
        width: `${faceSize}rem`,
        height: `${faceSize}rem`,
    });

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
                        style={createFaceStyle(colorKey)}
                        className={faceClassName}
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
                    className={faceClassName}
                    style={createFaceStyle(colorKey)}
                />
            ))}
        </div>
    );
};

export default CubeConfigSide;
