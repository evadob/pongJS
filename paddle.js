const SPEED = 0.02;

export default class Paddle {
  constructor(paddleElm) {
    this.paddleElm = paddleElm;
    this.reset();
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElm).getPropertyValue("--position")
    );
  }
  set position(value) {
    this.paddleElm.style.setProperty("--position", value);
  }

  rect() {
    return this.paddleElm.getBoundingClientRect();
  }

  // Like this the computer would be unbeatable
  // update(delta, ballY) {
  //   this.position = ballY;
  // }

  update(delta, ballY) {
    this.position += SPEED * delta * (ballY - this.position);
  }
  reset() {
    this.position = 50;
  }
}
