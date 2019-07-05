export interface ICube {
    colors: Partial<Faces<string>>;
    translation: Dimensions;
    rotation: Dimensions;
}

export interface Dimensions {
    x: number;
    y: number;
    z: number;
}

export interface Faces<T> {
    front: T;
    back: T;
    right: T;
    left: T;
    top: T;
    bottom: T;
}

export interface Face {
    rotation: string;
    color: string;
}

/*export const tiles = {
    middle: 'translate(0px)',
    middleLeft: `translate(-${tileSize}, 0px)`,
    middleRight: `translate(${tileSize}, 0px)`,
    top: `translate(0px, -${tileSize})`,
    topLeft: `translate(-${tileSize}, -${tileSize})`,
    topRight: `translate(${tileSize}, -${tileSize}`,
    bottom: `translate(0px, ${tileSize})`,
    bottomLeft: `translate(-${tileSize}, ${tileSize})`,
    bottomRight: `translate(${tileSize}, ${tileSize}`
};*/

export const defaultColors: Faces<string> = {
    front: '#383838',
    back: '#383838',
    right: '#383838',
    left: '#383838',
    top: '#383838',
    bottom: '#383838'
};
