import React, { useState } from 'react';
import {
    List,
    ListItemText,
    ListSubheader,
    Divider,
    TextField,
    ListItemButton,
} from '@mui/material';
import Look2CFOP from '../cube/algorithms/CFOP';
import Misc from '../cube/algorithms/Misc';
import { PlayerStatus } from '../states/player/PlayerState';
import StartConfiguration from './StartConfiguration';
import { playerActions } from '../states/player/PlayerActions';
import { useAppDispatch, useRedux } from '../hooks/redux';
import { AlgorithmGroup, flattenTree } from '../cube/algorithms/AlgorithmTree';

export const categories = [Look2CFOP, Misc].flatMap((algorithm) =>
    flattenTree(algorithm),
);

const filterCategories = (searchValue: string): AlgorithmGroup[] =>
    categories
        .map<AlgorithmGroup | undefined>((group) => {
            if (group.name.toLocaleLowerCase().includes(searchValue)) {
                return group;
            }

            const algorithms = group.algorithms.filter((algorithm) =>
                algorithm.name.toLocaleLowerCase().includes(searchValue),
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
    const dispatch = useAppDispatch();
    const playerStatus = useRedux((state) => state.player.status);
    const colorMap = useRedux((state) => state.cube.colorMap);

    const [filteredCategories, setFilteredCategories] = useState(categories);
    const filter = (event: React.ChangeEvent<HTMLInputElement>) =>
        setFilteredCategories(
            filterCategories(event.target.value.toLocaleLowerCase()),
        );

    return (
        <List
            disablePadding={true}
            dense={true}
            className="h-60 w-full overflow-auto md:h-80"
        >
            <ListSubheader className="!sticky !top-0 !z-50 !bg-white">
                <TextField
                    label="Search"
                    variant="standard"
                    fullWidth={true}
                    onChange={filter}
                />
            </ListSubheader>
            {filteredCategories.map((group, index) => (
                <React.Fragment key={group.name + index}>
                    <ListSubheader className="!sticky !top-12 !bg-white">
                        <Divider />
                        {group.name}
                        <Divider />
                    </ListSubheader>
                    {group.algorithms.map((algorithm) => (
                        <ListItemButton
                            key={algorithm.name + index}
                            className="cursor-pointer"
                            onClick={() =>
                                dispatch(
                                    playerActions.updateNotation(
                                        algorithm.notation!,
                                    ),
                                )
                            }
                            disabled={playerStatus !== PlayerStatus.STOPPED}
                        >
                            {algorithm.startConfiguration && (
                                <StartConfiguration
                                    configuration={algorithm.startConfiguration.map(
                                        (row) =>
                                            row.map((color) => colorMap[color]),
                                    )}
                                    transparentColor={colorMap.transparent}
                                />
                            )}
                            <ListItemText
                                primary={algorithm.name}
                                secondary={algorithm.notation}
                            />
                        </ListItemButton>
                    ))}
                </React.Fragment>
            ))}
        </List>
    );
};

export default Algorithms;
