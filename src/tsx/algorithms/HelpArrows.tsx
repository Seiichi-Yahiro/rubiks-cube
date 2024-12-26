import React from 'react';
import type { HelpArrow } from 'src/algorithms/algorithmTypes';

interface HelpArrowsProps {
    faceSize: number;
    arrows: HelpArrow[];
}

const HelpArrows: React.FC<HelpArrowsProps> = ({ faceSize, arrows }) => {
    const halfFaceSize = faceSize / 2;

    return (
        <svg className="absolute left-0 top-0 size-full">
            <defs>
                <marker
                    id="arrowhead"
                    viewBox="0 0 5 5"
                    refX="2.5"
                    refY="2.5"
                    markerWidth="3"
                    markerHeight="3"
                    orient="auto-start-reverse"
                >
                    <path
                        d="M 0 0 L 5 2.5 L 0 5 z"
                        className="fill-[--cube-face-inside]"
                    />
                </marker>
            </defs>
            {arrows.map(
                (
                    {
                        from: [fromX, fromY],
                        to: [toX, toY],
                        doubleEnded = false,
                    },
                    index,
                ) => (
                    <line
                        key={index}
                        x1={`${fromX * faceSize + halfFaceSize}rem`}
                        y1={`${fromY * faceSize + halfFaceSize}rem`}
                        x2={`${toX * faceSize + halfFaceSize}rem`}
                        y2={`${toY * faceSize + halfFaceSize}rem`}
                        strokeWidth={`${faceSize * 0.1}rem`}
                        markerStart={
                            doubleEnded ? 'url(#arrowhead)' : undefined
                        }
                        markerEnd="url(#arrowhead)"
                        className="stroke-[--cube-face-inside]"
                    />
                ),
            )}
        </svg>
    );
};

export default React.memo(HelpArrows);
