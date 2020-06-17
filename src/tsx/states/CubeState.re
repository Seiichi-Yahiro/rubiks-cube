module State = {
  type t = {
    numberOfCubicles: int,
    size: float,
    scale: float,
    rotationAnimationSpeed: int,
    cubicles: list(RubiksCubeUtils.Cubicle.t),
  };

  let initial: t = {
    numberOfCubicles: 3,
    size: 300.0,
    scale: 1.0,
    rotationAnimationSpeed: 750,
    cubicles: RubiksCubeUtils.init(~numberOfCubicles=3, ~cubeSize=300.0),
  };
};

module Action = {
  type t =
    | UpdatenumberOfCubicles(int)
    | UpdateScale(float)
    | UpdateRotationAnimationSpeed(int);
};

let reducer = (state: State.t, action: Action.t) =>
  switch (action) {
  | UpdatenumberOfCubicles(numberOfCubicles) => {
      ...state,
      numberOfCubicles,
      cubicles: RubiksCubeUtils.init(~numberOfCubicles, ~cubeSize=state.size),
    }
  | UpdateScale(scale) => {...state, scale}
  | UpdateRotationAnimationSpeed(rotationAnimationSpeed) => {
      ...state,
      rotationAnimationSpeed,
    }
  };