import React from 'react';
import { useTranslation } from 'react-i18next';
import Code from 'src/tsx/components/Code';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from 'src/tsx/components/Tabs';
import MultiLayerReference from 'src/tsx/player/notation/help/MultiLayerReference';
import SingleLayerReference from 'src/tsx/player/notation/help/SingleLayerReference';

const DynamicLetters: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-1">
            <div>{t('player.help.dynamicLetter.introduction')}</div>
            <div className="grid grid-cols-2 gap-1">
                <div>
                    <Code>L</Code>
                    <span> - </span>
                    <span>{t('player.help.dynamicLetter.left')}</span>
                </div>
                <div>
                    <Code>R</Code>
                    <span> - </span>
                    <span>{t('player.help.dynamicLetter.right')}</span>
                </div>
                <div>
                    <Code>U</Code>
                    <span> - </span>
                    <span>{t('player.help.dynamicLetter.top')}</span>
                </div>
                <div>
                    <Code>D</Code>
                    <span> - </span>
                    <span>{t('player.help.dynamicLetter.bottom')}</span>
                </div>
                <div>
                    <Code>F</Code>
                    <span> - </span>
                    <span>{t('player.help.dynamicLetter.front')}</span>
                </div>
                <div>
                    <Code>B</Code>
                    <span> - </span>
                    <span>{t('player.help.dynamicLetter.back')}</span>
                </div>
            </div>
            <div>{t('player.help.dynamicLetter.case.introduction')}</div>
            <div>{t('player.help.dynamicLetter.case.uppercase')}</div>
            <div>{t('player.help.dynamicLetter.case.lowercase')}</div>
            <div>
                {t('player.help.dynamicLetter.layerReference.introduction')}
            </div>
            <div>
                {t(
                    'player.help.dynamicLetter.layerReference.categories.introduction',
                )}
            </div>
            <Tabs defaultValue="single">
                <TabsList>
                    <TabsTrigger value="single">
                        {t(
                            'player.help.dynamicLetter.layerReference.categories.single.title',
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="multiple">
                        {t(
                            'player.help.dynamicLetter.layerReference.categories.multiple.title',
                        )}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="single">
                    <SingleLayerReference />
                </TabsContent>
                <TabsContent value="multiple">
                    <MultiLayerReference />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DynamicLetters;
