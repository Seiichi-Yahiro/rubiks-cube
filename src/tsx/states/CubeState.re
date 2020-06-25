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
    | ApplyRotation;
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
  | _ => state
  };