import React, { useState } from 'react';
import {
    List,
    ListItemText,
    ListItem,
    ListSubheader,
    Divider,
    TextField,
} from '@mui/material';
import Look2CFOP from '../cube/algorithms/CFOP';
import Misc from '../cube/algorithms/Misc';
import { PlayerStatus } from '../states/player/PlayerState';
import StartConfiguration from './StartConfiguration';
import { playerActions } from '../states/player/PlayerActions';
import { useDispatch } from 'react-redux';
import { useRedux } from '../states/States';
import { AlgorithmGroup, flattenTree } from '../cube/algorithms/AlgorithmTree';

export const categories = [Look2CFOP, Misc].flatMap((algorithm) =>
    flattenTree(algorithm)
);

const filterCategories = (searchValue: string): AlgorithmGroup[] =>
    categories
        .map<AlgorithmGroup | undefined>((group) => {
            if (group.name.toLocaleLowerCase().includes(searchValue)) {
                return group;
            }

            const algorithms = group.algorithms.filter((algorithm) =>
                algorithm.name.toLocaleLowerCase().includes(searchValue)
            );

            if (algorithms.length === 0) {
                return;
            }

            return {
                ...group,
                algorithms,
            };
        })
        .filter((group): group is AlgorithmGroup => group !== undefined);

const Algorithms: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const playerStatus = useRedux((state) => state.player.status);
    const colorMap = useRedux((state) => state.cube.colorMap);

    const [filteredCategories, setFilteredCategories] = useState(categories);
    const filter = (event: React.ChangeEvent<HTMLInputElement>) =>
        setFilteredCategories(
            filterCategories(event.target.value.toLocaleLowerCase())
        );

    return (
        <List
            disablePadding={true}
            dense={true}
            className="interface-list interface-algorithm-list"
        >
            <ListSubheader className="interface-algorithm-list__filer">
                <TextField
                    label="Search"
                    variant="standard"
                    fullWidth={true}
                    onChange={filter}
                />
            </ListSubheader>
            {filteredCategories.map((group, index) => (
                <React.Fragment key={group.name + index}>
                    <ListSubheader className="interface-list__item interface-algorithm-list__header">
                        <Divider />
                        {group.name}
                        <Divider />
                    </ListSubheader>
                    {group.algorithms.map((algorithm) => (
                        <ListItem
                            key={algorithm.name + index}
                            className="interface-list__item--moves"
                            button={true}
                            onClick={() =>
                                dispatch(
                                    playerActions.updateNotation(
                                        algorithm.notation!
                                    )
                                )
                            }
                            disabled={playerStatus !== PlayerStatus.STOPPED}
                        >
                            {algorithm.startConfiguration && (
                                <StartConfiguration
                                    configuration={algorithm.startConfiguration.map(
                                        (row) =>
                                            row.map((color) => colorMap[color])
                                    )}
                                    transparentColor={colorMap.transparent}
                                />
                            )}
                            <ListItemText
                                primary={algorithm.name}
                                secondary={algorithm.notation}
                            />
                        </ListItem>
                    ))}
                </React.Fragment>
            ))}
        </List>
    );
};

export default Algorithms;
