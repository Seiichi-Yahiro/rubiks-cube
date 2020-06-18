type mouseMoveDelta = {
  x: float,
  y: float,
};

let useDrag =
    (
      ~startArea: Web.Element.t=Window,
      ~moveArea: Web.Element.t=Window,
      ~onDrag: mouseMoveDelta => unit,
      (),
    ) => {
  let onDragRef = React.useRef(onDrag);

  React.useEffect1(
    () => {
      onDragRef.current = onDrag;
      None;
    },
    [|onDrag|],
  );

  React.useEffect2(
    () => {
      let mouseDown = startArea->Web.Element.observe("mousedown");
      let mouseUp = Window->Web.Element.observe("mouseup");
      let mouseMove = moveArea->Web.Element.observe("mousemove");

      switch (mouseDown, mouseUp, mouseMove) {
      | (Some(mouseDown), Some(mouseUp), Some(mouseMove)) =>
        let drag =
          mouseDown
          |> Rx.Operators.switchMapn(_ => {
               mouseMove
               |> Rx.Operators.mapn(moveEvent => {
                    moveEvent->Web.MouseEvent.preventDefault;
                    {
                      x: moveEvent->Web.MouseEvent.movementX,
                      y: moveEvent->Web.MouseEvent.movementY,
                    };
                  })
               |> Rx.Operators.takeUntil(mouseUp)
             });

        let subscription =
          drag |> Rx.Observable.subscribe(~next=onDragRef.current);

        Some(() => subscription |> Rx.Subscription.unsubscribe);
      | _ => None
      };
    },
    (startArea, moveArea),
  );
};