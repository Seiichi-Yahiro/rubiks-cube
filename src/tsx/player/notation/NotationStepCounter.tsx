import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRedux } from 'src/hooks/redux';
import { PlayerStatus } from 'src/redux/player/playerReducer';

const NotationStepCounter: React.FC = () => {
    const { t } = useTranslation();

    const totalRotationCommands = useRedux(
        (state) => state.player.totalRotationCommands,
    );

    const executedRotationCommands = useRedux(
        (state) => state.player.executedRotationCommands,
    );

    const isExecutingCommands = useRedux((state) =>
        [PlayerStatus.PLAYING, PlayerStatus.PAUSED].includes(
            state.player.status,
        ),
    );

    return (
        <div className="text-sm">
            <span>{t('player.input.steps')}: </span>
            {isExecutingCommands && (
                <>
                    <span>{executedRotationCommands}</span>
                    <span>/</span>
                </>
            )}
            <span>{totalRotationCommands}</span>
        </div>
    );
};

export default React.memo(NotationStepCounter);
