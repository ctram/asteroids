(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Util = Asteroids.Util = {};

  Util.arcTanDegrees = function (opposite, adjacent) {
    return Math.atan(opposite/adjacent) * 180 / Math.PI;
  };

  Util.degToRad = function (degrees) {
    return Math.PI * degrees / 180;
  };

  Util.headingToUnitVector = function (heading, speed) {

    var radian;
    var degrees = heading;
    var degToRad = Asteroids.Util.degToRad;
    var deltaX;
    var deltaY;

    if (degrees >= 0 && degrees <= 90) {
      radian = degToRad(degrees);
      deltaX = speed * Math.sin(radian);
      deltaY = -1 * (speed * Math.cos(radian));
    } else if (degrees > 90 && degrees <= 180) {
      degrees -= 90;
      radian = degToRad(degrees);
      deltaX = speed * Math.cos(radian);
      deltaY = speed * Math.sin(radian);
    } else if (degrees > 180 && degrees <= 270) {
      degrees -= 180;
      radian = degToRad(degrees);
      deltaX = -1 * (speed * Math.sin(radian));
      deltaY =  speed * Math.cos(radian);
    } else if (degrees > 270 && degrees <= 360) {
      degrees -= 270;
      radian = degToRad(degrees);
      deltaX = -1 * (speed * Math.cos(radian));
      deltaY = -1 * (speed * Math.sin(radian));
    }

    return {deltaX: deltaX, deltaY: deltaY};

  };

  Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Util.radToDeg = function (radians) {
    return 180 * radians / Math.PI;
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
