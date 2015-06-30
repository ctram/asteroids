(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Asteroid = Asteroids.Asteroid = function (options) {
    this.radius = Math.random() * 40;
    this.pos = options.pos;
    this.speed = Math.random() * 10;
    this.game = options.game;


    Asteroids.MovingObject.call(this, {
      radius: this.radius,
      vel: Asteroids.Util.randomVel(this.speed),
      pos: this.pos,
      game: this.game
    });
  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };


})();
