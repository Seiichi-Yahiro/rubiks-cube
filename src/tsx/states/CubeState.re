module State = {
  type t = {
    numberOfCubicles: int,
    size: float,
    gap: float,
    scale: float,
    rotationAnimationSpeed: int,
    cubicles: list(RubiksCubeUtils.Cubicle.t),
  };

  let initial: t = {
    numberOfCubicles: 3,
    size: 300.0,
    gap: 1.05,
    scale: 1.0,
    rotationAnimationSpeed: 750,
    cubicles: [],
  };
};

module Action = {
  type t =
    | UpdateNumberOfCubicles(int)
    | UpdateScale(float)
    | UpdateRotationAnimationSpeed(int);
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
  };