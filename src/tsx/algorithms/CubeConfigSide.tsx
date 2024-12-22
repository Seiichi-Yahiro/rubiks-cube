import React, { type CSSProperties } from 'react';
import type { CubeColorKey } from 'src/tsx/cube/cubeTypes';
import cn from 'src/utils/cn';

export enum ViewMode {
    Full = 'Full',
    Top = 'Top',
}

interface CubeConfigSideProps {
    faces: CubeColorKey[][];
    faceSize: number;
    viewMode: ViewMode;
    style?: CSSProperties;
    className?: string;
}

const CubeConfigSide: React.FC<CubeConfigSideProps> = ({
    faces,
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
            className={cn('grid [backface-visibility:hidden]', className)}
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
