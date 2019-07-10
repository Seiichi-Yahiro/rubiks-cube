import { useEffect, useRef, useState } from 'react';
import { Slerp } from './CubeUtils';

const useCubeAnimation = (stepSize: number, dependency: Slerp) => {
    const [percent, setPercent] = useState(1);

    const oldDependency = useRef(dependency);

    useEffect(() => {
        let shouldStop = false;

        const animate = () => {
            setPercent(prevState => {
                if (oldDependency.current !== dependency) {
                    oldDependency.current = dependency;
                    return stepSize;
                } else if (prevState + stepSize >= 1) {
                    shouldStop = true;
                    return 1;
                }
                return prevState + stepSize;
            });

            if (!shouldStop) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

        return () => {
            shouldStop = true;
        };
    }, [dependency]);

    if (oldDependency.current !== dependency) {
        return 0;
    }

    return percent;
};

export default useCubeAnimation;
