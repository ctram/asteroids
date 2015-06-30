(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Ship = Asteroids.Ship = function (options) {
    this.pos = options.pos;
    this.game = options.game;
    this.RADIUS = 5;
    this.COLOR = 'blue';
    this.vel = [0, 0];

    Asteroids.MovingObject.call(this, {
      color: this.COLOR,
      radius: this.RADIUS,
      vel: this.vel,
      pos: this.pos,
      game: this.game
    });
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
  };
})();
