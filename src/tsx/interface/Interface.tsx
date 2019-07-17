import React, { useContext } from 'react';
import { settingsContext } from '../context/SettingsContext';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';

const Interface: React.FunctionComponent = () => {
    const { numberOfCubes, size, rotationAnimationSpeed, setSettings } = useContext(settingsContext);

    return (
        <div className="app__interface">
            <div>
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
            </div>
        </div>
    );
};

export default Interface;
