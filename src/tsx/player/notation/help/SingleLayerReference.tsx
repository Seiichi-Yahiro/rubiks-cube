import React from 'react';
import { useTranslation } from 'react-i18next';
import Code from 'src/tsx/components/Code';

const SingleLayerReference: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
                <div>
                    <Code>1L</Code>
                    <span> - </span>
                    <span>
                        {t(
                            'player.help.dynamicLetter.layerReference.categories.single.same',
                        )}
                    </span>
                    <span> </span>
                    <Code>L</Code>
                </div>
                <div>
                    <Code>2U</Code>
                    <span> - </span>
                    <span>
                        {t(
                            'player.help.dynamicLetter.layerReference.categories.single.example2',
                        )}
                    </span>
                    <span> </span>
                    <Code>U</Code>
                </div>
                <div>
                    <Code>3F</Code>
                    <span> - </span>
                    <span>
                        {t(
                            'player.help.dynamicLetter.layerReference.categories.single.example3',
                        )}
                    </span>
                    <span> </span>
                    <Code>F</Code>
                </div>
            </div>
            <div>
                <span>
                    {t(
                        'player.help.dynamicLetter.layerReference.categories.single.wide.explanationStart',
                    )}
                </span>
                <span> </span>
                <Code>W</Code>
                <span>/</span>
                <Code>w</Code>
                <span> </span>
                <span>
                    {t(
                        'player.help.dynamicLetter.layerReference.categories.single.wide.explanationEnd',
                    )}
                </span>
            </div>
            <div>
                <Code>4FW</Code>
                <span> - </span>
                <span>
                    {t(
                        'player.help.dynamicLetter.layerReference.categories.single.wide.example',
                    )}
                </span>
                <span> </span>
                <Code>F</Code>
            </div>
        </div>
    );
};

export default SingleLayerReference;
