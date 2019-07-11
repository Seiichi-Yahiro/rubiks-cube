import React, { useContext } from 'react';
import Range from './Range';
import { settingsContext } from '../context/SettingsContext';

const Interface: React.FunctionComponent = () => {
    const { numberOfCubes, size, setSettings } = useContext(settingsContext);

    return (
        <div className="app__interface">
            <div>
                <Range
                    text="Number of cubes:"
                    step={1}
                    min={2}
                    max={5}
                    value={numberOfCubes}
                    onChange={event => setSettings({ numberOfCubes: Number(event.target.value) })}
                />
                <Range
                    text="Size:"
                    step={50}
                    min={100}
                    max={600}
                    value={size}
                    onChange={event => setSettings({ size: Number(event.target.value) })}
                />
            </div>
        </div>
    );
};

export default Interface;
