import React from 'react';
import { createContext } from 'react';
import useComplexState from '../hooks/useComplexState';

interface ISettings {
    numberOfCubes: number;
    size: number;
    rotationAnimationSpeed: number;
}

const initialSettings: ISettings = {
    numberOfCubes: 3,
    size: 300,
    rotationAnimationSpeed: 750
};

export const settingsContext = createContext({
    ...initialSettings,
    setSettings: (newState: Partial<ISettings> | ((prevState: ISettings) => Partial<ISettings>)) => {
        /**/
    }
});

const SettingsContext: React.FunctionComponent = ({ children }) => {
    const [settings, setSettings] = useComplexState(initialSettings);

    return <settingsContext.Provider value={{ ...settings, setSettings }}>{children}</settingsContext.Provider>;
};

export default SettingsContext;
