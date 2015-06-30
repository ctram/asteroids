(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Util = Asteroids.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Util.randomVel = function (length) {
    randomX = length * Math.random();
    randomY = Math.sqrt((length * length) - (randomX * randomX));
    return [randomX, randomY];
  };

})();
