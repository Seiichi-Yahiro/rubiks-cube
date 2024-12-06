import React, { useEffect } from 'react';
import { useAppDispatch } from 'src/hooks/redux';
import { cubeActions } from 'src/redux/cube/cubeActions';
import 'src/tsx/App.css';
import { TooltipProvider } from 'src/tsx/components/Tooltip';
import RubiksCube from 'src/tsx/cube/RubiksCube';
import Interface from 'src/tsx/interface/Interface';

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(cubeActions.resetCube());
    }, [dispatch]);

    return (
        <TooltipProvider delayDuration={500}>
            <div className="container mx-auto flex h-full flex-col md:flex-row">
                <Interface />
                <RubiksCube />
            </div>
        </TooltipProvider>
    );
};

export default App;
