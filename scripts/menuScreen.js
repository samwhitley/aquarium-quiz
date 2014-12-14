AQUARIUM.menuScreen = (function() {

  var input = {
        "isButtonDown": false,
        "wasButtonDown": false,
        "justClicked": false
      },
      onePlayer = {
        text: "Start one player game",
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        action: function() { AQUARIUM.main.changeScreen("fish"); }
      },
      twoPlayer = {
        text: "Start two player game",
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        action: function() { AQUARIUM.main.changeScreen("fish"); }
      };

  /**
    @method init
  */

  function init() {
    onePlayer.y = (AQUARIUM.height / 2) - 30;

    twoPlayer.y = (AQUARIUM.height / 2) + 30;
  }

  /**
    @method update
  */

  function update(dt) {
    input.isButtonDown = mouse.isButtonDown();
    input.justClicked = !input.isButtonDown && input.wasButtonDown;

    if (input.justClicked) {
      isTextClicked(onePlayer);
      isTextClicked(twoPlayer);
    }

    input.wasButtonDown = input.isButtonDown;
  }

  /**
    @method render
  */

  function render() {
    AQUARIUM.ctx.save();

    AQUARIUM.ctx.fillStyle = "#27662A";
    AQUARIUM.ctx.fillRect(0, 0, AQUARIUM.width, AQUARIUM.height);

    AQUARIUM.ctx.fillStyle = "#FFFFFF";
    AQUARIUM.ctx.font = "24pt sans-serif";

    setTextDimensions(onePlayer);
    AQUARIUM.ctx.fillText(onePlayer.text, onePlayer.x, onePlayer.y);

    setTextDimensions(twoPlayer);
    AQUARIUM.ctx.fillText(twoPlayer.text, twoPlayer.x, twoPlayer.y);

    AQUARIUM.ctx.restore();
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
    init: init,
    update: update,
    render: render
  };
}());
