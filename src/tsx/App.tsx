import React, { useEffect } from 'react';
import RubiksCube from './cube/RubiksCube';
import Interface from './interface/Interface';
import './App.css';
import { useAppDispatch } from './hooks/redux';
import { cubeActions } from './states/cube/CubeActions';

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(cubeActions.resetCube());
    }, []);

    return (
        <div className="container mx-auto flex h-full flex-col md:flex-row">
            <Interface />
            <RubiksCube />
        </div>
    );
};

export default App;
