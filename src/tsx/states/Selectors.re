let cubicles = (state: Store.State.t) => state.cube.cubicles;
let numberOfCubicles = (state: Store.State.t) => state.cube.numberOfCubicles;
let cubeSize = (state: Store.State.t) => state.cube.size;
let scale = (state: Store.State.t) => state.cube.scale;
let rotationAnimationSpeed = (state: Store.State.t) =>
  state.cube.rotationAnimationSpeed;
let rotation = (state: Store.State.t) =>
  Math.Matrix4.Operators.(
    Math.Matrix4.fromAngleX(state.cube.pitch)
    << Math.Matrix4.fromAngleY(state.cube.yaw)
  ); // TODO reselect?

let playerNotation = (state: Store.State.t) => state.algorithmPlayer.notation;
let playerStatus = (state: Store.State.t) => state.algorithmPlayer.status;