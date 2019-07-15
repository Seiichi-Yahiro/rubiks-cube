declare module 'quaternion' {
    type W = number;
    type X = number;
    type Y = number;
    type Z = number;

    export type Vector = [X, Y, Z];
    export type QuaternionVector = [W, X, Y, Z];

    class Quaternion {
        static ZERO: Quaternion;
        static ONE: Quaternion;
        static I: Quaternion;
        static J: Quaternion;
        static K: Quaternion;
        static EPSILON: Quaternion;

        /**
         * Creates quaternion by a rotation given as axis and angle
         *
         * @param {Vector} axis The axis around which to rotate
         * @param {number} angle The angle in radians
         * @returns {Quaternion}
         */
        static fromAxisAngle(axis: Vector, angle: number): Quaternion;

        /**
         * Calculates the quaternion to rotate one vector onto the other
         *
         * @param {Vector} u
         * @param {Vector} v
         */
        static fromBetweenVectors(u: Vector, v: Vector): Quaternion;

        /**
         * Creates a quaternion by a rotation given by Euler angles
         *
         * @param {number} phi
         * @param {number} theta
         * @param {number} psi
         * @param {string=} order (default=ZXY)
         * @returns {Quaternion}
         */
        static fromEuler(phi: number, theta: number, psi: number, order?: string): Quaternion;

        constructor();
        constructor(w: W, x: X, y: Y, z: Z);
        constructor(w: W, v: Vector);
        constructor(o: { w: W; x: X; y: Y; z: Z });
        constructor(complex: { re: number; im: number });
        constructor(qv: QuaternionVector);
        constructor(v: Vector);
        constructor(double: number);
        constructor(s: string);

        /**
         * Adds two quaternions Q1 and Q2
         *
         * @param {Quaternion} quaternion
         * @returns {Quaternion}
         */
        add(quaternion: Quaternion): Quaternion;

        /**
         * Subtracts a quaternions Q2 from Q1
         *
         * @param {Quaternion} quaternion
         * @returns {Quaternion}
         */
        sub(quaternion: Quaternion): Quaternion;

        /**
         * Calculates the Hamilton product of two quaternions
         * Leaving out the imaginary part results in just scaling the quat
         *
         * @param {Quaternion} quaternion
         * @returns {Quaternion}
         */
        mul(quaternion: Quaternion): Quaternion;

        /**
         * Multiplies a quaternion with the inverse of a second quaternion
         *
         * @param {Quaternion} quaternion
         * @returns {Quaternion}
         */
        div(quaternion: Quaternion): Quaternion;

        /**
         * Calculates the additive inverse, or simply it negates the quaternion
         *
         * @returns {Quaternion}
         */
        neg(): Quaternion;

        /**
         * Calculates the length/modulus/magnitude or the norm of a quaternion
         *
         * @returns {number}
         */
        norm(): number;

        /**
         * Calculates the squared length/modulus/magnitude or the norm of a quaternion
         *
         * @returns {number}
         */
        normSq(): number;

        /**
         * Normalizes the quaternion to have |Q| = 1 as long as the norm is not zero
         * Alternative names are the signum, unit or versor
         *
         * @returns {Quaternion}
         */
        normalize(): Quaternion;

        /**
         * Scales a quaternion by a scalar, faster than using multiplication
         *
         * @param {number} s scaling factor
         * @returns {Quaternion}
         */
        scale(s: number): Quaternion;

        /**
         * Calculates the dot product of two quaternions
         *
         * @param {Quaternion} quaternion
         * @returns {number}
         */
        dot(quaternion: Quaternion): number;

        /**
         * Calculates the inverse of a quat for non-normalized quats such that
         * Q^-1 * Q = 1 and Q * Q^-1 = 1
         *
         * @returns {Quaternion}
         */
        inverse(): Quaternion;

        /**
         * Calculates the conjugate of a quaternion
         *
         * @returns {Quaternion}
         */
        conjugate(): Quaternion;

        /**
         * Calculates the natural exponentiation of the quaternion
         *
         * @returns {Quaternion}
         */
        exp(): Quaternion;

        /**
         * Calculates the power of a quaternion raised to a real number or another quaternion
         *
         * @param {Quaternion} quaternion
         * @returns {Quaternion}
         */
        pow(quaternion: Quaternion): Quaternion;

        /**
         * Calculates the natural logarithm of the quaternion
         *
         * @returns {Quaternion}
         */
        log(): Quaternion;

        /**
         * Checks if two quats are the same
         *
         * @param {Quaternion} quaternion
         * @returns {boolean}
         */
        equals(quaternion: Quaternion): boolean;

        /**
         * Checks if all parts of a quaternion are finite
         *
         * @returns {boolean}
         */
        isFinite(): boolean;

        /**
         * Checks if any of the parts of the quaternion is not a number
         *
         * @returns {boolean}
         */
        isNaN(): boolean;

        /**
         * Gets the Quaternion as a well formatted string
         *
         * @returns {string}
         */
        toString(): string;

        /**
         * Returns the real part of the quaternion
         *
         * @returns {number}
         */
        real(): number;

        /**
         * Returns the imaginary part of the quaternion as a 3D vector / array
         *
         * @returns {Array}
         */
        imag(): number;

        /**
         * Gets the actual quaternion as a 4D vector / array
         *
         * @returns {QuaternionVector}
         */
        toVector(): QuaternionVector;

        /**
         * Calculates the 3x3 rotation matrix for the current quat
         *
         * @param {boolean=} d2
         * @see https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion
         * @returns {Array}
         */
        toMatrix(d2?: boolean): number[];

        /**
         * Calculates the homogeneous 4x4 rotation matrix for the current quat
         *
         * @param {boolean=} d2
         * @returns {Array}
         */
        toMatrix4(d2?: boolean): number[];

        /**
         * Clones the actual object
         *
         * @returns {Quaternion}
         */
        clone(): Quaternion;

        /**
         * Rotates a vector according to the current quaternion
         *
         * @param {Vector} v The vector to be rotated
         * @returns {Vector}
         */
        rotateVector(v: Vector): Vector;

        /**
         * Returns a function to interpolate spherical between two quaternions.
         * Called with a percentage, the function returns the interpolated Quaternion.
         *
         * @param quaternion
         * @returns {(pct: number) => Quaternion}
         */
        slerp(quaternion: Quaternion): (pct: number) => Quaternion;
    }

    export default Quaternion;
}
