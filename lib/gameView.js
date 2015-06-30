(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var GameView = window.Asteroids.GameView = function (options) {
    options = {
      DIM_X: options.DIM_X,
      DIM_Y: options.DIM_Y,
      ctx: options.ctx
    };
    this.game = new Asteroids.Game(options);
    this.bindKeyHandlers();
  };

  // TODO: write key handles using keymaster library
  GameView.prototype.bindKeyHandlers = function () {
    key('a', function(){
     alert('you pressed a!') ;
   });
    // bind keys for:
    // fire bullet
    // directions
  };

  GameView.prototype.start = function () {
    setInterval(function () {
      this.game.step();
      this.game.draw();
    }.bind(this), 100);
  };

})();
