import React, { useState } from 'react';
import { SingleRotationCommand } from 'src/algorithms/rotationCommand';
import { useAppDispatch } from 'src/hooks/redux';
import { playerActions } from 'src/redux/player/playerActions';
import { CubeColorKey, FaceArrowDirection } from 'src/tsx/cube/cubeTypes';
import FaceArrows from 'src/tsx/cube/FaceArrows';
import { Mat4, toCss } from 'src/utils/matrix4';

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
        backgroundColor: `var(${colorKey})`,
        transform: toCss(transform),
    };

    return (
        <div
            className="absolute border-2 border-cube-gray [backface-visibility:hidden] [height:inherit] [width:inherit]"
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {isHovered && colorKey !== CubeColorKey.INSIDE && (
                <FaceArrows rotate={rotate} />
            )}
        </div>
    );
};

export default React.memo(Face);
