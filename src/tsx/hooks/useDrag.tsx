import { fromEvent } from 'rxjs';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { RefObject, useEffect, useRef } from 'react';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

export interface MouseMoveDelta {
    x: number;
    y: number;
}

const useDrag = <E extends Event, T extends FromEventTarget<E>>(
    startArea: RefObject<T>,
    ondDrag: (delta: MouseMoveDelta) => void
) => {
    const onDragRef = useRef(ondDrag);

    useEffect(() => {
        onDragRef.current = ondDrag;
    }, [ondDrag]);

    useEffect(() => {
        if (!startArea.current) {
            return;
        }
        const mouseDown$ = fromEvent<MouseEvent>(window, 'mousedown').pipe(
            filter((event) => event.button === 1),
            tap((event) => {
                event.preventDefault();
                event.stopPropagation();
            })
        );
        const mouseUp$ = fromEvent<MouseEvent>(window, 'mouseup').pipe(
            filter((event) => event.button === 1)
        );
        const mouseMove$ = fromEvent<MouseEvent>(window, 'mousemove');

        const dragSubscription = mouseDown$
            .pipe(
                switchMap((_) =>
                    mouseMove$.pipe(
                        map((event) => ({
                            x: event.movementX,
                            y: event.movementY,
                        })),
                        takeUntil(mouseUp$)
                    )
                )
            )
            .subscribe(onDragRef.current);

        return () => {
            dragSubscription.unsubscribe();
        };
    }, [startArea]);
};

export default useDrag;
