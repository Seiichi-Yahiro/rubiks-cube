let cubicles = (state: Store.State.t) => state.cube.cubicles;
let numberOfCubicles = (state: Store.State.t) => state.cube.numberOfCubicles;
let cubeSize = (state: Store.State.t) => state.cube.size;
let scale = (state: Store.State.t) => state.cube.scale;
let rotationAnimationSpeed = (state: Store.State.t) =>
  state.cube.rotationAnimationSpeed;

let playerNotation = (state: Store.State.t) => state.algorithmPlayer.notation;
let playerStatus = (state: Store.State.t) => state.algorithmPlayer.status;