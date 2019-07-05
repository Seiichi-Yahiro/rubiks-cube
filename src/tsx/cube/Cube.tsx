import React from 'react';
import {tileSize} from './Cube.scss';
import {keys} from 'lodash';

const faces = {
    front: 'rotateY(0deg)',
    back: 'rotateY(180deg)',
    right: 'rotateY(90deg)',
    left: 'rotateY(270deg)',
    top: 'rotateX(90deg)',
    bottom: 'rotateX(270deg)'
};

const tiles = {
    middle: 'translate(0px)',
    middleLeft: `translate(-${tileSize}, 0px)`,
    middleRight: `translate(${tileSize}, 0px)`,
    top: `translate(0px, -${tileSize})`,
    topLeft: `translate(-${tileSize}, -${tileSize})`,
    topRight: `translate(${tileSize}, -${tileSize}`,
    bottom: `translate(0px, ${tileSize})`,
    bottomLeft: `translate(-${tileSize}, ${tileSize})`,
    bottomRight: `translate(${tileSize}, ${tileSize}`
};

const Cube: React.FunctionComponent = () => {


    return (
        <div className="cube-scene">
            <div className="cube">
                {keys(faces).map(face =>
                    keys(tiles).map(tile =>
                        <div key={face + tile} className="cube__face" style={{transform: `${faces[face]} translateZ(100px) ${tiles[tile]}`}}/>
                    )
                )}
            </div>
        </div>
    );
};

export default Cube;