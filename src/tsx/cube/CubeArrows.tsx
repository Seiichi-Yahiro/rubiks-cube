import React from 'react';
import Arrow from 'src/tsx/cube/Arrow';
import { Direction } from 'src/tsx/cube/cubeTypes';
import { makeNotationParser } from 'src/algorithms/parser';
import { useAppDispatch } from 'src/hooks/redux';
import { playerActions } from 'src/redux/player/playerActions';

enum Side {
    FRONT = 'rotateY(0deg)',
    RIGHT = 'rotateY(90deg)',
}

interface ICubeArrowsProps {
    size: number;
    cubicleSize: number;
    cubeDimension: number;
}

const CubeArrows: React.FC<ICubeArrowsProps> = ({
    size,
    cubicleSize,
    cubeDimension,
}) => {
    const dispatch = useAppDispatch();

    const halfSize = size / 2;

    const style = (side: Side, direction: Direction): React.CSSProperties => ({
        width: cubicleSize,
        transform: `${side} translate3d(0, ${halfSize}px, ${halfSize}px) rotateX(-90deg) translateY(-${
            cubicleSize / 2
        }px) rotateZ(${90 * direction}deg) translateY(-${
            cubicleSize * (cubeDimension / 2 - 0.5)
        }px) scale(0.5)`,
    });

    const yStyle = (side: Side, direction: Direction): React.CSSProperties => ({
        width: cubicleSize,
        transform: `${side} rotateZ(${90 * direction}deg) translate3d(0, -${
            cubicleSize * (cubeDimension / 2 + 0.5)
        }px, ${halfSize}px) scale(0.5)`,
    });

    const arrow = (
        <svg
            className="group/svg-cube-arrow group-[.is-transitioning]/transitioning:hidden"
            viewBox="-50 -50 100 100"
        >
            <Arrow className="opacity-20 group-hover/svg-cube-arrow:opacity-100" />
        </svg>
    );

    const rotateWithNotation = (notation: string) => {
        const parser = makeNotationParser(cubeDimension).rotationCommands;
        const command = parser.tryParse(notation);
        dispatch(playerActions.play(command));
    };

    return (
        <div className="contents">
            <div
                onClick={() => rotateWithNotation("Z'")}
                style={style(Side.FRONT, Direction.ANTI_CLOCKWISE)}
                className="absolute cursor-pointer"
            >
                {arrow}
            </div>
            <div
                onClick={() => rotateWithNotation('Z')}
                style={style(Side.FRONT, Direction.CLOCKWISE)}
                className="absolute cursor-pointer"
            >
                {arrow}
            </div>
            <div
                onClick={() => rotateWithNotation("X'")}
                style={style(Side.RIGHT, Direction.ANTI_CLOCKWISE)}
                className="absolute cursor-pointer"
            >
                {arrow}
            </div>
            <div
                onClick={() => rotateWithNotation('X')}
                style={style(Side.RIGHT, Direction.CLOCKWISE)}
                className="absolute cursor-pointer"
            >
                {arrow}
            </div>
            <div
                onClick={() => rotateWithNotation("Y'")}
                style={yStyle(Side.RIGHT, Direction.CLOCKWISE)}
                className="absolute cursor-pointer"
            >
                {arrow}
            </div>
            <div
                onClick={() => rotateWithNotation('Y')}
                style={yStyle(Side.FRONT, Direction.ANTI_CLOCKWISE)}
                className="absolute cursor-pointer"
            >
                {arrow}
            </div>
        </div>
    );
};

export default React.memo(CubeArrows);
