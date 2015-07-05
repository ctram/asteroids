(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var GameView = window.Asteroids.GameView = function (options) {
    this.canvasEl = options.canvasEl;

    options = {
      DIM_X: options.DIM_X,
      DIM_Y: options.DIM_Y,
      ctx: options.ctx
    };

    this.canvasEl.addEventListener('mousemove', function(evt) {
      var mousePos = this.getMousePos(this.canvasEl, evt);
      var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
      this.writeMessage(this.canvasEl, message);
    }.bind(this), false);

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

  GameView.prototype.getMousePos = function (canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  };



  GameView.prototype.start = function () {
    setInterval(function () {
      this.game.step();
      this.game.draw();
    }.bind(this), 100);
  };

  GameView.prototype.writeMessage = function (canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
  };

})();
