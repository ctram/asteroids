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
    this.numCorners = Math.random() * 100;
    this.ctx = options.ctx;
    this.edgeCoords = [];

    if (this.numCorners < 6) {
      this.numCorners = 6;
    }

    var x = this.pos[0];
    var y = this.pos[1];
    var numCorners = this.numCorners;

    var ctx = this.ctx;


    y -= this.radius; // move to the center of the object, then away from the center a distance of its radius

    this.edgeCoords = [x, y];

    for (var i = 1; i < numCorners; i++) {
      x += Asteroids.Util.randomEdgeLength(this.radius);
      y += Asteroids.Util.randomEdgeLength(this.radius);
      this.edgeCoords.push([x, y]);
    }

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
    var x = this.edgeCoords[0][0];
    var y = this.edgeCoords[0][1];

    ctx.beginPath();
    ctx.moveTo(x, y);
    // start at index 0 because the first coord is used to bring the pen to the asteroid.
    for (var i = 1; i < this.edgeCoords.length; i++) {
      x = this.edgeCoords[i][0];
      y = this.edgeCoords[i][1];

      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  };

})();
