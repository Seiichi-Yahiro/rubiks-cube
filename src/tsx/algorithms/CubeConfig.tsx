import React from 'react';
import type { StartConfiguration } from 'src/algorithms/algorithmTypes';
import CubeConfigSide, {
    ViewMode as SideViewMode,
} from 'src/tsx/algorithms/CubeConfigSide';

export enum ViewMode {
    D3 = '3d',
    Top = 'top',
}

interface CubeConfigProps extends StartConfiguration {
    viewMode: ViewMode;
}

const sqrt3 = Math.sqrt(3);
const faceSize = 1;
const gapFix = 'translateZ(-0.4px)';

const CubeConfig: React.FC<CubeConfigProps> = ({
    front,
    back,
    left,
    right,
    top,
    bottom,
    viewMode,
}) => {
    return (
        <div
            className="group inline-flex items-center justify-center [perspective:1000px]"
            style={{
                width: `${front[0].length * faceSize * sqrt3}rem`,
                height: `${front.length * faceSize * sqrt3}rem`,
            }}
        >
            {viewMode === ViewMode.D3 ? (
                <div
                    className="[transform-style:preserve-3d] group-hover:animate-rotate3d"
                    style={{
                        transform: 'rotateX(-45deg) rotateY(-45deg)',
                        width: `${front[0].length * faceSize}rem`,
                        height: `${front.length * faceSize}rem`,
                    }}
                >
                    <CubeConfigSide
                        key="front"
                        faces={front}
                        faceSize={faceSize}
                        viewMode={SideViewMode.Full}
                        className="absolute"
                        style={{
                            transform: `translateZ(${(right[0].length / 2) * faceSize}rem) ${gapFix}`,
                        }}
                    />
                    <CubeConfigSide
                        key="back"
                        faces={back}
                        faceSize={faceSize}
                        viewMode={SideViewMode.Full}
                        className="absolute"
                        style={{
                            transform: `rotateY(180deg) translateZ(${(right[0].length / 2) * faceSize}rem) ${gapFix}`,
                        }}
                    />
                    <CubeConfigSide
                        key="left"
                        faces={left}
                        faceSize={faceSize}
                        viewMode={SideViewMode.Full}
                        className="absolute"
                        style={{
                            transform: `rotateY(-90deg) translateZ(${(front[0].length / 2) * faceSize}rem) ${gapFix}`,
                        }}
                    />
                    <CubeConfigSide
                        key="right"
                        faces={right}
                        faceSize={faceSize}
                        viewMode={SideViewMode.Full}
                        className="absolute"
                        style={{
                            transform: `rotateY(90deg) translateZ(${(front[0].length / 2) * faceSize}rem) ${gapFix}`,
                        }}
                    />
                    <CubeConfigSide
                        key="top"
                        faces={top}
                        faceSize={faceSize}
                        viewMode={SideViewMode.Full}
                        className="absolute"
                        style={{
                            transform: `rotateX(90deg) translateZ(${(front.length / 2) * faceSize}rem) ${gapFix}`,
                        }}
                    />
                    <CubeConfigSide
                        key="bottom"
                        faces={bottom}
                        faceSize={faceSize}
                        viewMode={SideViewMode.Full}
                        className="absolute"
                        style={{
                            transform: `rotateX(-90deg) translateZ(${(front.length / 2) * faceSize}rem) ${gapFix}`,
                        }}
                    />
                </div>
            ) : (
                <div
                    className="grid [transform-style:preserve-3d]"
                    style={{
                        gridTemplateColumns: `${faceSize}rem ${top[0].length * faceSize}rem ${faceSize}rem`,
                        width: `${(front[0].length + 2) * faceSize}rem`,
                        height: `${(front.length + 2) * faceSize}rem`,
                    }}
                >
                    <CubeConfigSide
                        key="back"
                        faces={back}
                        faceSize={faceSize}
                        viewMode={SideViewMode.Top}
                        className="col-start-2 flex-row-reverse"
                        style={{ transform: 'rotateX(30deg)' }}
                    />
                    <CubeConfigSide
                        key="left"
                        faces={left}
                        faceSize={faceSize}
                        viewMode={SideViewMode.Top}
                        className="col-start-1 flex-col"
                        style={{ transform: 'rotateY(-30deg)' }}
                    />
                    <CubeConfigSide
                        key="top"
                        faces={top}
                        faceSize={faceSize}
                        viewMode={SideViewMode.Full}
                        className="col-start-2"
                    />
                    <CubeConfigSide
                        key="right"
                        faces={right}
                        faceSize={faceSize}
                        viewMode={SideViewMode.Top}
                        className="col-start-3 flex-col-reverse"
                        style={{ transform: 'rotateY(30deg)' }}
                    />
                    <CubeConfigSide
                        key="front"
                        faces={front}
                        faceSize={faceSize}
                        viewMode={SideViewMode.Top}
                        className="col-start-2 flex-row"
                        style={{ transform: 'rotateX(-30deg)' }}
                    />
                </div>
            )}
        </div>
    );
};

export default React.memo(CubeConfig);
