(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Ship = Asteroids.Ship = function (options) {
    this.pos = options.pos;
    this.game = options.game;
    this.RADIUS = 5;
    this.COLOR = 'black';
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

  Ship.prototype.fireBullet = function (direction) {
    // FIXME: bullets always fire in one direction - add a "head" for the ship, where it faces.
    // TODO: add images for ship
    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      game: this.game,
      direction: direction
    });
    this.game.bullets.push(bullet);
  };

  Ship.prototype.power = function (impulse) {
    impX = impulse[0];
    impY = impulse[1];

    // currX = Math.abs(this.vel[0]);
    // currY = Math.abs(this.vel[1]);
    //
    // maxX = 10;
    // maxY = 10;
    //
    //
    // if (currX > maxX ) {
    //   impX = 0;
    // }
    //
    // if (currY > maxY ) {
    //   impY = 0;
    // }

    this.vel[0] += impX;
    this.vel[1] += impY;
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
  };
})();
