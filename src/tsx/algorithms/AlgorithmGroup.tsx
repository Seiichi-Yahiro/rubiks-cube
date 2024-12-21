import React from 'react';
import { useTranslation } from 'react-i18next';
import type { AlgorithmGroup as AlgorithmGroupI } from 'src/algorithms/algorithmTypes';
import { useAppDispatch } from 'src/hooks/redux';
import { playerActions } from 'src/redux/player/playerActions';
import CubeConfig, { ViewMode } from 'src/tsx/algorithms/CubeConfig';

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
                        className="flex flex-row items-center gap-1 rounded-md border border-cube-gray/20"
                    >
                        {algorithm.startConfiguration && (
                            <div className="border-r border-cube-gray/20 p-0.5">
                                <CubeConfig
                                    viewMode={viewMode}
                                    front={algorithm.startConfiguration.front}
                                    back={algorithm.startConfiguration.back}
                                    left={algorithm.startConfiguration.left}
                                    right={algorithm.startConfiguration.right}
                                    top={algorithm.startConfiguration.top}
                                    bottom={algorithm.startConfiguration.bottom}
                                />
                            </div>
                        )}
                        <div className="flex flex-col">
                            <div className="text-cube-gray">
                                {t(algorithm.name)}
                            </div>
                            <div
                                className="cursor-pointer text-disabled"
                                onClick={() => {
                                    dispatch(
                                        playerActions.updateNotation(
                                            algorithm.notation,
                                        ),
                                    );
                                }}
                            >
                                {algorithm.notation}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(AlgorithmGroup);
