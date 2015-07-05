(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Ship = Asteroids.Ship = function (options) {
    this.pos = options.pos;
    this.game = options.game;
    this.ctx = options.ctx;
    this.RADIUS = 5;
    this.COLOR = 'black';
    this.vel = [0, 0];
    this.sprite = new Image();
    this.sprite.src = 'assets/images/ship_1.png';

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

  Ship.prototype.draw = function () {
    // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    var x = this.pos[0];
    var y = this.pos[1];
    var angleDiffMouse = this.game.angleDiffMouse(this.pos, this.game.mousePos);

    this.ctx.save();
    // move canvas to location of ship
    this.ctx.translate(x, y);
    
    this.ctx.rotate(Math.PI/180 * angleDiffMouse);
    this.ctx.translate(-x, -y);
    this.ctx.drawImage(this.sprite, x, y);
    this.ctx.restore();

    // Code for when ship was a dot. ///////////////////////////////////////
    // ctx.beginPath();
    // ctx.arc(
    //   x,
    //   y,
    //   this.radius,
    //   0,
    //   Math.PI * 2
    // );
    //
    // if (this.color) {
    //   ctx.fillStyle = this.color;
    //   ctx.fill();
    // } else {
    //   ctx.stroke();
    // }
    //////////////////////////////////////////////////////////////////////////
  };

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
