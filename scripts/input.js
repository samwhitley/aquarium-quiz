AQUARIUM.input = (function() {
  var isButtonDown,
      wasButtonDown,
      justClicked;

  /**
    @method connectEvents
  */

  function connectEvents() {
    console.log("main: connectEvents");

    var mouse = (function (target) {
      var isButtonDown = false,
          x = 0,
          y = 0;

      target.addEventListener('mousedown', function (ev) {
        isButtonDown = true;
        x = ev.clientX - target.offsetLeft;
        y = ev.clientY - target.offsetTop;
      });

      target.addEventListener('mouseup', function (ev) {
        isButtonDown = false;
        x = ev.clientX - target.offsetLeft;
        y = ev.clientY - target.offsetTop;
      });

      return {
        isButtonDown: function() { return isButtonDown; },
        x: function() { return x; },
        y: function() { return y; }
      };
    }(AQUARIUM.canvas));

    window.mouse = mouse;
  }

  function setInputState() {
    isButtonDown = mouse.isButtonDown();
    justClicked = !isButtonDown && wasButtonDown;
    wasButtonDown = isButtonDown;
  }

  function justClicked() {
    return justClicked;
  }

  function setTextDimensions(textObj) {
    textObj.width = AQUARIUM.ctx.measureText(textObj.text).width;
    textObj.height = parseInt(AQUARIUM.ctx.font);

    textObj.x = (AQUARIUM.width - textObj.width) / 2;
  }

  function isTextClicked(textObj) {
    // console.log("isTextClicked()");
    // console.log(textObj);

    var textClicked = false,
        mouseX = mouse.x(),
        mouseY = mouse.y();

    // console.log("x: " + mouseX);
    // console.log("y: " + mouseY);

    if (mouseX >= textObj.x && mouseX <= textObj.x + textObj.width && mouseY >= textObj.y - textObj.height && mouseY <= textObj.y) {
      console.log("isTextClicked: you clicked: " + textObj.text);
      textObj.action();
    }

    return textClicked;
  }

  return {
    connectEvents: connectEvents,
    setInputState: setInputState,
    justClicked: justClicked,
    setTextDimensions: setTextDimensions,
    isTextClicked: isTextClicked
  };
}());