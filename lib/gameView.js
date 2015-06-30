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
    var impulse;
// // returning false stops the event and prevents default browser events
// key('ctrl+r', function(){ alert('stopped reload!'); return false });
//
// // multiple shortcuts that do the same thing
// key('⌘+r, ctrl+r', function(){ });
//


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
