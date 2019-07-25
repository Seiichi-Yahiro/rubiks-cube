import React from 'react';
import { CubeColors } from '../cube/CubeUtils';

interface IStartConfigurationProps {
    configuration: CubeColors[][];
}

const StartConfiguration: React.FunctionComponent<IStartConfigurationProps> = ({ configuration }) => (
    <div className="start-configuration">
        {configuration.flatMap((row, rowIndex) =>
            row.map((color, colorIndex) => (
                <React.Fragment key={`${rowIndex}-${colorIndex}`}>
                    {color !== CubeColors.TRANSPARENT && (
                        <div
                            className="start-configuration__face"
                            style={{
                                backgroundColor: color,
                                gridRow: rowIndex + 1,
                                gridColumn: colorIndex + 1
                            }}
                        />
                    )}
                </React.Fragment>
            ))
        )}
    </div>
);

export default React.memo(StartConfiguration);
