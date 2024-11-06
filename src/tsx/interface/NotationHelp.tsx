import { Paper } from '@mui/material';
import React from 'react';

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="font-mono bg-gray-200 text-gray-900 p-0.5 rounded">
        {children}
    </span>
);

const NotationHelp: React.FC = () => {
    return (
        <Paper className="p-2 max-w-sm sm:max-w-md md:max-w-xl">
            <div className="text-lg font-bold">Notation definitions</div>
            <div className="text-sm my-1">
                There are two types of letters: sliceable and non-sliceable.
                Sliceable letters can be applied to any layer of the cube, while
                non-sliceable letters are applied to one or more specific
                layers.
            </div>
            <div className="flex flex-row flex-wrap gap-2">
                <div>
                    <div className="font-bold">Sliceable</div>
                    <div className="text-sm space-y-1">
                        <div>
                            <Code>L</Code> - Left layer
                        </div>
                        <div>
                            <Code>R</Code> - Right layer
                        </div>
                        <div>
                            <Code>U</Code> - Top layer
                        </div>
                        <div>
                            <Code>D</Code> - Bottom layer
                        </div>
                        <div>
                            <Code>F</Code> - Front layer
                        </div>
                        <div>
                            <Code>B</Code> - Back layer
                        </div>
                    </div>
                </div>
                <div>
                    <div className="font-bold">Non-sliceable</div>
                    <div className="text-sm space-y-1">
                        <div>
                            <Code>M</Code> - Middle layer like L/R
                        </div>
                        <div>
                            <Code>E</Code> - Equatorial layer like U/D
                        </div>
                        <div>
                            <Code>S</Code> - Standing layer like F/B
                        </div>
                        <div>
                            <Code>X</Code> - Whole cube like L/R
                        </div>
                        <div>
                            <Code>Y</Code> - Whole cube like U/D
                        </div>
                        <div>
                            <Code>Z</Code> - Whole cube like F/B
                        </div>
                    </div>
                </div>
                <div>
                    <div className="font-bold">Modifications</div>
                    <div className="text-sm space-y-1">
                        <div>
                            <Code>W</Code> - Wide, Rotate all layers
                        </div>
                        <div>
                            <Code>&apos;</Code> - Prime, Rotate
                            counter-clockwise
                        </div>
                        <div>
                            <Code>2</Code> - Double, Rotate 180°
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default React.memo(NotationHelp);
