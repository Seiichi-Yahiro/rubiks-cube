import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRedux } from 'src/hooks/redux';

const NotationStepCounter: React.FC = () => {
    const { t } = useTranslation();

    const totalRotationCommands = useRedux(
        (state) => state.player.totalRotationCommands,
    );

    return (
        <div className="text-sm">
            <span>{t('player.input.steps')}: </span>
            <span>{totalRotationCommands}</span>
        </div>
    );
};

export default React.memo(NotationStepCounter);
