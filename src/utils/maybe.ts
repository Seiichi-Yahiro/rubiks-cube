import { isFunction, isNil } from 'es-toolkit';

type TypeOrMaybeType<T> = T | Maybe<T>;
type FunctionOrValue<T> = (() => TypeOrMaybeType<T>) | TypeOrMaybeType<T>;

class Maybe<T> {
    /**
     * Create a maybe with a value T
     * If the value is already a maybe then the returning type WON'T be double wrapped with a maybe
     * Throws error if value is null or undefined
     * @param value
     */
    static some<T>(value: FunctionOrValue<T>): Maybe<NonNullable<T>> {
        if (isNil(value)) {
            throw Error('Provided value must not be empty');
        }

        const result = isFunction(value) ? value()! : value!;

        if (result instanceof Maybe) {
            return result as Maybe<NonNullable<T>>;
        }

        return new Maybe<NonNullable<T>>(result);
    }

    /**
     * Create a maybe with no value
     */
    static none<T>(): Maybe<NonNullable<T>> {
        return new Maybe<NonNullable<T>>(null);
    }

    /**
     * Create a maybe that is either some or none depending on the provided value
     * If the value is already a maybe then the returning type WON'T be double wrapped with a maybe
     * @param value
     */
    static of<T>(value: FunctionOrValue<T>): Maybe<NonNullable<T>> {
        return isNil(value) ? Maybe.none() : Maybe.some(value);
    }

    /**
     * Create a maybe from a function that might throw an error
     * Returns none if an error is thrown
     * @param valueFunction
     */
    static tryOf<T>(valueFunction: () => T): Maybe<NonNullable<T>> {
        try {
            const value = valueFunction();
            return Maybe.of(value);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return Maybe.none();
        }
    }

    /**
     * Check if maybe is a some
     */
    isSome = (): boolean => !this.isNone();

    /**
     * Check if maybe is a none
     */
    isNone = (): boolean => isNil(this.value);

    /**
     * Get the value of the maybe
     * Avoid this function if possible
     * Throws error if the maybe is a none
     */
    unwrap = (): T => {
        if (this.isNone()) {
            throw Error('Provided value must not be empty');
        }

        return this.value!;
    };

    /**
     * Get the value of the maybe
     * Avoid this function if possible
     * Throws custom error message if the maybe is a none
     * @param errorMsg
     */
    expect = (errorMsg: string): T => {
        if (this.isNone()) {
            throw Error(errorMsg);
        }

        return this.value!;
    };

    /**
     * Get the value of the maybe if it is a some otherwise use the provided default value
     * @param defaultValue - default value (or function that creates a default value) to be used if value is none
     */
    unwrapOr = (defaultValue: (() => T) | T): T => {
        if (this.isNone()) {
            return isFunction(defaultValue) ? defaultValue() : defaultValue;
        }

        return this.value!;
    };

    /**
     * Get the value of the maybe to work with it and return a new type wrapped in a maybe
     * If the new type is also a maybe then the returning type WON'T be double wrapped with a maybe
     * @param onSome - a function receiving the value returning a new value
     */
    map<U>(onSome: (value: T) => U | Maybe<U>): Maybe<NonNullable<U>> {
        if (this.isNone()) {
            return this as unknown as Maybe<NonNullable<U>>;
        }

        return Maybe.of(() => onSome(this.value!));
    }

    /**
     * Get the value of the maybe to work with it and return a new type if the maybe is some otherwise use provided default value
     * @param onSome - a function receiving the value returning a new value
     * @param defaultValue - default value (or function that creates a default value) to be used if value is none
     */
    mapOr<U>(onSome: (value: T) => U, defaultValue: (() => U) | U): U {
        if (this.isNone()) {
            return isFunction(defaultValue) ? defaultValue() : defaultValue;
        }

        return onSome(this.value!);
    }

    /**
     * Calls predicate with the contained value and returns this if predicate is true otherwise returns None
     * @param predicate - filter function
     */
    filter(predicate: (value: T) => boolean): Maybe<NonNullable<T>> {
        if (this.isSome()) {
            if (predicate(this.unwrap())) {
                return this as unknown as Maybe<NonNullable<T>>;
            }
        }

        return Maybe.none();
    }

    /**
     * Use provided value if this is Some otherwise return None
     * @param other - provided value
     */
    and<U>(other: (() => Maybe<U>) | Maybe<U>): Maybe<NonNullable<T | U>> {
        if (this.isSome()) {
            return Maybe.of(other);
        }

        return this as unknown as Maybe<NonNullable<T | U>>;
    }

    /**
     * Use provided value if this is None otherwise return this
     * @param other - provided value
     */
    or<U>(other: (() => Maybe<U>) | Maybe<U>): Maybe<NonNullable<T | U>> {
        if (this.isNone()) {
            return Maybe.of(other);
        }

        return this as unknown as Maybe<NonNullable<T | U>>;
    }

    /**
     * Use this if some, or use provided value if some otherwise return None
     * @param other - provided value
     */
    xor<U>(other: (() => Maybe<U>) | Maybe<U>): Maybe<NonNullable<T | U>> {
        const that = Maybe.of(other);

        if (this.isSome() && that.isNone()) {
            return this as unknown as Maybe<NonNullable<T | U>>;
        } else if (this.isNone() && that.isSome()) {
            return that;
        } else {
            return Maybe.none();
        }
    }

    /**
     * Create a maybe from a function that might throw an error
     * Returns none if an error is thrown
     * @param onSome
     */
    try<U>(onSome: (value: T) => U | Maybe<U>): Maybe<NonNullable<U>> {
        try {
            return this.map(onSome);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return Maybe.none();
        }
    }

    /**
     * If value of the maybe is some call the provided function
     * @param onSome - function receiving the value
     */
    ifIsSome = (onSome: (value: T) => void): this => {
        if (this.isSome()) {
            onSome(this.value!);
        }

        return this;
    };

    /**
     * If value of the maybe is none call the provided function
     * @param onNone - function called if value is none
     */
    ifIsNone = (onNone: () => void): this => {
        if (this.isNone()) {
            onNone();
        }

        return this;
    };

    /**
     * Compare the containing value with the provided value
     * Returns false if isNone
     * @param value - value to compare
     */
    contains(value: T): boolean {
        if (this.isSome()) {
            return this.unwrap() === value;
        }

        return false;
    }

    /**
     * Check if two maybe instances are the same
     * @param maybe - a maybe to compare
     */
    equals = (maybe: Maybe<T>) =>
        (this.isNone() && maybe.isNone()) ||
        (this.isSome() && maybe.contains(this.unwrap()));

    private constructor(private value: T | null) {}
}

export default Maybe;
