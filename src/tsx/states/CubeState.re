module State = {
  type rotation = {
    pitch: Math.Angle.t,
    yaw: Math.Angle.t,
    transform: Math.Matrix4.t,
  };

  type t = {
    numberOfCubicles: int,
    size: float,
    gap: float,
    scale: float,
    rotationAnimationSpeed: int,
    rotation,
    cubicles: list(RubiksCubeUtils.Cubicle.t),
  };

  let initial: t = {
    numberOfCubicles: 3,
    size: 300.0,
    gap: 1.01,
    scale: 1.0,
    rotation: {
      pitch: Deg(-45.0),
      yaw: Deg(-45.0),
      // initialized by epic
      transform: Math.Matrix4.identity,
    },
    rotationAnimationSpeed: 750,
    cubicles: [] // initialized by epic
  };
};

module Action = {
  type t =
    | UpdateNumberOfCubicles(int)
    | UpdateScale(float)
    | UpdateRotationAnimationSpeed(int)
    | UpdateRotation(Math.Angle.t, Math.Angle.t)
    | StartRotationCommand(RotationCommand.t)
    | FinishRotationCommmand;
};

let reducer = (state: State.t, action: Action.t) =>
  switch (action) {
  | UpdateNumberOfCubicles(numberOfCubicles) => {
      ...state,
      numberOfCubicles,
      cubicles:
        RubiksCubeUtils.init(
          ~numberOfCubicles,
          ~cubeSize=state.size,
          ~cubicleGap=state.gap,
        ),
    }
  | UpdateScale(scale) => {...state, scale}
  | UpdateRotationAnimationSpeed(rotationAnimationSpeed) => {
      ...state,
      rotationAnimationSpeed,
    }
  | UpdateRotation(pitch, yaw) =>
    open Math;
    open Math.Matrix4.Operators;

    let pitch =
      state.rotation.pitch
      ->Angle.add(pitch)
      ->Angle.clamp(~min=Deg(-45.0), ~max=Deg(45.0));

    let yaw = state.rotation.yaw->Angle.add(yaw);

    let transform = Matrix4.fromAngleX(pitch) << Matrix4.fromAngleY(yaw);

    {
      ...state,
      rotation: {
        pitch,
        yaw,
        transform,
      },
    };
  | StartRotationCommand(command) =>
    switch (command) {
    | Full(slice, letter, wide, degree) =>
      let slices = wide ? Belt.List.makeBy(slice, i => i + 1) : [slice];
      let commandAxis = letter->RotationCommand.Letter.toAxis;

      let hasMatchingAxis =
        RubiksCubeUtils.Axis.matchesRotationCommandAxis(
          ~commandAxis,
          ~slices,
          ~numberOfCubicles=state.numberOfCubicles,
        );

      let cubicles =
        state.cubicles
        ->Belt.List.map(cubicle =>
            if (cubicle.axis->hasMatchingAxis) {
              {
                ...cubicle,
                animationTransform:
                  degree->RotationCommand.Degree.toMatrix4(~axis=commandAxis),
              };
            } else {
              cubicle;
            }
          );

      {...state, cubicles};

    | Simple(letter, degree) =>
      let slices =
        switch (letter) {
        | L(case)
        | R(case)
        | U(case)
        | D(case)
        | F(case)
        | B(case) => case->RotationCommand.Case.isLowerCase ? [1, 2] : [1]
        | M(case)
        | E(case)
        | S(case) =>
          case->RotationCommand.Case.isLowerCase
            ? state.numberOfCubicles mod 2 === 0
                ? [
                  state.numberOfCubicles / 2,
                  state.numberOfCubicles / 2 + 1,
                ]
                : [state.numberOfCubicles / 2]
            : Belt.List.makeBy(state.numberOfCubicles - 2, i => i + 2)
        | X(_)
        | Y(_)
        | Z(_) => Belt.List.makeBy(state.numberOfCubicles, i => i + 1)
        };
      let commandAxis = letter->RotationCommand.Letter.toAxis;

      let hasMatchingAxis =
        RubiksCubeUtils.Axis.matchesRotationCommandAxis(
          ~commandAxis,
          ~slices,
          ~numberOfCubicles=state.numberOfCubicles,
        );

      let cubicles =
        state.cubicles
        ->Belt.List.map(cubicle =>
            if (cubicle.axis->hasMatchingAxis) {
              {
                ...cubicle,
                animationTransform:
                  degree->RotationCommand.Degree.toMatrix4(~axis=commandAxis),
              };
            } else {
              cubicle;
            }
          );
      {...state, cubicles};

    | Group(_, _) => state
    }
  | FinishRotationCommmand => {
      ...state,
      cubicles:
        state.cubicles
        ->Belt.List.map(cubicle =>
            {
              ...cubicle,
              animationTransform: Math.Matrix4.identity,
              transform:
                cubicle.animationTransform
                ->Math.Matrix4.multiply(cubicle.transform),
            }
          ),
    }
  };