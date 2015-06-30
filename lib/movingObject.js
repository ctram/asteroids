(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.text = 'sadsd';
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };


  MovingObject.prototype.draw = function (ctx) {
    // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

    var x = this.pos[0];
    var y = this.pos[1];

    ctx.beginPath();
    ctx.arc(
      x,
      y,
      this.radius,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  };

  MovingObject.prototype.isCollidedWith = function (otherObj) {
    var distX = otherObj[0] - otherObj[0];
    var distY = otherObj[1] - otherObj[1];

    var dist = Math.sqrt(distX * distX + distY * distY);

    if (dist < (this.radius + otherObj.radius)) {
      return true;
    } else {
      return false;
    }
  };

  MovingObject.prototype.move = function () {

    posX = this.pos[0];
    posY = this.pos[1];

    velX = this.vel[0];
    velY = this.vel[1];

    posX += velX;
    posY += velY;

    this.pos = this.game.wrap([posX, posY]);
  };

})();
