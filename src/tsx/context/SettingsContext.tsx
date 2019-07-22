import React from 'react';
import { createContext } from 'react';
import useComplexState from '../hooks/useComplexState';

export enum AlgoritmStatus {
    STOPPED = 'STOPPED',
    START = 'START',
    PLAYING = 'PLAYING'
}

interface Settings {
    numberOfCubes: number;
    size: number;
    rotationAnimationSpeed: number;
    algorithm: {
        notation: string;
        status: AlgoritmStatus;
    };
}

const initialSettings: Settings = {
    numberOfCubes: 3,
    size: 300,
    rotationAnimationSpeed: 1000,
    algorithm: {
        notation: '',
        status: AlgoritmStatus.STOPPED
    }
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
