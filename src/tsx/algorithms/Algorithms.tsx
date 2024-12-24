import { ArrowRight } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ollCornersOne,
    ollCornersTwo,
    ollCornersZero,
    ollEdges,
} from 'src/algorithms/x3x3x3/cfop/oll';
import {
    pllEdgesOne,
    pllEdgesZero,
    pllOneCorner,
} from 'src/algorithms/x3x3x3/cfop/pll';
import { parity } from 'src/algorithms/x4x4x4/parity';
import AlgorithmGroup from 'src/tsx/algorithms/AlgorithmGroup';
import { ViewMode } from 'src/tsx/algorithms/CubeConfig';
import { ScrollArea } from 'src/tsx/components/ScrollArea';
import { Switch } from 'src/tsx/components/Switch';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from 'src/tsx/components/Tabs';

interface AlgorithmProps {
    className?: string;
}

const Algorithms: React.FC<AlgorithmProps> = ({ className }) => {
    const [viewMode, setViewMode] = useState(ViewMode.Top);

    const onToggleViewMode = useCallback((checked: boolean) => {
        setViewMode(checked ? ViewMode.D3 : ViewMode.Top);
    }, []);

    const { t } = useTranslation();

    const tabStepArrow = (
        <div className="flex items-center">
            <ArrowRight className="size-4 stroke-app-text" />
        </div>
    );

    return (
        <Tabs defaultValue="3x3x3" className={className}>
            <TabsList className="justify-between">
                <div className="flex flex-row gap-0.5">
                    <TabsTrigger value="3x3x3">
                        {t('algorithm.3x3x3.title')}
                    </TabsTrigger>
                    <TabsTrigger value="4x4x4">
                        {t('algorithm.4x4x4.title')}
                    </TabsTrigger>
                </div>
                <div className="flex scale-90 items-center justify-center rounded-md border border-app-border bg-app-bg px-2 py-1">
                    <div className="text-sm">{t('algorithm.3d-switch')}</div>
                    <Switch
                        defaultChecked={false}
                        onCheckedChange={onToggleViewMode}
                        className="scale-75"
                    />
                </div>
            </TabsList>
            <TabsContent value="3x3x3" hasSubTabs={true}>
                <ScrollArea className="h-96">
                    <Tabs defaultValue="oll-step-1">
                        <TabsList>
                            <TabsTrigger value="oll-step-1">
                                {t('algorithm.3x3x3.oll.step-1')}
                            </TabsTrigger>
                            {tabStepArrow}
                            <TabsTrigger value="oll-step-2">
                                {t('algorithm.3x3x3.oll.step-2')}
                            </TabsTrigger>
                            {tabStepArrow}
                            <TabsTrigger value="pll-step-1">
                                {t('algorithm.3x3x3.pll.step-1')}
                            </TabsTrigger>
                            {tabStepArrow}
                            <TabsTrigger value="pll-step-2">
                                {t('algorithm.3x3x3.pll.step-2')}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="oll-step-1" isSubTabsContent={true}>
                            <div className="flex flex-col gap-2">
                                <AlgorithmGroup
                                    group={ollEdges}
                                    viewMode={viewMode}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="oll-step-2" isSubTabsContent={true}>
                            <div className="flex flex-col gap-2">
                                <AlgorithmGroup
                                    group={ollCornersZero}
                                    viewMode={viewMode}
                                />
                                <AlgorithmGroup
                                    group={ollCornersOne}
                                    viewMode={viewMode}
                                />
                                <AlgorithmGroup
                                    group={ollCornersTwo}
                                    viewMode={viewMode}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="pll-step-1" isSubTabsContent={true}>
                            <div className="flex flex-col gap-2">
                                <AlgorithmGroup
                                    group={pllOneCorner}
                                    viewMode={viewMode}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="pll-step-2" isSubTabsContent={true}>
                            <div className="flex flex-col gap-2">
                                <AlgorithmGroup
                                    group={pllEdgesZero}
                                    viewMode={viewMode}
                                />
                                <AlgorithmGroup
                                    group={pllEdgesOne}
                                    viewMode={viewMode}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </ScrollArea>
            </TabsContent>
            <TabsContent value="4x4x4">
                <ScrollArea className="h-96">
                    <AlgorithmGroup group={parity} viewMode={viewMode} />
                </ScrollArea>
            </TabsContent>
        </Tabs>
    );
};

export default Algorithms;
