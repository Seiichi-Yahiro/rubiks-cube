import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import 'src/i18n';
import { cubeActions } from 'src/redux/cube/cubeActions';
import { loadColorMap } from 'src/redux/localStorage';
import { type AppStore, setupStore } from 'src/redux/store';
import Algorithms from 'src/tsx/algorithms/Algorithms';
import AlgorithmsButton from 'src/tsx/algorithms/AlgorithmsButton';
import 'src/tsx/App.css';
import { TooltipProvider } from 'src/tsx/components/Tooltip';
import RubiksCube from 'src/tsx/cube/RubiksCube';
import CubeSettings from 'src/tsx/cube/settings/CubeSettings';
import LanguageSelector from 'src/tsx/locales/LanguageSelector';
import Player from 'src/tsx/player/Player';
import cn from 'src/utils/cn';

const App: React.FC = () => {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        storeRef.current = setupStore();
        storeRef.current.dispatch(cubeActions.setColorMap(loadColorMap()));
        storeRef.current.dispatch(cubeActions.resetCube());
    }

    return (
        <Provider store={storeRef.current}>
            <TooltipProvider delayDuration={500}>
                <div className="flex size-full flex-col">
                    <div className="w-full border-b border-app-border p-2">
                        <AppHeader className="container mx-auto" />
                    </div>
                    <AppContent className="container mx-auto grow p-2" />
                </div>
            </TooltipProvider>
        </Provider>
    );
};

interface AppHeaderProps {
    className?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ className }) => {
    const { t } = useTranslation();

    return (
        <div
            className={cn(
                'flex w-full flex-row items-center justify-between',
                className,
            )}
        >
            <div className="flex flex-row items-center gap-1">
                <img
                    src="favicon.png"
                    alt="Rubik's Cube logo"
                    className="size-12"
                />
                <span className="text-2xl font-bold text-app-text">
                    {t('title')}
                </span>
            </div>
            <LanguageSelector />
        </div>
    );
};

interface AppContentProps {
    className?: string;
}

const AppContent: React.FC<AppContentProps> = ({ className }) => {
    return (
        <div
            className={cn(
                'grid grid-cols-1 grid-rows-[min-content_auto] gap-2 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-[minmax(24rem,1fr)_2fr]',
                className,
            )}
        >
            <div className="flex flex-col gap-2 md:gap-4">
                <Player />
                <Algorithms className="hidden md:block md:grow" />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                    <AlgorithmsButton className="md:invisible" />
                    <CubeSettings />
                </div>
                <RubiksCube className="grow" />
            </div>
        </div>
    );
};

export default App;
