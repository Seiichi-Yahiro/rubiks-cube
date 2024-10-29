import React, { useCallback, useState } from 'react';
import { List, ListItem } from '@mui/material';
import Settings from './Settings';
import Algorithms from './Algorithms';
import Category from './Category';
import Player from './Player';

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
        <div className="absolute left-0 top-0 w-96">
            <List>
                <ListItem className="!bg-white">
                    <Player />
                </ListItem>
                <Category
                    isOpen={openedMenu === Menu.ALGORITHMS}
                    setMenu={useCallback(() => setMenu(Menu.ALGORITHMS), [])}
                    title="Algorithms"
                >
                    <Algorithms />
                </Category>
                <Category
                    isOpen={openedMenu === Menu.SETTINGS}
                    setMenu={useCallback(() => setMenu(Menu.SETTINGS), [])}
                    title="Settings"
                >
                    <Settings />
                </Category>
            </List>
        </div>
    );
};

export default Interface;
