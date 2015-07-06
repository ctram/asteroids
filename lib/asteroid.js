(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Asteroid = Asteroids.Asteroid = function (options) {
    this.radius = Math.random() * 40;
    this.pos = options.pos;
    this.speed = Math.random() * 2;
    this.game = options.game;
    this.numSides = 4;
    this.ctx = options.ctx;
    this.cornerCoords = [];



    Asteroids.MovingObject.call(this, {
      radius: this.radius,
      vel: Asteroids.Util.randomVel(this.speed),
      pos: this.pos,
      game: this.game
    });
  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      // NOTE: turned off ship relocating for now
      // otherObject.relocate();
    }
  };

  Asteroid.prototype.draw = function (ctx) {
    // var path=new Path2D();

    // path.arc(75,75,50,0,Math.PI*2,true); // Outer circle
    // path.moveTo(110,75);
    // path.arc(75,75,35,0,Math.PI,false);  // Mouth (clockwise)
    // path.moveTo(65,65);
    // path.arc(60,65,5,0,Math.PI*2,true);  // Left eye
    // path.moveTo(95,65);
    // path.arc(90,65,5,0,Math.PI*2,true);  // Right eye
    // ctx.stroke(path);
    // this.pos[0] += 3;
    // this.pos[1] += 3;

    var x = this.pos[0];
    var y = this.pos[1];

    x -= this.radius;
    y -= this.radius; // move to the center of the object, then away from the center a distance of its radius

    var radius = this.radius;
    this.cornerCoords = [
      {x: x, y: y},
      {x: x, y: y + radius},
      {x: x + radius, y: y + radius},
      {x: x + radius, y: y}
    ];

    ctx.beginPath();
    ctx.moveTo(this.cornerCoords[0].x, this.cornerCoords[0].y);

    for (var i = 1; i < this.cornerCoords.length; i++) {
      x = this.cornerCoords[i].x;
      y = this.cornerCoords[i].y;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  };

})();
