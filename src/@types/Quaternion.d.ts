declare module 'quaternion' {
    class Quaternion {
        static fromAxisAngle(axis: [number, number, number], angle: number): Quaternion;

        constructor();

        mul(quaternion: Quaternion): Quaternion;
        toMatrix4(): string;
        slerp(quaternion: Quaternion): (pct: number) => Quaternion;
    }

    export default Quaternion;
}
