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
  };

  GameView.prototype.start = function () {
    setInterval(function () {
      this.game.moveObjects();
      this.game.draw();
    }.bind(this), 20);
  };

})();
