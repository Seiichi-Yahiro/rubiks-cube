import {
    LoopedRotationCommands,
    nextRotationCommand,
    RotationAxis,
    RotationCommand,
    RotationCommandStack,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';

describe('rotationCommand', () => {
    describe('nextRotationCommand', () => {
        const createRotationCommand = (
            rotation: number,
        ): SingleRotationCommand => ({
            axis: RotationAxis.X,
            slices: [1],
            rotation,
        });

        it('should handle singleRotationCommands', () => {
            const commands: SingleRotationCommand[] = [
                createRotationCommand(1),
                createRotationCommand(2),
                createRotationCommand(3),
            ];

            const stack: RotationCommandStack = [
                { commands, index: 0, iteration: 0 },
            ];

            const resultCommands: (RotationCommand | undefined)[] = [];

            for (let i = 0; i < 4; i++) {
                resultCommands.push(nextRotationCommand(stack));
            }

            const expectedCommands: (RotationCommand | undefined)[] = [
                createRotationCommand(1),
                createRotationCommand(2),
                createRotationCommand(3),
                undefined,
            ];

            expect(resultCommands).toEqual(expectedCommands);
        });

        it('should handle loopedRotationCommands', () => {
            const commands: LoopedRotationCommands[] = [
                {
                    commands: [
                        createRotationCommand(1),
                        createRotationCommand(2),
                    ],
                    iterations: 2,
                },
                {
                    commands: [
                        createRotationCommand(3),
                        createRotationCommand(4),
                    ],
                    iterations: 2,
                },
            ];

            const stack: RotationCommandStack = [
                { commands, index: 0, iteration: 0 },
            ];

            const resultCommands: (RotationCommand | undefined)[] = [];

            for (let i = 0; i < 9; i++) {
                resultCommands.push(nextRotationCommand(stack));
            }

            const expectedCommands: (RotationCommand | undefined)[] = [
                createRotationCommand(1),
                createRotationCommand(2),
                createRotationCommand(1),
                createRotationCommand(2),
                createRotationCommand(3),
                createRotationCommand(4),
                createRotationCommand(3),
                createRotationCommand(4),
                undefined,
            ];

            expect(resultCommands).toEqual(expectedCommands);
        });

        it('should handle nested mixture', () => {
            const commands: RotationCommand[] = [
                createRotationCommand(1),
                {
                    commands: [
                        {
                            commands: [createRotationCommand(2)],
                            iterations: 2,
                        },
                        createRotationCommand(3),
                    ],
                    iterations: 2,
                },
                createRotationCommand(4),
            ];

            const stack: RotationCommandStack = [
                { commands, index: 0, iteration: 0 },
            ];

            const resultCommands: (RotationCommand | undefined)[] = [];

            for (let i = 0; i < 9; i++) {
                resultCommands.push(nextRotationCommand(stack));
            }

            const expectedCommands: (RotationCommand | undefined)[] = [
                createRotationCommand(1),
                createRotationCommand(2),
                createRotationCommand(2),
                createRotationCommand(3),
                createRotationCommand(2),
                createRotationCommand(2),
                createRotationCommand(3),
                createRotationCommand(4),
                undefined,
            ];

            expect(resultCommands).toEqual(expectedCommands);
        });
    });
});
