import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React, { type CSSProperties, useRef } from 'react';
import { Provider } from 'react-redux';
import { useRedux } from 'src/hooks/redux';
import 'src/i18n';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { type AppStore, setupStore } from 'src/redux/store';
import 'src/tsx/App.css';
import { TooltipProvider } from 'src/tsx/components/Tooltip';
import RubiksCube from 'src/tsx/cube/RubiksCube';
import Interface from 'src/tsx/interface/Interface';

const App: React.FC = () => {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        storeRef.current = setupStore();
        storeRef.current.dispatch(cubeActions.resetCube());
    }

    return (
        <Provider store={storeRef.current}>
            <TooltipProvider delayDuration={500}>
                <AppWrapper>
                    <Interface />
                    <RubiksCube />
                </AppWrapper>
            </TooltipProvider>
        </Provider>
    );
};

interface AppWrapperProps {
    children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    const colors = useRedux((state) => state.cube.colors);

    return (
        <div
            className="container mx-auto flex h-full flex-col md:flex-row"
            style={colors as CSSProperties}
        >
            {children}
        </div>
    );
};

export default App;
