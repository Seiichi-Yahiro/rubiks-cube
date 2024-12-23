import List from '@mui/material/List';
import { SettingsIcon } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Algorithms from 'src/tsx/algorithms/Algorithms';
import Settings from 'src/tsx/interface/Settings';
import LanguageSelector from 'src/tsx/locales/LanguageSelector';
import Player from 'src/tsx/player/Player';
import Category from './Category';

enum Menu {
    ALGORITHMS = 'ALGORITHMS',
    SETTINGS = 'SETTINGS',
    NONE = 'NONE',
}

const Interface: React.FC = () => {
    const { t } = useTranslation();
    const [openedMenu, setOpenedMenu] = useState(Menu.SETTINGS);
    const setMenu = (menu: Menu) =>
        setOpenedMenu((prevMenu) => (prevMenu === menu ? Menu.NONE : menu));

    return (
        <div className="flex w-full max-w-96 flex-row-reverse self-center p-2 md:w-96 md:flex-col md:self-start">
            <Player />
            <Algorithms />
            <LanguageSelector />
            <List className="flex flex-row-reverse md:block">
                <Category
                    isOpen={openedMenu === Menu.SETTINGS}
                    setMenu={useCallback(() => setMenu(Menu.SETTINGS), [])}
                    title={t('interface.settings.title')}
                    icon={<SettingsIcon />}
                >
                    <Settings />
                </Category>
            </List>
        </div>
    );
};

export default Interface;
