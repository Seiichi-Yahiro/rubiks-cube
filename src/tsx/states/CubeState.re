module State = {
  type t = {
    numberOfCubicles: int,
    size: float,
    gap: float,
    scale: float,
    rotationAnimationSpeed: int,
    pitch: Math.Angle.t,
    yaw: Math.Angle.t,
    cubicles: list(RubiksCubeUtils.Cubicle.t),
  };

  let initial: t = {
    numberOfCubicles: 3,
    size: 300.0,
    gap: 1.05,
    scale: 1.0,
    pitch: Deg(-45.0),
    yaw: Deg(-45.0),
    rotationAnimationSpeed: 750,
    cubicles: [],
  };
};

module Action = {
  type t =
    | UpdateNumberOfCubicles(int)
    | UpdateScale(float)
    | UpdateRotationAnimationSpeed(int)
    | UpdateRotation(Math.Angle.t, Math.Angle.t);
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
  | UpdateRotation(pitch, yaw) => {
      ...state,
      pitch:
        state.pitch
        ->Math.Angle.add(pitch)
        ->Math.Angle.clamp(~min=Deg(-45.0), ~max=Deg(45.0)),
      yaw: state.yaw->Math.Angle.add(yaw),
    }
  };