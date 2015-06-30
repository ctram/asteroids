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
    // ctx.stroke();
  };


  MovingObject.prototype.move = function () {
    posX = this.pos[0];
    posY = this.pos[1];

    velX = this.vel[0];
    velY = this.vel[1];

    posX += velX;
    posY += velY;

    this.pos[0] = posX;
    this.pos[1] = posY;
  };

})();
