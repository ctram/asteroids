(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Game = Asteroids.Game = function (options) {
    this.DIM_X = options.DIM_X;
    this.DIM_Y = options.DIM_Y;
    this.NUM_ASTEROIDS = 10;
    this.asteroids = [];
    this.addAsteroids();
    this.ctx = options.ctx;
    this.ship = new Asteroids.Ship({
      pos: this.randomPosition()
    });


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

  Game.prototype.allObjects = function () {
    arrShip = [this.ship];
    return arrShip.concat(this.asteroids);
  };

  Game.prototype.checkCollisions = function () {
    var num_objs = this.allObjects.length;
    for (var i = 0; i < num_objs - 1; i++) {
      for (var j = 0; j < num_objs - 1; j++) {
        if (i === j) {
          continue;
        } else {
          var obj1 = this.allObjects[i];
          var obj2 = this.allObjects[j];

          if (obj1.isCollidedWith(obj2)) {
            obj1.collideWith(obj2);
            num_objs = this.allObjects.length;
          }
        }
      }
    }
  };

  Game.prototype.draw = function () {

    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    for (var i = 0; i < this.allObjects.length; i++) {
      this.allObjects[i].draw(this.ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    for (var i = 0; i < this.allObjects.length; i++) {
      this.allObjects[i].move();
    }
  };

  Game.prototype.randomPosition = function () {
    randomX = this.DIM_X * Math.random();
    randomY = this.DIM_Y * Math.random();

    return [randomX, randomY];
  };

  Game.prototype.remove = function (asteroid) {
    var i = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(i, 1);
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

    if (x < 0) {
      x = this.DIM_X - x;
    }

    if (y < 0) {
      y = this.DIM_Y - y;
    }

    return [x, y];
  };
})();
