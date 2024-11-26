import Close from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="font-mono bg-gray-200 text-gray-900 p-0.5 rounded select-all">
        {children}
    </span>
);

interface NotationHelpProps {
    onClose: () => void;
}

const NotationHelp: React.FC<NotationHelpProps> = ({ onClose }) => {
    const { t } = useTranslation();

    return (
        <div className="px-2 pb-2 max-w-sm sm:max-w-md md:max-w-xl space-y-2">
            <div className="pt-2 flex flex-row space-between items-center sticky top-0 bg-white">
                <div className="flex-1 text-lg font-bold">
                    {t('player.help.notation')}
                </div>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </div>
            <div className="text-sm">{t('player.help.explanation')}</div>
            <div className="flex flex-row flex-wrap gap-2">
                <div>
                    <div className="font-bold">
                        {t('player.help.sliceable')}
                    </div>
                    <div className="text-sm space-y-1">
                        <div>
                            <Code>L</Code> - {t('player.help.left')}
                        </div>
                        <div>
                            <Code>R</Code> - {t('player.help.right')}
                        </div>
                        <div>
                            <Code>U</Code> - {t('player.help.top')}
                        </div>
                        <div>
                            <Code>D</Code> - {t('player.help.bottom')}
                        </div>
                        <div>
                            <Code>F</Code> - {t('player.help.front')}
                        </div>
                        <div>
                            <Code>B</Code> - {t('player.help.back')}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="font-bold">
                        {t('player.help.non-sliceable')}
                    </div>
                    <div className="text-sm space-y-1">
                        <div>
                            <Code>M</Code> - {t('player.help.middle')}
                        </div>
                        <div>
                            <Code>E</Code> - {t('player.help.equatorial')}
                        </div>
                        <div>
                            <Code>S</Code> - {t('player.help.standing')}
                        </div>
                        <div>
                            <Code>X</Code> - {t('player.help.x')}
                        </div>
                        <div>
                            <Code>Y</Code> - {t('player.help.y')}
                        </div>
                        <div>
                            <Code>Z</Code> - {t('player.help.z')}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="font-bold">
                        {t('player.help.modifications')}
                    </div>
                    <div className="text-sm space-y-1">
                        <div>
                            <Code>W</Code> - {t('player.help.wide')}
                        </div>
                        <div>
                            <Code>&apos;</Code> - {t('player.help.prime')}
                        </div>
                        <div>
                            <Code>2</Code> - {t('player.help.double')}
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-1">
                <div className="font-bold">{t('player.help.examples')}</div>
                <div className="text-sm space-y-1">
                    <div>
                        <Code>L</Code> / <Code>L&apos;</Code> / <Code>L2</Code>{' '}
                        / <Code>L&apos;2</Code>
                    </div>
                </div>
            </div>
            <div className="space-y-1">
                <div className="font-bold">{t('player.help.slicing')}</div>
                <div className="text-sm">
                    {t('player.help.slicing-explanation')}
                </div>
            </div>
            <div className="space-y-1">
                <div className="font-bold">{t('player.help.examples')}</div>
                <div className="text-sm space-y-1">
                    <div>
                        <Code>2L</Code> / <Code>2L&apos;</Code> /{' '}
                        <Code>2L2</Code> / <Code>2L&apos;2</Code>
                    </div>
                    <div>
                        <Code>2Lw</Code> / <Code>2Lw&apos;</Code> /{' '}
                        <Code>2Lw2</Code> / <Code>2Lw&apos;2</Code>
                    </div>
                    <div>
                        <Code>[1,2,3]L</Code> / <Code>[1,2,3]L&apos;</Code> /{' '}
                        <Code>[1,2,3]L2</Code> / <Code>[1,2,3]L&apos;2</Code>
                    </div>
                </div>
            </div>
            <div className="space-y-1">
                <div className="font-bold">{t('player.help.loops')}</div>
                <div className="text-sm">
                    {t('player.help.loops-explanation')}
                </div>
            </div>
            <div className="space-y-1">
                <div className="font-bold">{t('player.help.examples')}</div>
                <div className="text-sm space-y-1">
                    <div>
                        <Code>(R U F&apos;)3</Code> /{' '}
                        <Code>(R (U F&apos;)2)3</Code>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(NotationHelp);
