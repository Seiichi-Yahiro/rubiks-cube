import React, { useState } from 'react';
import { Color, FaceArrowDirection } from './CubeTypes';
import { Mat4, toCss } from '../utils/Matrix4';
import FaceArrows from './FaceArrows';
import { SingleRotationCommand } from './algorithms/RotationCommand';
import { useDispatch } from 'react-redux';
import { playerActions } from '../states/player/PlayerActions';
import { useRedux } from '../states/States';

interface IFaceProps {
    transform: Mat4;
    color: Color;
    generateArrowCommand: (
        faceArrow: FaceArrowDirection
    ) => SingleRotationCommand;
}

const Face: React.FunctionComponent<IFaceProps> = ({
    transform,
    color,
    generateArrowCommand,
}) => {
    const [isHovered, setHovered] = useState(false);
    const dispatch = useDispatch();
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
            className="rubiks-cube__face"
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
