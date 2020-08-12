import { categories } from './Algorithms';
import { makeNotationParser } from '../cube/algorithms/Parser';

describe('Algorithm notations', () => {
    it('should parse all notations', () => {
        const parser = makeNotationParser(3).rotationCommands;

        const algorithms = categories.flatMap((it) => it.algorithms);

        const result = algorithms.map((it) => {
            const result = parser.parse(it.notation);
            return result.status ? it.name : { ...result, name: it.name };
        });

        expect(result).toStrictEqual(algorithms.map((it) => it.name));
    });
});
