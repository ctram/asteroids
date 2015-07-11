(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Game = Asteroids.Game = function (options) {
    this.NUM_ASTEROIDS = 20;
    this.asteroids = [];
    this.bullets = [];
    this.ctx = options.ctx;
    this.DIM_X = options.DIM_X;
    this.DIM_Y = options.DIM_Y;
    this.gameView = options.gameView;
    this.colors = ['orange', 'green', 'blue', 'purple', 'yellow', 'white', 'brown'];

    this.addAsteroids();
    this.$score = $('.score');
    this.score = 0;
    this.timer = 0;
    this.won = false;
    $('body').click(this.addShip.bind(this));
    $('.play-again-btn').click(this.restart.bind(this));

    this.startTimer();
  };

  Game.prototype.add = function (obj) {

    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else {
      this.bullets.push(obj);
    }
  };

  Game.prototype.addAsteroids = function () {
    var randNum;
    var color;

    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      randNum = parseInt(Math.random() * 7);
      color = this.colors[randNum];
      var asteroid = new Asteroids.Asteroid({
        pos: this.randomPosition(),
        game: this,
        ctx: this.ctx,
        color: color
      });

      this.asteroids.push(asteroid);
    }
  };

  Game.prototype.addShip = function () {
    this.ship = new Asteroids.Ship({
      // NOTE: static position until game is done
      pos: [400, 400],
      game: this,
      ctx: this.ctx
    });

  };

  Game.prototype.allObjects = function () {
    if (this.ship !== undefined) {
      arrShip = [this.ship];
      return arrShip.concat(this.bullets).concat(this.asteroids);
    } else {
      return this.asteroids;
    }
  };

  // no longer using mouse to control the ship
  // Game.prototype.angleDiffMouse = function (objPos, mousePos) {
  //   var mouseX = mousePos.x;
  //   var mouseY = mousePos.y;
  //
  //   var objX = objPos[0];
  //   var objY = objPos[1];
  //
  //   var deltaX = mouseX - objX;
  //   var deltaY = mouseY - objY;
  //
  //   var diffAngle;
  //
  //   if (deltaX > 0 && deltaY < 0) {
  //     // quadrant I
  //     diffAngle = Asteroids.Util.arcTanDegrees(deltaX, Math.abs(deltaY));
  //   } else if (deltaX > 0 && deltaY > 0) {
  //     // quadrant II
  //     diffAngle = Asteroids.Util.arcTanDegrees(deltaY,  deltaX) + 90;
  //   } else if (deltaX < 0 && deltaY > 0) {
  //     // quadrant III
  //     diffAngle = Asteroids.Util.arcTanDegrees(Math.abs(deltaX), deltaY) + 180;
  //   } else if (deltaX < 0 && deltaY < 0) {
  //     // quadrant IV
  //     diffAngle = Asteroids.Util.arcTanDegrees(Math.abs(deltaY), Math.abs(deltaX)) + 270;
  //   } else {
  //     diffAngle = 0;
  //   }
  //   return diffAngle;
  // };

  Game.prototype.checkCollisions = function () {
    var num_objs = this.allObjects().length;
    for (var i = 0; i < num_objs; i++) {
      for (var j = 0; j < num_objs; j++) {
        if (i === j) {
          continue;
        } else {
          var obj1 = this.allObjects()[i];
          var obj2 = this.allObjects()[j];

          if (obj1.isCollidedWith(obj2)) {
            obj1.collideWith(obj2);
            num_objs = this.allObjects().length;
          }
        }
      }
    }
  };

  Game.prototype.checkThrottle = function () {
    if (!key.isPressed('up') && !key.isPressed('down')) {
      this.ship.brake();
    }
  };

  Game.prototype.checkWin = function () {
    if (this.asteroids.length === 0) {
      this.won = true;
    }
  };

  Game.prototype.draw = function () {

    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    var obj;
    for (var i = 0; i < this.allObjects().length; i++) {
      obj = this.allObjects()[i];
      obj.draw(this.ctx);
    }
    // // NOTE: to show mouse attributes on screen - to remove later.
    // // this.updateShipStats();
    // this.ctx.font = '18pt Calibri';
    // this.ctx.fillStyle = 'white';
    // this.ctx.fillText(this.message, 10, 25);
  };

  Game.prototype.drawScore = function () {
    var text = 'Score: ' + this.score;
    this.$score.text(text);
  };

  Game.prototype.drawTimer = function () {
    var time = this.timer / 100;
    $('.timer').text(time);
  };

  Game.prototype.getMousePos = function (canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  };

  Game.prototype.isOutOfBounds = function (pos) {
    var x = pos[0];
    var y = pos[1];

    if ((x > this.DIM_X || x < 0) || (y > this.DIM_Y || y < 0)) {
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.isWin = function () {
    if (this.asteroids.length === 0) {
      return true;
    }
    return false;
  };

  Game.prototype.moveObjects = function () {
    for (var i = 0; i < this.allObjects().length; i++) {

      this.allObjects()[i].move();
    }
  };

  Game.prototype.populateWinningStats = function () {
    if (this.highScore === undefined) {
      this.highScore = this.score;
    } else {
      if (this.score > this.highScore) {
        this.highScore = this.score;
      }
    }
    if (this.bestTime === undefined) {
      this.bestTime = this.timer;
    } else {
      if (this.timer < this.bestTime) {
        this.bestTime = this.timer;
      }
    }

    $('.end-score').text(this.score);
    $('.high-score').text(this.highScore);
    $('.curr-time').text(this.timer/100);
    $('.best-time').text(this.bestTime/100);
  };

  Game.prototype.randomPosition = function () {
    randomX = this.DIM_X * Math.random();
    randomY = this.DIM_Y * Math.random();

    return [randomX, randomY];
  };

  Game.prototype.remove = function (obj) {
    var i;
    if (obj instanceof Asteroids.Asteroid) {
      i = this.asteroids.indexOf(obj);
      this.asteroids.splice(i, 1);
    } else {
      // bullet
      i = this.bullets.indexOf(obj);
      this.bullets.splice(i, 1);
    }
  };

  Game.prototype.restart = function () {
    this.toggleWinningModal();
    this.addAsteroids();
    this.addShip();
    this.score = 0;
    this.timer = 0;
    this.gameView.start();
  };

  Game.prototype.step = function () {
    this.drawScore();
    this.drawTimer();

    if (!this.won) {
      this.checkWin();
    }

    if (this.won) {
      this.won = false;
      this.toggleWinningModal();
      this.populateWinningStats();
      clearInterval(this.gameInterval);
    }

    if (this.ship !== undefined) {
      this.checkThrottle();
    }
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.startTimer = function () {
    this.timer = 0;
    this.timerInterval = setInterval(function () {
      this.timer += 1; // 1/100 of a second
    }.bind(this), 10);
  };

  Game.prototype.stopTimer = function () {
    clearInterval(this.timerInterval);
  };

  Game.prototype.toggleWinningModal = function () {
    $('#winningModal').modal('toggle');
  };

  Game.prototype.updateShipStats = function () {
    this.ship.heading = this.ship.heading;
    this.message = 'Mouse position: X: ' + this.mousePos.x + ' Y: ' + this.mousePos.y + ', Heading: ' + this.ship.heading;
    // this.writeMessage(this.canvasEl, message);
  };

  Game.prototype.wrap = function (pos) {
    var x = pos[0];
    var y = pos[1];

    x = x % this.DIM_X;
    y = y % this.DIM_Y;

    if (x < 0) {
      x = this.DIM_X - x;
    }

    if (y < 0) {
      y = this.DIM_Y - y;
    }

    return [x, y];
  };

  // Game.prototype.writeMessage = function (canvas, message) {
  //   var context = canvas.getContext('2d');
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   context.font = '8pt Calibri';
  //   context.fillStyle = 'black';
  //   context.fillText(message, 10, 25);
  // };
})();
