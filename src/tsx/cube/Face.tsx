import React, { useState } from 'react';
import { SingleRotationCommand } from 'src/algorithms/rotationCommand';
import { useAppDispatch } from 'src/hooks/redux';
import { playerActions } from 'src/redux/player/playerActions';
import {
    CubeColorKey,
    cubeColorKeyToClassName,
    FaceArrowDirection,
} from 'src/tsx/cube/cubeTypes';
import FaceArrows from 'src/tsx/cube/FaceArrows';
import cn from 'src/utils/cn';
import { Mat4, toCss } from 'src/utils/matrix4';
import './Face.css';

interface IFaceProps {
    transform: Mat4;
    colorKey: CubeColorKey;
    generateArrowCommand: (
        faceArrow: FaceArrowDirection,
    ) => SingleRotationCommand;
}

const Face: React.FC<IFaceProps> = ({
    transform,
    colorKey,
    generateArrowCommand,
}) => {
    const [isHovered, setHovered] = useState(false);
    const dispatch = useAppDispatch();

    const rotate = (faceArrow: FaceArrowDirection) =>
        dispatch(playerActions.play([generateArrowCommand(faceArrow)]));

    const onMouseEnter = () => setHovered(true);
    const onMouseLeave = () => setHovered(false);

    const style: React.CSSProperties = {
        transform: toCss(transform),
    };

    return (
        <div
            className={cn(
                'cube-face-border absolute size-[inherit] border-2 [backface-visibility:hidden]',
                cubeColorKeyToClassName(colorKey),
            )}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {isHovered &&
                colorKey !== CubeColorKey.INSIDE &&
                colorKey !== CubeColorKey.UNKNOWN && (
                    <FaceArrows rotate={rotate} />
                )}
        </div>
    );
};

export default React.memo(Face);
