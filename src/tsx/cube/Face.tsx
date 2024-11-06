import React, { useState } from 'react';
import { SingleRotationCommand } from 'src/algorithms/rotationCommand';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import { playerActions } from 'src/redux/player/playerActions';
import { Color, FaceArrowDirection } from 'src/tsx/cube/cubeTypes';
import FaceArrows from 'src/tsx/cube/FaceArrows';
import { Mat4, toCss } from 'src/utils/matrix4';

interface IFaceProps {
    transform: Mat4;
    color: Color;
    generateArrowCommand: (
        faceArrow: FaceArrowDirection,
    ) => SingleRotationCommand;
}

const Face: React.FC<IFaceProps> = ({
    transform,
    color,
    generateArrowCommand,
}) => {
    const [isHovered, setHovered] = useState(false);
    const dispatch = useAppDispatch();
    const colorMap = useRedux((state) => state.cube.colorMap);

    const rotate = (faceArrow: FaceArrowDirection) =>
        dispatch(playerActions.play([generateArrowCommand(faceArrow)]));

    const onMouseEnter = () => setHovered(true);
    const onMouseLeave = () => setHovered(false);

    const style: React.CSSProperties = {
        backgroundColor: colorMap[color],
        transform: toCss(transform),
    };

    return (
        <div
            className="absolute border-2 border-cube-gray [backface-visibility:hidden] [height:inherit] [width:inherit]"
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {isHovered &&
                color !== colorMap[Color.DEFAULT] &&
                color !== colorMap[Color.TRANSPARENT] && (
                    <FaceArrows rotate={rotate} />
                )}
        </div>
    );
};

export default React.memo(Face);
