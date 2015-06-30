(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Bullet = Asteroids.Bullet = function (options) {
    // this.pos = options.pos;
    // this.vel = [20, 20];
    // this.radius = 5;
    this.color = 'red';
    this.game = options.game;

    var vel;
    switch (options.direction) {
      case 'up':
        vel = [0, -20];
        break;
      case 'down':
        vel = [0, 20];
        break;
      case 'left':
        vel = [-20, 0];
        break;
      case 'right':
        vel = [20, 0];
      break;
    }

    //
    // var x = options.vel[0];
    // var y = options.vel[1];
    // var speed = Math.sqrt(x * x + y * y);

    // while (speed < 20) {
    //   x += 0.0001;
    //   y += 0.0001;
    //   speed = Math.sqrt(x * x + y * y);
    // }

    Asteroids.MovingObject.call(this, {
      pos: options.pos,
      vel: vel,
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
