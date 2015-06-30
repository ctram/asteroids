(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Bullet = Asteroids.Bullet = function () {
    // this.pos = options.pos;
    // this.vel = [20, 20];
    // this.radius = 5;
    // this.color = 'orange';
    // this.game = options.game;
    var x = options.vel[0];
    var y = options.vel[1];
    var speed = Math.sqrt(x * x + y * y);

    while (speed < 20) {
      x += 0.0001;
      y += 0.0001;
      speed = Math.sqrt(x * x + y * y);
    }

    Asteroids.MovingObject.call(this, {
      pos: options.pos,
      vel: [x, y],
      radius: 5,
      color: 'orange',
      game: this.game
    });
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObj) {
    if (otherObj instanceof Asteroids.Asteroid) {
      this.game.remove(otherObj);
      this.game.remove(this);
    }
  };

  Bullet.prototype.isWrappable = function () {
    // TODO: next: cleaning up objects
    return false;
  };
})();
