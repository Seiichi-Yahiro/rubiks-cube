import React from 'react';
import { CubeColors } from '../cube/CubeUtils';

interface IStartConfigurationProps {
    configuration: CubeColors[][];
}

const StartConfiguration: React.FunctionComponent<IStartConfigurationProps> = ({ configuration }) => (
    <div className="start-configuration">
        {configuration.flatMap((row, rowIndex) =>
            row.map((color, colorIndex) => (
                <div
                    key={`${rowIndex}-${colorIndex}`}
                    className="start-configuration__face"
                    style={{
                        backgroundColor: color,
                        gridRow: rowIndex + 1,
                        gridColumn: colorIndex + 1
                    }}
                />
            ))
        )}
    </div>
);

export default React.memo(StartConfiguration);
