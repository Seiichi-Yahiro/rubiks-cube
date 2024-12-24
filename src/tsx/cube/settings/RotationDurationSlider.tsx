import React, { useCallback } from 'react';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import Slider from 'src/tsx/components/Slider';

const RotationDurationSlider: React.FC = () => {
    const dispatch = useAppDispatch();
    const rotationAnimationSpeed = useRedux(
        (state) => state.cube.rotationDuration,
    );

    const onChange = useCallback(
        ([value]: number[]) => {
            dispatch(cubeActions.setRotationAnimationSpeed(value));
        },
        [dispatch],
    );

    return (
        <Slider
            value={[rotationAnimationSpeed]}
            onValueChange={onChange}
            min={100}
            max={2000}
            step={50}
        />
    );
};

export default React.memo(RotationDurationSlider);
