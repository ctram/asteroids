(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  Asteroids.Util = {};

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function (length) {
    randomX = length * Math.random();
    randomY = Math.sqrt((length * length) - (randomX * randomX));
  };

})();
