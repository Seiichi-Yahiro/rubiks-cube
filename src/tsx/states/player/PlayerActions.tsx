import { createAction } from '@reduxjs/toolkit';
import { Result } from 'parsimmon';
import {
    RotationCommand,
    SingleRotationCommand,
} from '../../cube/algorithms/RotationCommand';

export enum PlayerActionType {
    PLAY_ALGORITHM = 'PLAY_ALGORITHM',
    STOP_ALGORITHM = 'STOP_ALGORITHM',
    PAUSE_ALGORITHM = 'PAUSE_ALGORITHM',
    UPDATE_NOTATION = 'UPDATE_NOTATION',
    PARSED_NOTATION = 'PARSED_NOTATION',
    SET_CURRENT_ROTATION_COMMAND = 'SET_CURRENT_ROTATION_COMMAND',
}

const play = createAction(PlayerActionType.PLAY_ALGORITHM);
const stop = createAction(PlayerActionType.STOP_ALGORITHM);
const pause = createAction(PlayerActionType.PAUSE_ALGORITHM);

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

const setCurrentRotationCommand = createAction(
    PlayerActionType.SET_CURRENT_ROTATION_COMMAND,
    (command?: SingleRotationCommand) => ({
        payload: { command },
    })
);

const actions = {
    play,
    stop,
    pause,
    updateNotation,
    parsedNotation,
    setCurrentRotationCommand,
};

export { actions as playerActions };
