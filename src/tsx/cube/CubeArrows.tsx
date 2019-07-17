import React from 'react';
import D3 from './D3';
import { Move } from './Moves';
import Arrow from './Arrow';
import './Arrows.scss';
import { Direction } from './CubeTypes';

enum Side {
    FRONT = 'rotateY(0deg)',
    RIGHT = 'rotateY(90deg)'
}

interface CubeArrowsProps {
    size: number;
    sizeOfCube: number;
    numberOfCubes: number;
    rotate: (axis: D3, allAxes: boolean) => void;
}

const CubeArrows: React.FunctionComponent<CubeArrowsProps> = ({ size, sizeOfCube, numberOfCubes, rotate }) => {
    const style = (side: Side, direction: Direction): React.CSSProperties => {
        const halfSize = size / 2;
        return {
            width: sizeOfCube,
            transform: `${side} translate3d(0, ${halfSize}px, ${halfSize}px) rotateX(-90deg) translateY(-${sizeOfCube /
                2}px) rotateZ(${90 * direction}deg) translateY(-${sizeOfCube * (numberOfCubes / 2 - 0.5)}px)`,
            cursor: 'pointer',
            position: 'absolute'
        };
    };

    const arrow = (
        <svg className="cube-arrows-svg" viewBox="-50 -50 100 100">
            <Arrow className="cube-arrow" />
        </svg>
    );

    return (
        <div className="cube-arrows-svg__wrapper">
            <div
                onClick={() => rotate(D3.fromMove(Move.FP, numberOfCubes), true)}
                style={style(Side.FRONT, Direction.ANTI_CLOCKWISE)}
            >
                {arrow}
            </div>
            <div
                onClick={() => rotate(D3.fromMove(Move.F, numberOfCubes), true)}
                style={style(Side.FRONT, Direction.CLOCKWISE)}
            >
                {arrow}
            </div>
            <div
                onClick={() => rotate(D3.fromMove(Move.RP, numberOfCubes), true)}
                style={style(Side.RIGHT, Direction.ANTI_CLOCKWISE)}
            >
                {arrow}
            </div>
            <div
                onClick={() => rotate(D3.fromMove(Move.R, numberOfCubes), true)}
                style={style(Side.RIGHT, Direction.CLOCKWISE)}
            >
                {arrow}
            </div>
        </div>
    );
};

export default React.memo(CubeArrows);
