import { Move } from '../Moves';
import { IAlgorithm } from './AlgorithmTypes';

// @ts-ignore
const { F, FP, B, BP, U, UP, D, DP, L, LP, R, RP } = Move;

const Misc: IAlgorithm = {
    name: 'Misc',
    children: [
        {
            name: 'Sexy',
            children: [],
            moves: [R, U, RP, UP]
        }
    ]
};

export default Misc;
