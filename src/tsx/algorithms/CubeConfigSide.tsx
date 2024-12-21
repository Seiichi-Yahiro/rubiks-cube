import React, { type CSSProperties } from 'react';
import { useRedux } from 'src/hooks/redux';
import type { Color } from 'src/tsx/cube/cubeTypes';
import cn from 'src/utils/cn';

export enum ViewMode {
    Full = 'Full',
    Top = 'Top',
}

interface CubeConfigSideProps {
    faces: Color[][];
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
    const colorMap = useRedux((state) => state.cube.colorMap);

    const faceClassName = 'border border-cube-gray';

    const createFaceStyle = (color: Color) => ({
        backgroundColor: colorMap[color],
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
                row.map((color, columnIndex) => (
                    <div
                        key={`${rowIndex}-${columnIndex}`}
                        style={createFaceStyle(color)}
                        className={faceClassName}
                    />
                )),
            )}
        </div>
    ) : (
        <div className={cn('flex', className)} style={style}>
            {faces[0].map((color, index) => (
                <div
                    key={index}
                    className={faceClassName}
                    style={createFaceStyle(color)}
                />
            ))}
        </div>
    );
};

export default CubeConfigSide;
