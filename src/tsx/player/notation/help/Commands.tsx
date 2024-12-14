import React from 'react';
import { useTranslation } from 'react-i18next';
import Code from 'src/tsx/components/Code';

const Commands: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div>{t('player.help.commands.introduction')}</div>
            <div>{t('player.help.commands.parts')}</div>
            <div>{t('player.help.commands.separation')}</div>
            <div className="flex flex-row gap-1">
                <Code>L U F</Code>
                <Code>L,U,F</Code>
                <Code>L, U, F</Code>
            </div>
        </div>
    );
};

export default Commands;
