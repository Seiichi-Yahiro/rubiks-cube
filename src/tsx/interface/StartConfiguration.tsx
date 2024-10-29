import React from 'react';

interface IStartConfigurationProps {
    configuration: string[][];
    transparentColor: string;
}

const StartConfiguration: React.FunctionComponent<IStartConfigurationProps> = ({
    configuration,
    transparentColor,
}) => (
    <div className="grid gap-0.5 mr-1">
        {configuration.flatMap((row, rowIndex) =>
            row.map((color, colorIndex) => (
                <React.Fragment key={`${rowIndex}-${colorIndex}`}>
                    {color !== transparentColor && (
                        <div
                            className="w-2.5 h-2.5"
                            style={{
                                backgroundColor: color,
                                gridRow: rowIndex + 1,
                                gridColumn: colorIndex + 1,
                            }}
                        />
                    )}
                </React.Fragment>
            ))
        )}
    </div>
);

export default React.memo(StartConfiguration);
