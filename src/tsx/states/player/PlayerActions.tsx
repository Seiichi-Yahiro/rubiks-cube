import { createAction } from '@reduxjs/toolkit';

export enum PlayerActionType {
    PLAY_ALGORITHM = 'PLAY_ALGORITHM',
    STOP_ALGORITHM = 'STOP_ALGORITHM',
    PAUSE_ALGORITHM = 'PAUSE_ALGORITHM',
    JUMP_TO_END_OF_ALGORITHM = 'JUMP_TO_END_OF_ALGORITHM',
    RESET_CUBE = 'RESET_CUBE',
    UPDATE_NOTATION = 'UPDATE_NOTATION',
}

const play = createAction(PlayerActionType.PLAY_ALGORITHM);
const stop = createAction(PlayerActionType.STOP_ALGORITHM);
const pause = createAction(PlayerActionType.PAUSE_ALGORITHM);
const jumpToEnd = createAction(PlayerActionType.JUMP_TO_END_OF_ALGORITHM);
const resetCube = createAction(PlayerActionType.RESET_CUBE);
const updateNotation = createAction(PlayerActionType.UPDATE_NOTATION, (notation: string) => ({
    payload: { notation },
}));

const actions = {
    play,
    stop,
    pause,
    jumpToEnd,
    resetCube,
    updateNotation,
};

export { actions as playerActions };
