import React, { useCallback, useState } from 'react';
import { List, ListItemText } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Look2CFOP from '../cube/algorithms/CFOP';
import Category from './Category';
import { IAlgorithm } from '../cube/algorithms/AlgorithmTypes';
import Misc from '../cube/algorithms/Misc';

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
                    moves={category.moves}
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
    ({ name, children, moves, onClick, isOpen, depth }) => {
        const [openedMenu, setOpenedMenu] = useState('');
        const onChildClick = useCallback(
            (menu: string) => setOpenedMenu(prevMenu => (prevMenu === menu ? '' : menu)),
            []
        );
        const onSelfClick = useCallback(() => onClick(name), [name, onClick]);

        const style = {
            paddingLeft: `${depth * 10 + 16}px`
        };

        const node = (
            <Category isOpen={isOpen} setMenu={onSelfClick} title={name} style={style}>
                <List disablePadding={true} dense={true}>
                    {children.map(algorithm => (
                        <RecursiveChild
                            key={algorithm.name}
                            isOpen={algorithm.name === openedMenu}
                            onClick={onChildClick}
                            name={algorithm.name}
                            children={algorithm.children}
                            moves={algorithm.moves}
                            depth={depth + 1}
                        />
                    ))}
                </List>
            </Category>
        );

        const leaf = (
            <ListItem className="interface-list__item" style={style}>
                <ListItemText primary={name} secondary={moves && moves.map(move => move.name).join(', ')} />
            </ListItem>
        );

        return children.length > 0 ? node : leaf;
    }
);
