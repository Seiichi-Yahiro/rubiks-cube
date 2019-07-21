import React, { useContext } from 'react';
import { settingsContext } from '../context/SettingsContext';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const Settings: React.FunctionComponent = () => {
    const { numberOfCubes, size, rotationAnimationSpeed, setSettings } = useContext(settingsContext);

    return (
        <List>
            <ListItem className="interface-list__item--settings">
                <Typography id="number-of-cubes-slider">Number of cubes</Typography>
                <Slider
                    aria-labelledby="number-of-cubes-slider"
                    valueLabelDisplay="auto"
                    marks={true}
                    step={1}
                    min={2}
                    max={5}
                    defaultValue={numberOfCubes}
                    onChangeCommitted={(event, value) => setSettings({ numberOfCubes: value as number })}
                />
            </ListItem>
            <ListItem className="interface-list__item--settings">
                <Typography id="size-slider">Size</Typography>
                <Slider
                    aria-labelledby="size-slider"
                    valueLabelDisplay="auto"
                    marks={true}
                    step={50}
                    min={100}
                    max={600}
                    defaultValue={size}
                    onChangeCommitted={(event, value) => setSettings({ size: value as number })}
                />
            </ListItem>
            <ListItem className="interface-list__item--settings">
                <Typography id="animation-duration-slider">Animation duration</Typography>
                <Slider
                    aria-labelledby="animation-duration-slider"
                    valueLabelDisplay="auto"
                    min={250}
                    max={2000}
                    step={50}
                    defaultValue={rotationAnimationSpeed}
                    onChangeCommitted={(event, value) => setSettings({ rotationAnimationSpeed: value as number })}
                />
            </ListItem>
        </List>
    );
};

export default React.memo(Settings);