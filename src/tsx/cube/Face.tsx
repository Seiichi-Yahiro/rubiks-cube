import React, { useState } from 'react';
import { Color, FaceArrowDirection } from './CubeTypes';
import { Mat4, toCss } from '../utils/Matrix4';
import FaceArrows from './FaceArrows';
import { SingleRotationCommand } from './algorithms/RotationCommand';
import { useDispatch } from 'react-redux';
import { playerActions } from '../states/player/PlayerActions';

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

    const rotate = (faceArrow: FaceArrowDirection) =>
        dispatch(
            playerActions.setCurrentRotationCommand(
                generateArrowCommand(faceArrow)
            )
        );

    const onMouseEnter = () => setHovered(true);
    const onMouseLeave = () => setHovered(false);

    const style: React.CSSProperties = {
        backgroundColor: color,
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
                color !== Color.DEFAULT &&
                color !== Color.TRANSPARENT && <FaceArrows rotate={rotate} />}
        </div>
    );
};

export default React.memo(Face);
