// Catch the Apples
// Move the basket with the arrow keys. Catch apples to score. Miss 3 and the game is over.

var basket = createSprite(200, 370, 80, 20);
basket.setAnimation("basket");
basket.shapeColor = "brown";
basket.scale = 100 / basket.width;

var apple = createSprite(200, -20, 30, 30);
apple.setAnimation("apple");
apple.scale = 50 / apple.width;
apple.shapeColor = "red";
var score = 0;
var lives = 3;
resetApple();

function draw() {
  background("lightblue");

  if (keyDown("left")) {
    basket.x = basket.x - 7;
  }
  if (keyDown("right")) {
    basket.x = basket.x + 7;
  }

  if (apple.isTouching(basket)) {
    score = score + 1;
    resetApple();
  }
  if (apple.y > 420) {
    lives = lives - 1;
    resetApple();
  }

  drawSprites();

  fill("black");
  textSize(20);
  text("Score: " + score, 10, 30);
  text("Lives: " + lives, 310, 30);
  if (lives <= 0) {
    apple.velocityY = 0;
    textSize(40);
    text("Game Over", 100, 200);
  }
}

function resetApple() {
  apple.x = randomNumber(20, 380);
  apple.y = -20;
  apple.velocityY = 3 + score * 0.5;
}
