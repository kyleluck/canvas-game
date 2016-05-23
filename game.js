function Hero(speed, xPosition, yPosition, image) {
  this.speed = speed;
  this.xPosition = xPosition;
  this.yPosition = yPosition;
  this.image = image;
  this.directions = ["up", "down", "left", "right"];
  this.direction = "stay";
}

function Enemy(speed, xPosition, yPosition, image) {
  this.speed = speed;
  this.xPosition = xPosition;
  this.yPosition = yPosition;
  this.direction = "up";
  this.image = image;
  this.directions = ["up", "down", "left", "right", "up-left", "up-right", "down-left","down-right"];

}
Enemy.prototype.changeEnemyDirection = function() {
  var randomNumber = Math.floor(Math.random() * this.directions.length);
  this.direction = this.directions[randomNumber];
}

function Game(backgroundImage) {
  this.backgroundImage = backgroundImage;
  this.score = 0;
  this.highScore = 0;
  this.counter = 0;
  this.gameOver = false;
}

Game.prototype.moveObject = function(player) {
  if (player.direction === "stay") {
    player.direction = "stay";
  }
  else if (player.direction === "up") {
    // move this up
    if (player.yPosition <= 0) { // up
      player.yPosition = 460;
    } else {
      player.yPosition -= player.speed;
    }
  }
  else if (player.direction === "down") {
    // move player down
    if ( player.yPosition >= 460) { // down
      player.yPosition = 0;
    } else{
      player.yPosition += player.speed;
    }
  }
  else if (player.direction === "left") {
    // move player left
    if (player.xPosition <= 0) { // left
      player.xPosition = 512;
    } else{
      player.xPosition -= player.speed;
    }
  }
  else if (player.direction === "right"){
    //move right
    if (player.xPosition >= 500) { // right
      player.xPosition = 0;
    }
    else{
      player.xPosition += player.speed;
    }
  }
  else if (player.direction === "up-left") {
    //move up-left
    if (player.xPosition <= 0) {
      player.xPosition = 512;
    }
    else {
      player.xPosition -= player.speed;
    }
    if (player.yPosition <= 0) {
      player.yPosition = 460;
    }
    else {
      player.yPosition -= player.speed;
    }
  }
  else if (player.direction === "up-right") {
    //move up-right
    if (player.xPosition >= 500) {
      player.xPosition = 0;
    }
    else {
      player.xPosition += player.speed;
    }
    if (player.yPosition <= 0) {
      player.yPosition = 460;
    }
    else {
      player.yPosition -= player.speed;
    }
  }
  else if (player.direction === "down-left") {
    //move down-left
    if (player.xPosition <= 0) {
      player.xPosition = 512;
    }
    else {
      player.xPosition -= player.speed;
    }
    if (player.yPosition >= 460) {
      player.yPosition = 0;
    }
    else {
      player.yPosition += player.speed;
    }
  }
  else if (player.direction === "down-right") {
    //move down-right
    if (player.xPosition >= 500) {
      player.xPosition = 0;
    }
    else {
      player.xPosition += player.speed;
    }
    if (player.yPosition >= 460) {
      player.yPosition = 0;
    }
    else {
    player.yPosition += player.speed;
    }
  }
}

Game.prototype.collisionDetection = function() {
  if (!((hero.xPosition + 32 < monster.xPosition) || (monster.xPosition + 32 < hero.xPosition) || (hero.yPosition + 32 < monster.yPosition) || (monster.yPosition + 32 < hero.yPosition))) {
    game.score++;
    monster.xPosition = Math.floor(Math.random() * 499);
    monster.yPosition = Math.floor(Math.random() * 459);
    return false;
  }
  if (!((hero.xPosition + 32 < goblin1.xPosition) || (goblin1.xPosition + 32 < hero.xPosition) || (hero.yPosition + 32 < goblin1.yPosition) || (goblin1.yPosition + 32 < hero.yPosition))) {
    game.gameOver = true;
    return true;
  }
  if (!((hero.xPosition + 32 < goblin2.xPosition) || (goblin2.xPosition + 32 < hero.xPosition) || (hero.yPosition + 32 < goblin2.yPosition) || (goblin2.yPosition + 32 < hero.yPosition))) {
    game.gameOver = true;
    return true;
  }
}

Game.prototype.resetGame = function(){
  this.score = 0;
  hero.xPosition = 240;
  hero.yPosition = 256;
  monster.xPosition = 150;
  monster.yPosition = 150;
  goblin1.xPosition = 50;
  goblin1.yPosition = 50;
  goblin2.xPosition = 400;
  goblin2.yPosition = 400;
  this.counter = 0;
}

var hero = new Hero(5, 240, 256, 'images/hero.png');
var monster = new Enemy(4, 150, 150, 'images/monster.png');
var goblin1 = new Enemy(2, 50, 50, 'images/goblin.png');
var goblin2 = new Enemy(2, 400, 400, 'images/goblin.png');

var game = new Game('images/background.png');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var heroImage = new Image();
heroImage.src = hero.image;
var backgroundImage = new Image();
backgroundImage.src = game.backgroundImage;
var monsterImage = new Image();
monsterImage.src = monster.image;
var goblinImage1 = new Image();
goblinImage1.src = goblin1.image;
var goblinImage2 = new Image();
goblinImage2.src = goblin2.image;

window.addEventListener('keydown', function(e) {
  var key = e.keyCode;

  if (key === 37) {
    hero.direction = 'left';
  } else if (key === 39) {
    hero.direction = 'right';
  } else if (key === 38) {
    hero.direction = 'up';
  } else if (key === 40) {
    hero.direction = 'down';
  }
  if(key === 32){
    if (game.gameOver) {
      main();
    }
  }
});

var mapOfKeysPressed = [];
onkeydown = onkeyup = function(e){
    mapOfKeysPressed[e.keyCode] = e.type == 'keydown';
};

window.addEventListener('keyup', function() {
  if ((!mapOfKeysPressed[37] && !mapOfKeysPressed[38] && !mapOfKeysPressed[39] && !mapOfKeysPressed[40])) {
    hero.direction = 'stay';
  }
});



function main() {
  game.counter++;
  game.moveObject(hero);
  ctx.drawImage(backgroundImage, 0 , 0);
  ctx.font = "16px serif";
  ctx.fillStyle  = "white";
  ctx.fillText("Score: "+ game.score, 35, 43);
  ctx.fillText("High Score: " + game.highScore, 35, 63);

  var gameIsOver = game.collisionDetection();
  if (gameIsOver) {
    if (game.score > game.highScore) {
      game.highScore = game.score;
    }
    game.resetGame();
    ctx.drawImage(backgroundImage, 0 , 0);
    ctx.fillText("Score: "+ game.score, 35, 43);
    ctx.fillText("High Score: " + game.highScore, 35, 63);
    return;
  }

  ctx.drawImage(heroImage, hero.xPosition, hero.yPosition);
  ctx.drawImage(monsterImage, monster.xPosition, monster.yPosition);
  ctx.drawImage(goblinImage1, goblin1.xPosition, goblin1.yPosition);
  ctx.drawImage(goblinImage2, goblin2.xPosition, goblin2.yPosition);

  if (game.counter % 50 === 0) {
     monster.changeEnemyDirection();
     goblin1.changeEnemyDirection();
     goblin2.changeEnemyDirection();
  }

  game.moveObject(monster);
  game.moveObject(goblin1);
  game.moveObject(goblin2);

  requestAnimationFrame(main);
}
main();
