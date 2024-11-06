import React, { useCallback, useState } from 'react';
import Settings from 'src/tsx/interface/Settings';
import Algorithms from 'src/tsx/interface/Algorithms';
import Category from 'src/tsx/interface/Category';
import Player from 'src/tsx/interface/Player';
import { List } from '@mui/material';
import { Settings as SettingsIcon, ManageSearch } from '@mui/icons-material';

enum Menu {
    ALGORITHMS = 'ALGORITHMS',
    SETTINGS = 'SETTINGS',
    NONE = 'NONE',
}

const Interface: React.FC = () => {
    const [openedMenu, setOpenedMenu] = useState(Menu.SETTINGS);
    const setMenu = (menu: Menu) =>
        setOpenedMenu((prevMenu) => (prevMenu === menu ? Menu.NONE : menu));

    return (
        <div className="flex w-full max-w-96 flex-row-reverse self-center p-2 md:w-96 md:flex-col md:self-start">
            <Player />
            <List className="flex flex-row-reverse md:block">
                <Category
                    isOpen={openedMenu === Menu.ALGORITHMS}
                    setMenu={useCallback(() => setMenu(Menu.ALGORITHMS), [])}
                    title="Algorithms"
                    icon={<ManageSearch />}
                >
                    <Algorithms />
                </Category>
                <Category
                    isOpen={openedMenu === Menu.SETTINGS}
                    setMenu={useCallback(() => setMenu(Menu.SETTINGS), [])}
                    title="Settings"
                    icon={<SettingsIcon />}
                >
                    <Settings />
                </Category>
            </List>
        </div>
    );
};

export default Interface;
