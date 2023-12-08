import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElm = document.getElementById("player-score");
const computerScoreElm = document.getElementById("computer-score");

let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;

    // PLAY THE GAME CODE
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);

    computerPaddle.update(delta, ball.y);
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    // change hue overtime
    document.documentElement.style.setProperty("--hue", hue + delta * 0.005);

    if (isLose()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElm.textContent = parseInt(playerScoreElm.textContent) + 1;
  } else {
    computerScoreElm.textContent = parseInt(computerScoreElm.textContent) + 1;
  }
  ball.reset();
  computerPaddle.reset();
}

document.addEventListener("mousemove", (event) => {
  playerPaddle.position = (event.y / window.innerHeight) * 100;
});

// every frame it will call the update function
window.requestAnimationFrame(update);
