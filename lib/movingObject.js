(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;



  };


  Asteroids.MovingObject.prototype.draw = function (ctx) {
    ctx.arc_something(
      this.pos,
      this.radius,
      this.color
    );
  };


  Asteroids.MovingObject.prototype.move = function (vel) {
    posX = this.pos[0];
    posY = this.pos[1];

    velX = vel[0];
    velY = vel[1];

    posX += velX;
    posY += velY;

    this.pos[0] = posX;
    this.pos[1] = posY;
  };

})();
