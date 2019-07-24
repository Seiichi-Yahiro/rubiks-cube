import React, { useCallback, useContext, useState } from 'react';
import { List, ListItemText } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Look2CFOP from '../cube/algorithms/CFOP';
import Category from './Category';
import { IAlgorithm } from '../cube/algorithms/AlgorithmTypes';
import Misc from '../cube/algorithms/Misc';
import { algorithmPlayerContext, AlgorithmStatus } from '../context/AlgorithmPlayerContext';

const categories = [Look2CFOP, Misc];

const Algorithms: React.FunctionComponent = () => {
    const [openedMenu, setOpenedMenu] = useState('');
    const onChildClick = useCallback((menu: string) => setOpenedMenu(prevMenu => (prevMenu === menu ? '' : menu)), []);

    return (
        <List disablePadding={true} dense={true} className="interface-list">
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

interface IRecursiveChildProps extends IAlgorithm {
    onClick: (menu: string) => void;
    isOpen: boolean;
    depth: number;
}

const RecursiveChild: React.FunctionComponent<IRecursiveChildProps> = React.memo(
    ({ name, children, notation = '', onClick, isOpen, depth }) => {
        const { setAlgorithmPlayerState, status: playerStatus } = useContext(algorithmPlayerContext);
        const [openedMenu, setOpenedMenu] = useState('');
        const onChildClick = useCallback(
            (menu: string) => setOpenedMenu(prevMenu => (prevMenu === menu ? '' : menu)),
            []
        );
        const onSelfClick = useCallback(() => onClick(name), [name, onClick]);

        if (children.length > 0) {
            return (
                <Category isOpen={isOpen} setMenu={onSelfClick} title={name}>
                    <List disablePadding={true} dense={true} className="interface-list">
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
            const onAlgorithmClick = () => {
                if (playerStatus === AlgorithmStatus.STOPPED) {
                    setAlgorithmPlayerState({ notation });
                }
            };

            return (
                <ListItem className="interface-list__item--moves" button={true} onClick={onAlgorithmClick}>
                    <ListItemText primary={name} secondary={notation} />
                </ListItem>
            );
        }
    }
);
