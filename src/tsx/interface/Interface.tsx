import React, { useCallback, useState } from 'react';
import List from '@material-ui/core/List';
import Settings from './Settings';
import './Interface.scss';
import Algorithms from './Algorithms';
import Category from './Category';

enum Menu {
    ALGORITHMS = 'ALGORITHMS',
    SETTINGS = 'SETTINGS',
    NONE = 'NONE'
}

const Interface: React.FunctionComponent = () => {
    const [openedMenu, setOpenedMenu] = useState(Menu.SETTINGS);
    const setMenu = (menu: Menu) => setOpenedMenu(prevMenu => (prevMenu === menu ? Menu.NONE : menu));

    return (
        <div className="app__interface">
            <List>
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
