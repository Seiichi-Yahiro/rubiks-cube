import React, { useCallback, useContext, useState } from 'react';
import { List, ListItemText } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Look2CFOP from '../cube/algorithms/CFOP';
import Category from './Category';
import { IAlgorithm } from '../cube/algorithms/AlgorithmTypes';
import Misc from '../cube/algorithms/Misc';
import { settingsContext } from '../context/SettingsContext';
import { interpretNotation } from '../cube/algorithms/Interpreter';
import Maybe from '../utils/Maybe';

const categories = [Look2CFOP, Misc];

const Algorithms: React.FunctionComponent = () => {
    const [openedMenu, setOpenedMenu] = useState('');
    const onChildClick = useCallback((menu: string) => setOpenedMenu(prevMenu => (prevMenu === menu ? '' : menu)), []);

    return (
        <List disablePadding={true} dense={true}>
            {categories.map(category => (
                <RecursiveChild
                    key={category.name}
                    onClick={onChildClick}
                    isOpen={category.name === openedMenu}
                    name={category.name}
                    children={category.children}
                    notation={category.notation}
                    depth={1}
                />
            ))}
        </List>
    );
};

export default Algorithms;

interface RecursiveChildProps extends IAlgorithm {
    onClick: (menu: string) => void;
    isOpen: boolean;
    depth: number;
}

const RecursiveChild: React.FunctionComponent<RecursiveChildProps> = React.memo(
    ({ name, children, notation, onClick, isOpen, depth }) => {
        const { setSettings, numberOfCubes } = useContext(settingsContext);
        const [openedMenu, setOpenedMenu] = useState('');
        const onChildClick = useCallback(
            (menu: string) => setOpenedMenu(prevMenu => (prevMenu === menu ? '' : menu)),
            []
        );
        const onSelfClick = useCallback(() => onClick(name), [name, onClick]);

        const style = {
            paddingLeft: `${depth * 10 + 16}px`
        };

        if (children.length > 0) {
            return (
                <Category isOpen={isOpen} setMenu={onSelfClick} title={name} style={style}>
                    <List disablePadding={true} dense={true}>
                        {children.map(algorithm => (
                            <RecursiveChild
                                key={algorithm.name}
                                isOpen={algorithm.name === openedMenu}
                                onClick={onChildClick}
                                name={algorithm.name}
                                children={algorithm.children}
                                notation={algorithm.notation}
                                depth={depth + 1}
                            />
                        ))}
                    </List>
                </Category>
            );
        } else {
            const generator = interpretNotation(notation || '', numberOfCubes);
            const maybeGenerator = Maybe.some(generator);

            return (
                <ListItem
                    className="interface-list__item interface-list__item--moves"
                    style={style}
                    button={true}
                    onClick={() => setSettings({ moveGenerator: maybeGenerator })}
                >
                    <ListItemText primary={name} secondary={notation} />
                </ListItem>
            );
        }
    }
);