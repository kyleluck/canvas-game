function Player(speed, xPosition, yPosition, image) {
  this.speed = speed;
  this.xPosition = xPosition;
  this.yPosition = yPosition;
  this.image = image;
  this.dirX = 0;
  this.dirY = 0;
}

Player.prototype.changeEnemyDirection = function() {
  this.dirX = Math.floor(Math.random() * 3) - 1;
  this.dirY = Math.floor(Math.random() * 3) - 1;
}

function Game(backgroundImage) {
  this.backgroundImage = backgroundImage;
  this.score = 0;
  this.highScore = 0;
  this.counter = 0;
  this.gameOver = false;
}

Game.prototype.moveObject = function(player) {
  player.yPosition += player.dirY * player.speed;
  player.xPosition += player.dirX * player.speed;
  if (player.xPosition > 512) {
    player.xPosition = 0;
  }
  if (player.xPosition < 0) {
    player.xPosition = 512;
  }
  if (player.yPosition > 480) {
    player.yPosition = 0;
  }
  if (player.yPosition < 0) {
    player.yPosition = 480;
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
  this.gameOver = true;
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

var hero = new Player(5, 240, 256, 'images/hero.png');
var monster = new Player(4, 150, 150, 'images/apple.png');
var goblin1 = new Player(2, 50, 50, 'images/windows.png');
var goblin2 = new Player(2, 400, 400, 'images/windows.png');
var game = new Game('images/background.png');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var heroImageRight = new Image();
heroImageRight.src = 'images/steve-right.png';
var heroImageLeft = new Image();
heroImageLeft.src = 'images/steve-left.png';
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
    hero.dirX = -1;
  } else if (key === 39) {
    hero.dirX = 1;
  } else if (key === 38) {
    hero.dirY = -1;
  } else if (key === 40) {
    hero.dirY = 1;
  }
  if(key === 32){
    if (game.gameOver) {
      main();
    }
  }
});

window.addEventListener('keyup', function(event) {
  var key = event.keyCode;
  if (key === 37) { // left
    hero.dirX = 0;
  } else if (key === 39) { // right
    hero.dirX = 0;
  } else if (key === 38) { // up
    hero.dirY = 0;
  } else if (key === 40) { // down
    hero.dirY = 0;
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
    ctx.drawImage(backgroundImage, 0 , 0);
    ctx.fillText("Score: "+ game.score, 35, 43);
    ctx.fillText("High Score: " + game.highScore, 35, 63);
    game.resetGame();
    return;
  }

  if (hero.dirX >= 0) {
    ctx.drawImage(heroImageRight, hero.xPosition, hero.yPosition);
  } else {
    ctx.drawImage(heroImageLeft, hero.xPosition, hero.yPosition);
  }
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
