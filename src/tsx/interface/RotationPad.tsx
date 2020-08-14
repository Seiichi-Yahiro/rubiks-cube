import React, { useRef } from 'react';
import useDrag from '../hooks/useDrag';
import { useDispatch } from 'react-redux';
import { cubeActions } from '../states/cube/CubeActions';

const RotationPad: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const circleRef = useRef<SVGCircleElement>(null);

    useDrag(circleRef, (delta) =>
        dispatch(cubeActions.updateViewRotation(delta))
    );

    return (
        <svg width={100} height={100}>
            <circle ref={circleRef} r={50} />
        </svg>
    );
};

export default RotationPad;
