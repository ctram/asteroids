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
    // this.canvasEl = options.canvasEl;

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
    var offsetX = -25;
    var offsetY = -20;

    var x = this.pos[0];
    var y = this.pos[1];
    var angleDiffMouse = this.game.angleDiffMouse(this.pos, this.game.mousePos);

    this.ctx.save();
    // move canvas to location of ship
    this.ctx.translate(x, y);

    this.ctx.rotate(Math.PI/180 * angleDiffMouse);
    this.ctx.translate(-x, -y);
    this.ctx.drawImage(this.sprite, x + offsetX, y + offsetY);
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

  Ship.prototype.fireBullet = function () {
    var mousePos = this.game.mousePos;
    var angleDiffMouse = this.game.angleDiffMouse(this.pos, mousePos);
    var speed = 25;
    var a = speed * speed - Math.pow(Math.tan(angleDiffMouse), 2);
    var y = Math.sqrt(a / 2);
    var x = Math.tan(angleDiffMouse) * y;
    var vel = [x, y];



    // FIXME: bullets always fire in one direction - add a "head" for the ship, where it faces.
    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      game: this.game,
      // direction: direction
      vel: vel
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
