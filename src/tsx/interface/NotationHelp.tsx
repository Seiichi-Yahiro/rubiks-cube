import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="font-mono bg-gray-200 text-gray-900 p-0.5 rounded select-all">
        {children}
    </span>
);

interface NotationHelpProps {
    onClose: () => void;
}

const NotationHelp: React.FC<NotationHelpProps> = ({ onClose }) => {
    return (
        <div className="px-2 pb-2 max-w-sm sm:max-w-md md:max-w-xl space-y-2">
            <div className="pt-2 flex flex-row space-between items-center sticky top-0 bg-white">
                <div className="flex-1 text-lg font-bold">Notation</div>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </div>
            <div className="text-sm">
                There are two types of letters:{' '}
                <span className="font-semibold">sliceable</span> and{' '}
                <span className="font-semibold">non-sliceable</span>.{' '}
                <span className="font-semibold">Sliceable</span> letters can be
                applied to any layer of the cube, while{' '}
                <span className="font-semibold">non-sliceable</span> letters are
                applied to one or more specific layers. All letters are
                available in <span className="font-semibold">capital</span> and{' '}
                <span className="font-semibold">non-capital</span> variants but
                their meaning can change and depends additionally on the
                dimension of the cube. Rotations are always done clockwise
                unless the statement is modified by a{' '}
                <span className="font-semibold">prime</span>.{' '}
                <span className="font-semibold">Modifications</span> are always
                applied at the end of a notation statement. Notation statements
                need to be separated by{' '}
                <span className="font-semibold">spaces</span> or{' '}
                <span className="font-semibold">commas</span>.
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
            <div className="space-y-1">
                <div className="font-bold">Slicing</div>
                <div className="text-sm">
                    <span className="font-semibold">Sliceable</span> letters can
                    be applied to specific slices / layers of the cube by adding
                    a single number that refers to a layer or by adding multiple
                    comma separated numbers inside brackets referring to
                    multiple layers in front of a notation statement. Layer{' '}
                    <span className="font-semibold">indexing</span> starts at{' '}
                    <span className="font-semibold">1</span> and the direction
                    depends on the following letter.
                </div>
            </div>
            <div className="space-y-1">
                <div className="font-bold">Examples</div>
                <div className="text-sm space-y-1">
                    <div>
                        <Code>L</Code> / <Code>L&apos;</Code> / <Code>L2</Code>{' '}
                        / <Code>L&apos;2</Code>
                    </div>
                    <div>
                        <Code>2L</Code>
                    </div>
                    <div>
                        <Code>2L&apos;</Code> / <Code>2L2</Code> /{' '}
                        <Code>2L&apos;2</Code>
                    </div>
                    <div>
                        <Code>2Lw</Code> / <Code>2Lw&apos;</Code> /{' '}
                        <Code>2Lw2</Code> / <Code>2Lw&apos;2</Code>
                    </div>
                    <div>
                        <Code>[1,2,3]L</Code> / <Code>[1,2,3]L&apos;</Code> /{' '}
                        <Code>[1,2,3]L2</Code> / <Code>[1,2,3]L&apos;2</Code>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(NotationHelp);
