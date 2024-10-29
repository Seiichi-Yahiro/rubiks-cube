import React, { useEffect } from 'react';
import RubiksCube from './cube/RubiksCube';
import Interface from './interface/Interface';
import './App.scss';
import { useDispatch } from 'react-redux';
import { cubeActions } from './states/cube/CubeActions';

const App: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cubeActions.resetCube());
    }, []);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <Interface />
            <RubiksCube />
        </div>
    );
};

export default App;
