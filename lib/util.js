(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Util = Asteroids.Util = {};

  Util.arcTanDegrees = function (opposite, adjacent) {
    return Math.atan(opposite/adjacent) * 180 / Math.PI;
  };

  Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Util.randomEdgeLength = function (maxLength) {
    var edgeLength = maxLength * Math.random();
    if (Math.random() > 0.5) {
      edgeLength *= -1;
    }
    return edgeLength;
  };

  Util.randomVel = function (length) {
    randomX = length * Math.random();
    randomY = Math.sqrt((length * length) - (randomX * randomX));
    if (Math.random() < 0.5) {
      randomX *= -1;
    }
    if (Math.random() < 0.5) {
      randomY *= -1;
    }
    return [randomX, randomY];
  };

})();
