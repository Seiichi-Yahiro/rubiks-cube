import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const useOnUpdate = (effect: EffectCallback, deps?: DependencyList) => {
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            return effect();
        } else {
            isMounted.current = true;
        }
    }, deps);
};

export default useOnUpdate;
