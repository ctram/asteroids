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

    // define short of 'a'
    key('a', function(){
      console.log('a was pressed');
     alert('you pressed a!');
    });

// // returning false stops the event and prevents default browser events
// key('ctrl+r', function(){ alert('stopped reload!'); return false });
//
// // multiple shortcuts that do the same thing
// key('⌘+r, ctrl+r', function(){ });
//


    key('up', function(){

      impulse = [0, -1];
      this.game.ship.power(impulse);
      return false;
    }.bind(this));
    key('down', function(){
      impulse = [0, 1];
      this.game.ship.power(impulse);
      return false;
    }.bind(this));
    key('left', function(){
      impulse = [-1, 0];
      this.game.ship.power(impulse);
      return false;
    }.bind(this));
    key('right', function(){
      impulse = [1, 0];
      this.game.ship.power(impulse);
      return false;
    }.bind(this));
    key('space', function(){
      this.game.ship.fireBullet();
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
