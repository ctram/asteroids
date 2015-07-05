(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var GameView = window.Asteroids.GameView = function (options) {
    this.canvasEl = options.canvasEl;

    options = {
      DIM_X: options.DIM_X,
      DIM_Y: options.DIM_Y,
      ctx: options.ctx,
      canvasEl: this.canvasEl
    };


    this.game = new Asteroids.Game(options);

    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var impulse;

    key('w', function(){
      impulse = [0, -1];
      this.game.ship.power(impulse);
      return false;
    }.bind(this));
    key('s', function(){
      impulse = [0, 1];
      this.game.ship.power(impulse);
      return false;
    }.bind(this));
    key('a', function(){

      impulse = [-1, 0];
      this.game.ship.power(impulse);
      return false;
    }.bind(this));
    key('d', function(){
      impulse = [1, 0];

      // FIXME: d is not working
      this.game.ship.power(impulse);
      return false;
    }.bind(this));

    var direction;
    key('up', function(){
      direction = 'up';
      this.game.ship.fireBullet(direction);
      return false;
    }.bind(this));
    key('down', function(){
      direction = 'down';
      this.game.ship.fireBullet(direction);
      return false;
    }.bind(this));
    key('left', function(){
      direction = 'left';
      this.game.ship.fireBullet(direction);
      return false;
    }.bind(this));
    key('right', function(){
      direction = 'right';
      this.game.ship.fireBullet(direction);
      return false;
    }.bind(this));

    // Listen for mouse click - fire bullets.
    document.getElementsByTagName("canvas")[0].addEventListener("click", function () {

      // var angleDiffMouse = this.game.angleDiffMouse(this.game.ship.pos,)
      // direction = 'up';
      this.game.ship.fireBullet();
    }.bind(this));
  };

  GameView.prototype.start = function () {
    setInterval(function () {
      this.game.step();
      this.game.draw();
    }.bind(this), 100);
  };



})();
