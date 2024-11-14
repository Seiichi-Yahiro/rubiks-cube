import {
    createRotationCommandIterator,
    LoopedRotationCommands,
    RotationAxis,
    RotationCommand,
    SingleRotationCommand,
} from 'src/algorithms/rotationCommand';
import iterators from 'src/utils/iterators';
import { IteratorResult } from 'src/utils/iterators/types';

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

            const resultCommands: IteratorResult<SingleRotationCommand>[] = [];

            for (let i = 0; i < 4; i++) {
                resultCommands.push(iterators.next(itr));
            }

            const expectedCommands: IteratorResult<SingleRotationCommand>[] = [
                iterators.resultValue(createRotationCommand(1)),
                iterators.resultValue(createRotationCommand(2)),
                iterators.resultValue(createRotationCommand(3)),
                iterators.resultEnd,
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

            const resultCommands: IteratorResult<SingleRotationCommand>[] = [];

            for (let i = 0; i < 9; i++) {
                resultCommands.push(iterators.next(itr));
            }

            const expectedCommands: IteratorResult<SingleRotationCommand>[] = [
                iterators.resultValue(createRotationCommand(1)),
                iterators.resultValue(createRotationCommand(2)),
                iterators.resultValue(createRotationCommand(1)),
                iterators.resultValue(createRotationCommand(2)),
                iterators.resultValue(createRotationCommand(3)),
                iterators.resultValue(createRotationCommand(4)),
                iterators.resultValue(createRotationCommand(3)),
                iterators.resultValue(createRotationCommand(4)),
                iterators.resultEnd,
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

            const resultCommands: IteratorResult<SingleRotationCommand>[] = [];

            for (let i = 0; i < 9; i++) {
                resultCommands.push(iterators.next(itr));
            }

            const expectedCommands: IteratorResult<SingleRotationCommand>[] = [
                iterators.resultValue(createRotationCommand(1)),
                iterators.resultValue(createRotationCommand(2)),
                iterators.resultValue(createRotationCommand(2)),
                iterators.resultValue(createRotationCommand(3)),
                iterators.resultValue(createRotationCommand(2)),
                iterators.resultValue(createRotationCommand(2)),
                iterators.resultValue(createRotationCommand(3)),
                iterators.resultValue(createRotationCommand(4)),
                iterators.resultEnd,
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

            const resultCommands: IteratorResult<SingleRotationCommand>[] = [];

            for (let i = 0; i < 4; i++) {
                resultCommands.push(iterators.next(itr));
            }

            const expectedCommands: IteratorResult<SingleRotationCommand>[] = [
                iterators.resultValue(createRotationCommand(1)),
                iterators.resultValue(createRotationCommand(2)),
                iterators.resultValue(createRotationCommand(3)),
                iterators.resultEnd,
            ];

            expect(resultCommands).toEqual(expectedCommands);
        });
    });
});
