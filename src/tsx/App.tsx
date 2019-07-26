import React from 'react';
import RubiksCube from './cube/RubiksCube';
import Interface from './interface/Interface';
import './App.scss';
import { GlobalStateProvider } from './states/State';

const App: React.FunctionComponent = () => (
    <div className="app">
        <GlobalStateProvider>
            <Interface />
            <RubiksCube />
        </GlobalStateProvider>
    </div>
);

export default App;
