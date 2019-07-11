import React from 'react';
import RubiksCube from './cube/RubiksCube';
import Interface from './interface/Interface';
import './App.scss';
import SettingsContext from './context/SettingsContext';

const App: React.FunctionComponent = () => {
    return (
        <div className="app">
            <SettingsContext>
                <Interface />
                <RubiksCube />
            </SettingsContext>
        </div>
    );
};

export default App;
