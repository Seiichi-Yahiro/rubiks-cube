import { makeNotationParser } from 'src/algorithms/parser';
import {
    countRotationCommands,
    createRotationCommandIterator,
    LoopedRotationCommands,
    RotationAxis,
    RotationCommand,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';
import { describe, expect, it } from 'vitest';

describe('rotationCommand', () => {
    const createRotationCommand = (
        rotation: number,
    ): SingleRotationCommand => ({
        axis: RotationAxis.X,
        slices: [1],
        rotation,
    });

    describe('nextRotationCommand', () => {
        it('should handle singleRotationCommands', () => {
            const commands: SingleRotationCommand[] = [
                createRotationCommand(1),
                createRotationCommand(2),
                createRotationCommand(3),
            ];

            const itr = createRotationCommandIterator(commands);

            const resultCommands: (SingleRotationCommand | null)[] = [];

            for (let i = 0; i < 4; i++) {
                resultCommands.push(itr.next());
            }

            const expectedCommands: (SingleRotationCommand | null)[] = [
                createRotationCommand(1),
                createRotationCommand(2),
                createRotationCommand(3),
                null,
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

            const itr = createRotationCommandIterator(commands);

            const resultCommands: (SingleRotationCommand | null)[] = [];

            for (let i = 0; i < 9; i++) {
                resultCommands.push(itr.next());
            }

            const expectedCommands: (SingleRotationCommand | null)[] = [
                createRotationCommand(1),
                createRotationCommand(2),
                createRotationCommand(1),
                createRotationCommand(2),
                createRotationCommand(3),
                createRotationCommand(4),
                createRotationCommand(3),
                createRotationCommand(4),
                null,
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

            const itr = createRotationCommandIterator(commands);

            const resultCommands: (SingleRotationCommand | null)[] = [];

            for (let i = 0; i < 9; i++) {
                resultCommands.push(itr.next());
            }

            const expectedCommands: (SingleRotationCommand | null)[] = [
                createRotationCommand(1),
                createRotationCommand(2),
                createRotationCommand(2),
                createRotationCommand(3),
                createRotationCommand(2),
                createRotationCommand(2),
                createRotationCommand(3),
                createRotationCommand(4),
                null,
            ];

            expect(resultCommands).toEqual(expectedCommands);
        });
    });

    describe('previousRotationCommand', () => {
        it('should handle singleRotationCommands', () => {
            const commands: SingleRotationCommand[] = [
                createRotationCommand(1),
                createRotationCommand(2),
                createRotationCommand(3),
            ];

            const itr = createRotationCommandIterator(commands);

            const resultCommands: (SingleRotationCommand | null)[] = [];

            for (let i = 0; i < 4; i++) {
                resultCommands.push(itr.next());
            }

            const expectedCommands: (SingleRotationCommand | null)[] = [
                createRotationCommand(1),
                createRotationCommand(2),
                createRotationCommand(3),
                null,
            ];

            expect(resultCommands).toEqual(expectedCommands);
        });
    });

    it('should count rotation commands', () => {
        const rotationCommands =
            makeNotationParser(3).rotationCommands.tryParse(
                'F (F (F F)2 F)3 F',
            );

        const result = countRotationCommands(rotationCommands);

        expect(result).toBe(20);
    });
});
