import { createAction } from '@reduxjs/toolkit';
import { Result } from 'parsimmon';
import { RotationCommand } from '../../cube/algorithms/RotationCommand';

export enum PlayerActionType {
    PLAY_ALGORITHM = 'PLAY_ALGORITHM',
    STOP_ALGORITHM = 'STOP_ALGORITHM',
    PAUSE_ALGORITHM = 'PAUSE_ALGORITHM',
    JUMP_TO_END_OF_ALGORITHM = 'JUMP_TO_END_OF_ALGORITHM',
    UPDATE_NOTATION = 'UPDATE_NOTATION',
    PARSED_NOTATION = 'PARSED_NOTATION',
}

const play = createAction(PlayerActionType.PLAY_ALGORITHM);
const stop = createAction(PlayerActionType.STOP_ALGORITHM);
const pause = createAction(PlayerActionType.PAUSE_ALGORITHM);
const jumpToEnd = createAction(PlayerActionType.JUMP_TO_END_OF_ALGORITHM);
const updateNotation = createAction(
    PlayerActionType.UPDATE_NOTATION,
    (notation: string) => ({
        payload: { notation },
    })
);
const parsedNotation = createAction(
    PlayerActionType.PARSED_NOTATION,
    (rotationCommands: Result<RotationCommand[]>) => ({
        payload: { rotationCommands },
    })
);

const actions = {
    play,
    stop,
    pause,
    jumpToEnd,
    updateNotation,
    parsedNotation,
};

export { actions as playerActions };
