import React from 'react';
import { useTranslation } from 'react-i18next';
import Code from 'src/tsx/components/Code';

const Modifications: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div>{t('player.help.modification.introduction')}</div>
            <div className="flex flex-col gap-1">
                <div>
                    <Code>&apos;</Code>
                    <span> - </span>
                    <span>{t('player.help.modification.prime')}</span>
                </div>
                <div>
                    <Code>2</Code>
                    <span> - </span>
                    <span>{t('player.help.modification.2')}</span>
                </div>
            </div>
        </div>
    );
};

export default Modifications;
