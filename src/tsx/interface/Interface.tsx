import React, { useCallback, useState } from 'react';
import Settings from './Settings';
import Algorithms from './Algorithms';
import Category from './Category';
import Player from './Player';
import { List } from '@mui/material';
import { Settings as SettingsIcon, ManageSearch } from '@mui/icons-material';

enum Menu {
    ALGORITHMS = 'ALGORITHMS',
    SETTINGS = 'SETTINGS',
    NONE = 'NONE',
}

const Interface: React.FunctionComponent = () => {
    const [openedMenu, setOpenedMenu] = useState(Menu.SETTINGS);
    const setMenu = (menu: Menu) =>
        setOpenedMenu((prevMenu) => (prevMenu === menu ? Menu.NONE : menu));

    return (
        <div className="p-2 md:w-96 self-center md:self-start flex flex-row-reverse md:flex-col">
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
