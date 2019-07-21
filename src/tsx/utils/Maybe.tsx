import { isFunction, isNil } from 'lodash';

class Maybe<T> {
    /**
     * Create a maybe with a value T
     * Throws error if value is null or undefined
     * @param value
     */
    static some<T>(value: T) {
        if (isNil(value)) {
            throw Error('Provided value must not be empty');
        }
        return new Maybe<NonNullable<T>>(value!);
    }

    /**
     * Create a maybe with no value
     */
    static none<T>() {
        return new Maybe<NonNullable<T>>(null);
    }

    /**
     * Create a maybe that is either some or none depending on the provided value
     * @param value
     */
    static of<T>(value: T) {
        return isNil(value) ? Maybe.none<NonNullable<T>>() : Maybe.some<NonNullable<T>>(value!);
    }

    /**
     * Get the first maybe that is some otherwise return none
     * @param maybeList
     */
    static or<T>(...maybeList: Array<(() => Maybe<T>) | Maybe<T>>): Maybe<T> {
        for (const maybeF of maybeList) {
            const maybe = isFunction(maybeF) ? maybeF() : maybeF;
            if (maybe.isSome()) {
                return maybe;
            }
        }

        return Maybe.none();
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
    get = (): T => {
        if (this.isNone()) {
            throw Error('Provided value must not be empty');
        }

        return this.value!;
    };

    /**
     * Get the value of the maybe if it is a some otherwise use the provided default value
     * @param defaultValue - default value (or function that creates a default value) to be used if value is none
     */
    getOrElse = (defaultValue: (() => T) | T): T => {
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
    let<U>(onSome: (value: T) => U | Maybe<U>): Maybe<NonNullable<U>> {
        if (this.isNone()) {
            return Maybe.none();
        }

        const result = onSome(this.value!);

        if (result instanceof Maybe) {
            return result as Maybe<NonNullable<U>>;
        }

        return Maybe.of(result);
    }

    /**
     * Get the value of the maybe to work with it and return a new type if the maybe is some otherwise use provided default value
     * @param onSome - a function receiving the value returning a new value
     * @param defaultValue - default value (or function that creates a default value) to be used if value is none
     */
    letOrElse<U>(onSome: (value: T) => U, defaultValue: (() => U) | U): U {
        if (this.isNone()) {
            return isFunction(defaultValue) ? defaultValue() : defaultValue;
        }

        return onSome(this.value!);
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
     * Check if two maybe instances are the same
     * @param maybe - a maybe to compare
     */
    equals = (maybe: Maybe<T>) =>
        this === maybe ||
        (this.isNone() && maybe.isNone()) ||
        (this.isSome() && maybe.isSome() && this.get() === maybe.get());

    private constructor(private value: T | null) {}
}

export default Maybe;
