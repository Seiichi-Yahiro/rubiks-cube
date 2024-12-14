import React from 'react';
import { useTranslation } from 'react-i18next';
import Code from 'src/tsx/components/Code';
import Commands from 'src/tsx/player/notation/help/Commands';
import LayerLetterGroups from 'src/tsx/player/notation/help/LayerLetterGroups';
import Loops from 'src/tsx/player/notation/help/Loops';
import Modifications from 'src/tsx/player/notation/help/Modifications';

const NotationHelp: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-4 text-wrap text-sm">
            <Commands />
            <div>
                <span>{t('player.help.defaultRotation')}</span>
                <span> </span>
                <Code>&apos;</Code>
                <span>.</span>
            </div>
            <LayerLetterGroups />
            <Modifications />
            <Loops />
        </div>
    );
};

export default React.memo(NotationHelp);
