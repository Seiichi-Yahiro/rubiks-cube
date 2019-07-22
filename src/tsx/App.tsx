import React from 'react';
import RubiksCube from './cube/RubiksCube';
import Interface from './interface/Interface';
import './App.scss';
import SettingsContext from './context/SettingsContext';
import AlgorithmPlayerContext from './context/AlgorithmPlayerContext';

const App: React.FunctionComponent = () => {
    return (
        <div className="app">
            <SettingsContext>
                <AlgorithmPlayerContext>
                    <Interface />
                    <RubiksCube />
                </AlgorithmPlayerContext>
            </SettingsContext>
        </div>
    );
};

export default App;
