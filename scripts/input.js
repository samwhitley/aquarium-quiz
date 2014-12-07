(function() {

  var mouse = (function (target) {
    var isButtonDown = false;

    target.addEventListener('mousedown', function () {
      isButtonDown = true;
    });

    target.addEventListener('mouseup', function () {
      isButtonDown = false;
    });

    return {
      isButtonDown: function () {
        return isButtonDown;
      }
    };
  }(document));

  window.mouse = mouse;

}());