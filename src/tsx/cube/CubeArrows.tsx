import React from 'react';
import { D3Group } from './D3';
import Arrow from './Arrow';
import './Arrows.scss';
import { Direction } from './CubeTypes';
import { interpretNotation } from './algorithms/Interpreter';

enum Side {
    FRONT = 'rotateY(0deg)',
    RIGHT = 'rotateY(90deg)'
}

interface CubeArrowsProps {
    size: number;
    sizeOfCube: number;
    numberOfCubes: number;
    rotate: (axes: D3Group) => void;
}

const CubeArrows: React.FunctionComponent<CubeArrowsProps> = ({ size, sizeOfCube, numberOfCubes, rotate }) => {
    const halfSize = size / 2;
    const style = (side: Side, direction: Direction): React.CSSProperties => {
        return {
            width: sizeOfCube,
            transform: `${side} translate3d(0, ${halfSize}px, ${halfSize}px) rotateX(-90deg) translateY(-${sizeOfCube /
                2}px) rotateZ(${90 * direction}deg) translateY(-${sizeOfCube * (numberOfCubes / 2 - 0.5)}px)`,
            cursor: 'pointer',
            position: 'absolute'
        };
    };

    const yStyle = (side: Side, direction: Direction): React.CSSProperties => ({
        width: sizeOfCube,
        transform: `${side} rotateZ(${90 * direction}deg) translate3d(0, -${sizeOfCube *
            (numberOfCubes / 2 + 0.5)}px, ${halfSize}px)`,
        cursor: 'pointer',
        position: 'absolute'
    });

    const arrow = (
        <svg className="cube-arrows-svg" viewBox="-50 -50 100 100">
            <Arrow className="cube-arrow" />
        </svg>
    );

    const rotateWithNotation = (notation: string) => rotate([...interpretNotation(notation, numberOfCubes)][0]);

    return (
        <div className="cube-arrows-svg__wrapper">
            <div onClick={() => rotateWithNotation("Z'")} style={style(Side.FRONT, Direction.ANTI_CLOCKWISE)}>
                {arrow}
            </div>
            <div onClick={() => rotateWithNotation('Z')} style={style(Side.FRONT, Direction.CLOCKWISE)}>
                {arrow}
            </div>
            <div onClick={() => rotateWithNotation("X'")} style={style(Side.RIGHT, Direction.ANTI_CLOCKWISE)}>
                {arrow}
            </div>
            <div onClick={() => rotateWithNotation('X')} style={style(Side.RIGHT, Direction.CLOCKWISE)}>
                {arrow}
            </div>
            <div onClick={() => rotateWithNotation("Y'")} style={yStyle(Side.RIGHT, Direction.CLOCKWISE)}>
                {arrow}
            </div>
            <div onClick={() => rotateWithNotation('Y')} style={yStyle(Side.FRONT, Direction.ANTI_CLOCKWISE)}>
                {arrow}
            </div>
        </div>
    );
};

export default React.memo(CubeArrows);
