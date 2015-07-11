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
    var power = 0.6;
// TODO: >>>>>>>>>>>>>
    key('up', function(){
      direction = 'forward';
      this.game.ship.power(direction);
      return false;
    }.bind(this));
    key('down', function(){
      direction = 'backward';
      this.game.ship.power(direction);
      return false;
    }.bind(this));
    key('left', function(){
      this.game.ship.left();
      return false;
    }.bind(this));
    key('right', function(){
      this.game.ship.right();
      return false;
    }.bind(this));

    key('space', function () {
      this.game.ship.fireBullet();
    }.bind(this));
  };


  GameView.prototype.start = function () {
    debugger
    // while (!this.game.isWin()) {
      var gamePlay = setInterval(function () {
        // this.checkThrottle();
        this.game.step();
        this.game.draw();
      }.bind(this), 10);
    // }

    // clearInterval(gamePlay);
  };
})();
