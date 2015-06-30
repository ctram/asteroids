(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Asteroid = Asteroids.Asteroid = function (options) {
    this.color = 'blue';
    this.radius = 10;
    this.pos = options.pos;
    this.speed = Math.random() * 10;

    Asteroids.MovingObject.call(this, {
      color: this.color,
      radius: this.radius,
      vel: Asteroids.Util.randomVel(this.speed),
      pos: this.pos
    });
  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);


})();
