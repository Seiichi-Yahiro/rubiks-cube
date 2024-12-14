import React from 'react';
import { useTranslation } from 'react-i18next';
import Code from 'src/tsx/components/Code';

const MultiLayerReference: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-1">
            <div>
                <Code>[2]L</Code>
                <span> - </span>
                <span>
                    {t(
                        'player.help.dynamicLetter.layerReference.categories.multiple.same',
                    )}
                </span>
                <span> </span>
                <Code>2L</Code>
            </div>
            <div>
                <Code>[1,3]U</Code>
                <span> - </span>
                <span>
                    {t(
                        'player.help.dynamicLetter.layerReference.categories.multiple.example2',
                    )}
                </span>
                <span> </span>
                <Code>U</Code>
            </div>
            <div>
                <Code>[3,1,2]F</Code>
                <span> - </span>
                <span>
                    {t(
                        'player.help.dynamicLetter.layerReference.categories.multiple.example3',
                    )}
                </span>
                <span> </span>
                <Code>F</Code>
            </div>
        </div>
    );
};

export default MultiLayerReference;
