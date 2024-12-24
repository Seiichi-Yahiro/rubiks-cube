import { Settings } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from 'src/tsx/components/IconButton';
import CubeSelector from 'src/tsx/cube/settings/CubeSelector';

const CubeSettings: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-row items-center justify-end gap-1">
            <CubeSelector />
            <IconButton tooltip={t('settings.title')}>
                <Settings />
            </IconButton>
        </div>
    );
};

export default React.memo(CubeSettings);
