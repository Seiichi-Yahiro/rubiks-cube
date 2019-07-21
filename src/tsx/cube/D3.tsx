import Quaternion from 'quaternion';
import { zip } from 'lodash';

class D3 {
    private _x: number = 0;
    private _y: number = 0;
    private _z: number = 0;

    get x() {
        return this._x;
    }

    setX(x: number) {
        this._x = x;
        return this;
    }

    get y() {
        return this._y;
    }

    setY(y: number) {
        this._y = y;
        return this;
    }

    get z() {
        return this._z;
    }

    setZ(z: number) {
        this._z = z;
        return this;
    }

    constructor(x?: number, y?: number, z?: number) {
        this._x = x ? x : 0;
        this._y = y ? y : 0;
        this._z = z ? z : 0;
    }

    toVector(): [number, number, number] {
        return [this._x, this._y, this._z];
    }

    toQuaternion(angle: number): Quaternion {
        return Quaternion.fromAxisAngle(this.unit().toVector(), angle);
    }

    add(plus: number): D3 {
        return this.map(it => it + plus);
    }

    sub(minus: number): D3 {
        return this.map(it => it - minus);
    }

    mul(other: D3): D3 {
        return new D3(...zip(this.toVector(), other.toVector()).map(([a, b]) => a! * b!));
    }

    map(f: (axis: number) => number): D3 {
        return new D3(...this.toVector().map(f));
    }

    unit(): D3 {
        return new D3(...this.toVector().map(Math.sign));
    }

    invert(): D3 {
        return new D3(...this.toVector().map(it => it * -1));
    }

    rotate(rotation: D3, angle: number) {
        const rotatedVector = Quaternion.fromAxisAngle(rotation.unit().toVector(), angle).rotateVector(this.toVector());

        return new D3(...rotatedVector);
    }

    hasMatchingAxis(other: D3): boolean {
        return zip(this.toVector().map(Math.abs), other.toVector().map(Math.abs)).some(([a, b]) => a === b);
    }

    clone(): D3 {
        return new D3(...this.toVector());
    }
}

export type D3Group = D3[];

export default D3;
