import React from 'react';

interface IStartConfigurationProps {
    configuration: string[][];
    transparentColor: string;
}

const StartConfiguration: React.FC<IStartConfigurationProps> = ({
    configuration,
    transparentColor,
}) => (
    <div className="mr-1 grid gap-0.5">
        {configuration.flatMap((row, rowIndex) =>
            row.map((color, colorIndex) => (
                <React.Fragment key={`${rowIndex}-${colorIndex}`}>
                    {color !== transparentColor && (
                        <div
                            className="h-2.5 w-2.5"
                            style={{
                                backgroundColor: color,
                                gridRow: rowIndex + 1,
                                gridColumn: colorIndex + 1,
                            }}
                        />
                    )}
                </React.Fragment>
            )),
        )}
    </div>
);

export default React.memo(StartConfiguration);
