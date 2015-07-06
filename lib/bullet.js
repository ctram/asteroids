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
    this.heading = options.heading;
    this.speed = 3;
    // this.direction = options.direction;
    //
    // var x = this.direction.x;
    // var y = this.direction.y;

    // this.vel = options.vel;

    // var vel;
    // switch (options.direction) {
    //   case 'up':
    //     vel = [0, -20];
    //     break;
    //   case 'down':
    //     vel = [0, 20];
    //     break;
    //   case 'left':
    //     vel = [-20, 0];
    //     break;
    //   case 'right':
    //     vel = [20, 0];
    //   break;
    // }

    //
    // var x = options.vel[0];
    // var y = options.vel[1];
    // var speed = Math.sqrt(x * x + y * y);

    // while (speed < 20) {
    //   x += 0.0001;
    //   y += 0.0001;
    //   speed = Math.sqrt(x * x + y * y);
    // }

    this.vel = this.findVelocity(this.heading);

    Asteroids.MovingObject.call(this, {
      pos: options.pos,
      vel: this.vel,
      radius: 5,
      color: 'orange',
      game: this.game
    });
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.findVelocity = function (heading) {
    // align bullet's heading with ship's heading. Account for the fact that the ship's heading at 0 degrees is pointing towards the negative Y direction.
    var x;
    var y;
    var a;
    var adjHeading;
    if (heading > 0 && heading <= 90) {
      adjHeading = heading;
      a = (Math.pow(Math.tan(adjHeading), 2) + this.speed * this.speed);
      x = Math.sqrt(a / 2);
      y = -x / Math.tan(adjHeading);
    } else if (heading > 90 && heading <= 270) {

    }
  },

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

  Bullet.prototype.solveX = function (fnY) {

  }
})();
