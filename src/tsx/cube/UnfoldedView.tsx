import React, { useMemo } from 'react';
import { useRedux } from 'src/hooks/redux';
import {
    type CubeAxis,
    CubeColorKey,
    cubeColorKeyToClassName,
    Side,
    type SideMap,
} from 'src/tsx/cube/cubeTypes';
import cn from 'src/utils/cn';

interface OverviewProps {
    faceSize: number;
    className?: string;
}

interface Face {
    colorKey: CubeColorKey;
    cubeSide: Side;
    axis: CubeAxis;
}

const axisSortIndices: SideMap<[number, number]> = {
    [Side.FRONT]: [1, 0],
    [Side.BACK]: [1, 0],
    [Side.LEFT]: [1, 2],
    [Side.RIGHT]: [1, 2],
    [Side.UP]: [2, 0],
    [Side.DOWN]: [2, 0],
};

const UnfoldedView: React.FC<OverviewProps> = ({ faceSize, className }) => {
    const dimension = useRedux((state) => state.cube.dimension);
    const cubicles = useRedux((state) => state.cube.cubicles);

    const faces = useMemo(() => {
        const faces = cubicles
            .flatMap((cubicle) =>
                cubicle.faces
                    .filter(
                        (face) =>
                            face.colorKey !== CubeColorKey.INSIDE &&
                            face.colorKey !== CubeColorKey.UNKNOWN,
                    )
                    .map<Face>((face) => ({
                        colorKey: face.colorKey,
                        cubeSide: face.cubeSide,
                        axis: cubicle.axis,
                    })),
            )
            .reduce(
                (acc, face) => {
                    acc[face.cubeSide].push(face);
                    return acc;
                },
                {
                    [Side.FRONT]: [],
                    [Side.BACK]: [],
                    [Side.LEFT]: [],
                    [Side.RIGHT]: [],
                    [Side.UP]: [],
                    [Side.DOWN]: [],
                } as SideMap<Face[]>,
            );

        for (const side of Object.values(Side)) {
            const [first, second] = axisSortIndices[side];

            faces[side].sort((a, b) => {
                if (a.axis[first] > b.axis[first]) {
                    return 1;
                } else if (a.axis[first] < b.axis[first]) {
                    return -1;
                } else if (a.axis[second] > b.axis[second]) {
                    return 1;
                } else if (a.axis[second] < b.axis[second]) {
                    return -1;
                } else {
                    return 0;
                }
            });
        }

        return faces;
    }, [cubicles]);

    const gap = faceSize * 0.1;
    const sideSize = dimension * faceSize;
    const positionCorrection = `translate(${sideSize + gap}rem, ${sideSize + gap}rem)`;

    return (
        <div
            className={cn('relative', className)}
            style={{
                width: `${sideSize * 4 + gap * 3}rem`,
                height: `${sideSize * 3 + gap * 2}rem`,
            }}
        >
            <CubeSide
                faces={faces[Side.FRONT]}
                faceSize={faceSize}
                dimension={dimension}
                className="absolute"
                style={{
                    transform: positionCorrection,
                }}
            />
            <CubeSide
                faces={faces[Side.BACK]}
                faceSize={faceSize}
                dimension={dimension}
                className="absolute"
                style={{
                    transform: `${positionCorrection} translate(${(sideSize + gap) * 2}rem, 0rem) scaleX(-1)`,
                }}
            />
            <CubeSide
                faces={faces[Side.LEFT]}
                faceSize={faceSize}
                dimension={dimension}
                className="absolute"
                style={{
                    transform: `${positionCorrection} translate(-${sideSize + gap}rem, 0rem) scaleX(-1)`,
                }}
            />
            <CubeSide
                faces={faces[Side.RIGHT]}
                faceSize={faceSize}
                dimension={dimension}
                className="absolute"
                style={{
                    transform: `${positionCorrection} translate(${sideSize + gap}rem, 0rem)`,
                }}
            />
            <CubeSide
                faces={faces[Side.UP]}
                faceSize={faceSize}
                dimension={dimension}
                className="absolute"
                style={{
                    transform: `${positionCorrection} translate(0rem, -${sideSize + gap}rem) scaleY(-1)`,
                }}
            />
            <CubeSide
                faces={faces[Side.DOWN]}
                faceSize={faceSize}
                dimension={dimension}
                className="absolute"
                style={{
                    transform: `${positionCorrection} translate(0rem, ${sideSize + gap}rem)`,
                }}
            />
        </div>
    );
};

interface CubeSideProps {
    dimension: number;
    faceSize: number;
    faces: Face[];
    className?: string;
    style?: React.CSSProperties;
}

const CubeSide: React.FC<CubeSideProps> = ({
    faces,
    dimension,
    faceSize,
    className,
    style,
}) => {
    const faceStyle = {
        width: `${faceSize}rem`,
        height: `${faceSize}rem`,
    };

    return (
        <div
            className={cn('grid', className)}
            style={{
                gridTemplateColumns: `repeat(${dimension}, ${faceSize}rem)`,
                ...style,
            }}
        >
            {faces.map((face, index) => (
                <div
                    key={index}
                    className={cn(
                        'cube-face-border border transition-colors',
                        cubeColorKeyToClassName(face.colorKey),
                    )}
                    style={faceStyle}
                />
            ))}
        </div>
    );
};

export default React.memo(UnfoldedView);
