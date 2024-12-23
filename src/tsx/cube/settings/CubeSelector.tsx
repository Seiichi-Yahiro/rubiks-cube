import { range } from 'lodash';
import React, { useCallback } from 'react';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'src/tsx/components/Select';

const CubeSelector: React.FC = () => {
    const dispatch = useAppDispatch();
    const size = useRedux((state) => state.cube.dimension);
    const playerStatus = useRedux((state) => state.player.status);

    const onValueChange = useCallback(
        (value: string) => {
            dispatch(cubeActions.setCubeDimension(Number(value)));
        },
        [dispatch],
    );

    return (
        <Select
            value={size.toString()}
            onValueChange={onValueChange}
            disabled={playerStatus !== PlayerStatus.STOPPED}
        >
            <SelectTrigger className="w-24">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {range(1, 6).map((size) => (
                    <SelectItem
                        key={size}
                        value={size.toString()}
                    >{`${size}x${size}x${size}`}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default React.memo(CubeSelector);
