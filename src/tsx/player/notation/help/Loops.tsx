import React from 'react';
import { useTranslation } from 'react-i18next';
import Code from 'src/tsx/components/Code';

const Loops: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div>{t('player.help.loops.introduction')}</div>
            <div className="flex flex-col gap-1">
                <div>
                    <Code>(F U)3</Code>
                    <span> - </span>
                    <span>{t('player.help.loops.repeat')}</span>
                    <span> </span>
                    <Code>F U</Code>
                    <span> </span>
                    <span>{t('player.help.loops.3times')}</span>
                </div>
                <div>
                    <Code>(F (U R)2)3</Code>
                    <span> - </span>
                    <span>{t('player.help.loops.repeat')}</span>
                    <span> </span>
                    <Code>F (U R)2</Code>
                    <span> </span>
                    <span>{t('player.help.loops.3times')}</span>
                </div>
                <div>
                    <Code>(F U)1</Code>
                    <span> - </span>
                    <span>{t('player.help.loops.same')}</span>
                    <span> </span>
                    <Code>F U</Code>
                </div>
            </div>
        </div>
    );
};

export default Loops;
