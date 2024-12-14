import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from 'src/tsx/components/Tabs';
import DynamicLetters from 'src/tsx/player/notation/help/DynamicLetters';
import FixedLetters from 'src/tsx/player/notation/help/FixedLetters';

const LayerLetterGroups: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div>{t('player.help.layerLetterGroups')}</div>
            <Tabs
                defaultValue="dynamic"
                className="rounded-md border border-cube-gray/20 p-1"
            >
                <TabsList className="sticky top-0 bg-white">
                    <TabsTrigger value="dynamic">
                        {t('player.help.dynamicLetter.title')}
                    </TabsTrigger>
                    <TabsTrigger value="fixed">
                        {t('player.help.fixedLetter.title')}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="dynamic">
                    <DynamicLetters />
                </TabsContent>
                <TabsContent value="fixed">
                    <FixedLetters />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default LayerLetterGroups;
