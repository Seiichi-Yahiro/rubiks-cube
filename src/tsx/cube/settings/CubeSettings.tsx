import { Settings } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRedux } from 'src/hooks/redux';
import IconButton from 'src/tsx/components/IconButton';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from 'src/tsx/components/Sheet';
import ColorPicker from 'src/tsx/cube/settings/ColorPicker';
import CubeSelector from 'src/tsx/cube/settings/CubeSelector';
import RotationDurationSlider from 'src/tsx/cube/settings/RotationDurationSlider';

const CubeSettings: React.FC = () => {
    const { t } = useTranslation();
    const rotationDuration = useRedux((state) => state.cube.rotationDuration);

    return (
        <div className="flex flex-row items-center justify-end gap-1">
            <CubeSelector />
            <Sheet>
                <SheetTrigger asChild={true}>
                    <IconButton tooltip={t('settings.title')}>
                        <Settings />
                    </IconButton>
                </SheetTrigger>
                <SheetContent side="right">
                    <SheetTitle>{t('settings.title')}</SheetTitle>
                    <SheetDescription></SheetDescription>
                    <div className="mt-4 flex flex-col gap-4 text-app-text">
                        <div className="flex flex-col gap-1">
                            <div className="font-medium">
                                {t('settings.cube-type')}:
                            </div>
                            <CubeSelector />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="font-medium">
                                <span>{t('settings.rotation-duration')}: </span>
                                <span>{rotationDuration}</span>
                                <span>
                                    {t('settings.rotation-duration-unit')}
                                </span>
                            </div>
                            <RotationDurationSlider />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="font-medium">
                                {t('settings.cube-colors.title')}:
                            </div>
                            <ColorPicker />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default React.memo(CubeSettings);
