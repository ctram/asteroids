(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Ship = Asteroids.Ship = function (options) {
    this.RADIUS = 5;
    this.COLOR = 'black';

    this.ctx = options.ctx;
    this.game = options.game;
    this.heading = 0;
    this.pos = options.pos;
    this.rotatingSpeed = 5;
    this.speed = 1;
    this.sprite = new Image();
    this.sprite.src = 'assets/images/ship_1.png';
    this.vel = [0, 0];

    // call super
    Asteroids.MovingObject.call(this, {
      color: this.COLOR,
      radius: this.RADIUS,
      vel: this.vel,
      pos: this.pos,
      game: this.game,
      ctx: this.ctx
    });
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.brake = function () {
    var currVelX = this.vel[0];
    var currVelY = this.vel[1];

    if (currVelX === 0 && currVelY === 0) {
      return;
    }

    reverseX = -1 * this.vel[0];
    reserveY = -1 * this.vel[1];

    this.vel[0] += reverseX;
    this.vel[1] += reserveY;
  };

  Ship.prototype.draw = function () {
    var offsetX = -25;
    var offsetY = -20;

    var x = this.pos[0];
    var y = this.pos[1];

    this.ctx.save();
    // move canvas to location of ship
    this.ctx.translate(x, y);
    // var rotationAngle = Math.PI/180 * angleDiffMouse;
    var rotationAngle = Math.PI/180 * this.heading;

    // rotate canvas
    this.ctx.rotate(rotationAngle);

    // move canvas back to original position
    this.ctx.translate(-x, -y);

    // draw ship
    this.ctx.drawImage(this.sprite, x + offsetX, y + offsetY);

    // revert rotation of canvas
    this.ctx.restore();
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      game: this.game,
      shipHeading: this.heading
    });
    this.game.bullets.push(bullet);
  };

  Ship.prototype.left = function () {
    this.heading -= this.rotatingSpeed;
    if (this.heading < 0) {
      this.heading = 360 + this.heading;
    }
  };

  Ship.prototype.power = function (direction) {
    // velocity * direction (direction flips the sign of velocity depending on if the ship is going forward or backward)
    // find the unit vector based on the current heading
    var radian;
    var degrees = this.heading;
    var degToRad = Asteroids.Util.degToRad;
    var deltaX;
    var deltaY;

    if (degrees >= 0 && degrees <= 90) {
      radian = degToRad(degrees);
      deltaX = this.speed * Math.sin(radian);
      deltaY = -1 * (this.speed * Math.cos(radian));
    } else if (degrees > 90 && degrees <= 180) {
      degrees -= 90;
      radian = degToRad(degrees);
      deltaX = this.speed * Math.cos(radian);
      deltaY = this.speed * Math.sin(radian);
    } else if (degrees > 180 && degrees <= 270) {
      degrees -= 180;
      radian = degToRad(degrees);
      deltaX = -1 * (this.speed * Math.sin(radian));
      deltaY =  this.speed * Math.cos(radian);
    } else if (degrees > 270 && degrees <= 360) {
      degrees -= 270;
      radian = degToRad(degrees);
      deltaX = -1 * (this.speed * Math.cos(radian));
      deltaY = -1 * (this.speed * Math.sin(radian));
    }

    if (direction === 'backward') {
      deltaX *= -1;
      deltaY *= -1;
    }

    // impX = impulse[0];
    // impY = impulse[1];

    this.vel[0] = deltaX;
    this.vel[1] = deltaY;

    setTimeout(function () {
      this.brake();
    }.bind(this), 500);
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
  };

  Ship.prototype.right = function () {
    this.heading += this.rotatingSpeed;
    this.heading = this.heading % 360;
  };

  // Ship.prototype.faceMouse = function () {
  //
  //   // Turns the ship to always face the mouse cursor
  //   var angleDiffMouse = this.game.angleDiffMouse(this.pos, this.game.mousePos);
  //   var deltaHeadingMouse = Math.abs(angleDiffMouse - this.heading);
  //
  //   if (deltaHeadingMouse >= 0) {
  //     // move heading clockwise
  //     this.heading += deltaHeadingMouse;
  //   } else {
  //     this.heading -= deltaHeadingMouse;
  //   }
  // };
})();
