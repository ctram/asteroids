(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Game = Asteroids.Game = function (options) {
    this.DIM_X = options.DIM_X;
    this.DIM_Y = options.DIM_Y;
    this.NUM_ASTEROIDS = 500;
    this.asteroids = [];
    this.addAsteroids();
    this.ctx = options.ctx;


  };

  Game.prototype.addAsteroids = function () {

    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      var asteroid = new Asteroids.Asteroid({
        pos: this.randomPosition(),
        game: this
      });

      this.asteroids.push(asteroid);
    }
  };

  Game.prototype.checkCollisions = function () {
    var num_asteroids = this.asteroids.length;
    for (var i = 0; i < num_asteroids; i++) {
      for (var j = 0; j < num_asteroids; j++) {
        if (i === j) {
          continue;
        } else {
          var asteroid1 = this.asteroids[i];
          var asteroid2 = this.asteroids[j];
          debugger
          if (asteroid1.isCollidedWith(asteroid2)) {
            alert('Collision!');
          }
        }
      }
    }
  };

  Game.prototype.draw = function () {

    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids[i].move();
    }
  };

  Game.prototype.randomPosition = function () {
    randomX = this.DIM_X * Math.random();
    randomY = this.DIM_Y * Math.random();

    return [randomX, randomY];
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.wrap = function (pos) {
    var x = pos[0];
    var y = pos[1];

    x = x % this.DIM_X;
    y = y % this.DIM_Y;

    return [x, y];
  };
})();
