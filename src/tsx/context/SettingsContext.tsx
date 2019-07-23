import React from 'react';
import { createContext } from 'react';
import useComplexState from '../hooks/useComplexState';

interface Settings {
    numberOfCubes: number;
    size: number;
    rotationAnimationSpeed: number;
    reset: boolean;
}

const initialSettings: Settings = {
    numberOfCubes: 3,
    size: 300,
    rotationAnimationSpeed: 750,
    reset: false
};

export const settingsContext = createContext({
    ...initialSettings,
    setSettings: (newState: Partial<Settings> | ((prevState: Settings) => Partial<Settings>)) => {
        /**/
    }
});

const SettingsContext: React.FunctionComponent = ({ children }) => {
    const [settings, setSettings] = useComplexState(initialSettings);

    return <settingsContext.Provider value={{ ...settings, setSettings }}>{children}</settingsContext.Provider>;
};

export default SettingsContext;
