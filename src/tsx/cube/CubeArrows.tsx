import React from 'react';
import Arrow from './Arrow';
import './Arrows.scss';
import { Direction } from './CubeTypes';
import { makeNotationParser } from './algorithms/Parser';
import { useDispatch } from 'react-redux';
import { playerActions } from '../states/player/PlayerActions';

enum Side {
    FRONT = 'rotateY(0deg)',
    RIGHT = 'rotateY(90deg)',
}

interface ICubeArrowsProps {
    size: number;
    cubicleSize: number;
    cubeDimension: number;
}

const CubeArrows: React.FunctionComponent<ICubeArrowsProps> = ({
    size,
    cubicleSize,
    cubeDimension,
}) => {
    const dispatch = useDispatch();

    const halfSize = size / 2;

    const style = (side: Side, direction: Direction): React.CSSProperties => {
        return {
            width: cubicleSize,
            transform: `${side} translate3d(0, ${halfSize}px, ${halfSize}px) rotateX(-90deg) translateY(-${
                cubicleSize / 2
            }px) rotateZ(${90 * direction}deg) translateY(-${
                cubicleSize * (cubeDimension / 2 - 0.5)
            }px)`,
            cursor: 'pointer',
            position: 'absolute',
        };
    };

    const yStyle = (side: Side, direction: Direction): React.CSSProperties => ({
        width: cubicleSize,
        transform: `${side} rotateZ(${90 * direction}deg) translate3d(0, -${
            cubicleSize * (cubeDimension / 2 + 0.5)
        }px, ${halfSize}px)`,
        cursor: 'pointer',
        position: 'absolute',
    });

    const arrow = (
        <svg className="cube-arrows-svg" viewBox="-50 -50 100 100">
            <Arrow className="cube-arrow" />
        </svg>
    );

    const rotateWithNotation = (notation: string) => {
        const parser = makeNotationParser(cubeDimension).rotationCommands;
        const command = parser.tryParse(notation);
        dispatch(playerActions.play(command));
    };

    return (
        <div className="display-contents">
            <div
                onClick={() => rotateWithNotation("Z'")}
                style={style(Side.FRONT, Direction.ANTI_CLOCKWISE)}
            >
                {arrow}
            </div>
            <div
                onClick={() => rotateWithNotation('Z')}
                style={style(Side.FRONT, Direction.CLOCKWISE)}
            >
                {arrow}
            </div>
            <div
                onClick={() => rotateWithNotation("X'")}
                style={style(Side.RIGHT, Direction.ANTI_CLOCKWISE)}
            >
                {arrow}
            </div>
            <div
                onClick={() => rotateWithNotation('X')}
                style={style(Side.RIGHT, Direction.CLOCKWISE)}
            >
                {arrow}
            </div>
            <div
                onClick={() => rotateWithNotation("Y'")}
                style={yStyle(Side.RIGHT, Direction.CLOCKWISE)}
            >
                {arrow}
            </div>
            <div
                onClick={() => rotateWithNotation('Y')}
                style={yStyle(Side.FRONT, Direction.ANTI_CLOCKWISE)}
            >
                {arrow}
            </div>
        </div>
    );
};

export default React.memo(CubeArrows);
