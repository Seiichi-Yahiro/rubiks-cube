export interface IAlgorithm {
    name: string;
    children: IAlgorithm[];
    notation?: string;
}
