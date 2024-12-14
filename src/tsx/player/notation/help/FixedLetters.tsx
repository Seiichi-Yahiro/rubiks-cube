import React from 'react';
import { useTranslation } from 'react-i18next';
import Code from 'src/tsx/components/Code';

const FixedLetters: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-1">
            <div>{t('player.help.fixedLetter.introduction')}</div>
            <div className="grid grid-cols-[auto_auto_auto] gap-1">
                <div>
                    <span>(</span>
                    <Code>L</Code>
                    <span>/</span>
                    <Code>R</Code>
                    <span>):</span>
                </div>
                <div>
                    <Code>M</Code>
                    <span> - </span>
                    <span>{t('player.help.fixedLetter.middle')}</span>
                </div>
                <div>
                    <Code>X</Code>
                    <span> - </span>
                    <span>{t('player.help.fixedLetter.x')}</span>
                </div>
                <div>
                    <span>(</span>
                    <Code>U</Code>
                    <span>/</span>
                    <Code>D</Code>
                    <span>):</span>
                </div>
                <div>
                    <Code>E</Code>
                    <span> - </span>
                    <span>{t('player.help.fixedLetter.equatorial')}</span>
                </div>
                <div>
                    <Code>Y</Code>
                    <span> - </span>
                    <span>{t('player.help.fixedLetter.y')}</span>
                </div>
                <div>
                    <span>(</span>
                    <Code>F</Code>
                    <span>/</span>
                    <Code>B</Code>
                    <span>):</span>
                </div>
                <div>
                    <Code>S</Code>
                    <span> - </span>
                    <span>{t('player.help.fixedLetter.standing')}</span>
                </div>
                <div>
                    <Code>Z</Code>
                    <span> - </span>
                    <span>{t('player.help.fixedLetter.z')}</span>
                </div>
            </div>
            <div>{t('player.help.fixedLetter.case.introduction')}</div>
            <div>{t('player.help.fixedLetter.case.uppercase')}</div>
            <div>{t('player.help.fixedLetter.case.lowercase')}</div>
        </div>
    );
};

export default FixedLetters;
