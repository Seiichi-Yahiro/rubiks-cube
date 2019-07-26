import React, { useState } from 'react';
import { List, ListItemText } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Look2CFOP from '../cube/algorithms/CFOP';
import { IAlgorithm } from '../cube/algorithms/AlgorithmTypes';
import Misc from '../cube/algorithms/Misc';
import { AlgorithmStatus } from '../states/AlgorithmPlayerState';
import ListSubheader from '@material-ui/core/ListSubheader';
import StartConfiguration from './StartConfiguration';
import { take, last } from 'lodash';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { useGlobalState } from '../states/State';
import { updatePlayerNotationAction } from '../states/AlgorithmPlayerActions';

const flattenAlgorithms = (algorithm: IAlgorithm): IAlgorithm[] =>
    [algorithm]
        .concat(
            algorithm.children
                .map(child => (child.notation ? child : { ...child, name: `${algorithm.name} / ${child.name}` }))
                .flatMap(flattenAlgorithms)
        )
        .filter((item, index, list) => index + 1 >= list.length || item.notation || list[index + 1].notation);

const categories = [Look2CFOP, Misc]
    .flatMap(flattenAlgorithms)
    .map(item => ({ ...item, children: [] } as IAlgorithm))
    .reduce(
        (list, algorithm) => {
            if (!algorithm.notation) {
                return list.concat(algorithm);
            }

            const lastItem = last(list)!;
            lastItem.children.push(algorithm as IAlgorithm);
            const body = take(list, list.length - 1);
            return body.concat(lastItem);
        },
        [] as IAlgorithm[]
    ) as IAlgorithm[];

const filterCategories = (searchValue: string) =>
    categories
        .map(group => {
            if (group.name.toLocaleLowerCase().includes(searchValue)) {
                return group;
            }

            const children = group.children.filter(child => child.name.toLocaleLowerCase().includes(searchValue));

            if (children.length === 0) {
                return (undefined as unknown) as IAlgorithm;
            }

            return {
                ...group,
                children: children
            };
        })
        .filter(group => group);

const Algorithms: React.FunctionComponent = () => {
    const [globalState, dispatch] = useGlobalState();
    const { playerStatus } = globalState;

    const [filteredCategories, setFilteredCategories] = useState(categories);
    const filter = (event: React.ChangeEvent<HTMLInputElement>) =>
        setFilteredCategories(filterCategories(event.target.value.toLocaleLowerCase()));

    return (
        <List disablePadding={true} dense={true} className="interface-list interface-algorithm-list">
            <ListSubheader className="interface-algorithm-list__filer">
                <TextField label="Search" fullWidth={true} onChange={filter} />
            </ListSubheader>
            {filteredCategories.map((group, index) => (
                <React.Fragment key={group.name + index}>
                    <ListSubheader className="interface-list__item interface-algorithm-list__header">
                        <Divider />
                        {group.name}
                        <Divider />
                    </ListSubheader>
                    {group.children.map(child => (
                        <ListItem
                            key={child.name + index}
                            className="interface-list__item--moves"
                            button={true}
                            onClick={() => dispatch(updatePlayerNotationAction(child.notation!))}
                            disabled={playerStatus !== AlgorithmStatus.STOPPED}
                        >
                            {child.startConfiguration && (
                                <StartConfiguration configuration={child.startConfiguration} />
                            )}
                            <ListItemText primary={child.name} secondary={child.notation} />
                        </ListItem>
                    ))}
                </React.Fragment>
            ))}
        </List>
    );
};

export default Algorithms;
