import { Color } from '../cubeTypes';

export interface AlgorithmGroupGroup {
    name: string;
    groups: AlgorithmTree[];
}

export interface AlgorithmGroup {
    name: string;
    algorithms: Algorithm[];
}

export interface Algorithm {
    name: string;
    notation: string;
    startConfiguration?: Color[][];
}

export type AlgorithmTree = AlgorithmGroupGroup | AlgorithmGroup;

const isAlgorithmGroup = (tree: AlgorithmTree): tree is AlgorithmGroup =>
    (tree as AlgorithmGroup).algorithms !== undefined;

const joinNames = (a: string, b: string): string =>
    a === '' ? b : `${a} / ${b}`;

export const flattenTree = (
    tree: AlgorithmTree,
    name = '',
): AlgorithmGroup[] => {
    if (isAlgorithmGroup(tree)) {
        return [{ ...tree, name: joinNames(name, tree.name) }];
    } else {
        return tree.groups.flatMap((group) =>
            flattenTree(group, joinNames(name, tree.name)),
        );
    }
};
