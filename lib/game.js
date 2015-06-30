(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Game = Asteroids.Game = function (options) {
    this.DIM_X = options.DIM_X;
    this.DIM_Y = options.DIM_Y;
    this.NUM_ASTEROIDS = 1;
    this.asteroids = [];
    this.addAsteroids();
    this.ctx = options.ctx;


  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      var asteroid = new Asteroids.Asteroid({
        pos: this.randomPosition()
      });

      this.asteroids.push(asteroid);
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

  Game.prototype.draw = function () {
    debugger
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    }
    this.ctx.stroke();
  };
})();
