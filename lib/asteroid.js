(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  Asteroids.Asteroid = function (options) {
    this.color = 'blue';
    this.radius = 10;

    Asteroids.MovingObject.call({
      color: this.color,
      radius: this.radius,
      vel: randomVel
    });
  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);


})();
