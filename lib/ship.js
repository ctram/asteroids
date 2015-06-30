(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    this.RADIUS = 15;
    this.COLOR = 'blue';
    this.vel = [0, 0];
    this.pos = options.pos;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);
})();
