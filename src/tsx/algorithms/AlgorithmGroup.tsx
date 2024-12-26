import React from 'react';
import { useTranslation } from 'react-i18next';
import type { AlgorithmGroup as AlgorithmGroupI } from 'src/algorithms/algorithmTypes';
import { useAppDispatch } from 'src/hooks/redux';
import { playerActions } from 'src/redux/player/playerActions';
import CubeConfig, { ViewMode } from 'src/tsx/algorithms/CubeConfig';
import Code from 'src/tsx/components/Code';

interface AlgorithmGroupProps {
    group: AlgorithmGroupI;
    viewMode: ViewMode;
}

const AlgorithmGroup: React.FC<AlgorithmGroupProps> = ({ group, viewMode }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col gap-1">
            <div>{t(group.name)}</div>
            <div className="flex flex-col gap-1">
                {group.algorithms.map((algorithm) => (
                    <div
                        key={algorithm.name}
                        className="flex flex-row items-center gap-1 rounded-md border border-app-border"
                    >
                        {algorithm.startConfiguration && (
                            <div className="border-r border-app-border p-0.5">
                                <CubeConfig
                                    viewMode={viewMode}
                                    front={algorithm.startConfiguration.front}
                                    back={algorithm.startConfiguration.back}
                                    left={algorithm.startConfiguration.left}
                                    right={algorithm.startConfiguration.right}
                                    up={algorithm.startConfiguration.up}
                                    down={algorithm.startConfiguration.down}
                                    helpArrows={algorithm.helpArrows}
                                />
                            </div>
                        )}
                        <div className="flex flex-col text-sm">
                            <div className="font-medium text-app-text">
                                {t(algorithm.name)}
                            </div>
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    dispatch(
                                        playerActions.updateNotation(
                                            algorithm.notation,
                                        ),
                                    );
                                }}
                            >
                                <Code>{algorithm.notation}</Code>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(AlgorithmGroup);
