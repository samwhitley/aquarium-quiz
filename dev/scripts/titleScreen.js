AQUARIUM.titleScreen = (function() {
  var titleImage,
      showStart = true,
      interval;

  /**
    @method init
  */

  function init() {
    titleImage = new Image();
    titleImage.src = "images/fyush.png";

    interval = setInterval(flashText, 500);
  }

  /**
    @method update
  */

  function update(dt) {
    AQUARIUM.input.setInputState();

    if (AQUARIUM.input.justClicked()) {
      AQUARIUM.main.changeScreen("menu");
    }
  }

  function flashText() {
    showStart = !showStart;
  }

  /**
    @method render
  */

  function render() {

    AQUARIUM.ctx.save();

    // Render background
    AQUARIUM.ctx.fillStyle = "#001758";
    AQUARIUM.ctx.fillRect(0, 0, AQUARIUM.width, AQUARIUM.height);

    // Render title
    AQUARIUM.ctx.fillStyle = "#FFFFFF";
    AQUARIUM.ctx.textAlign = "center";

    // Draw image
    AQUARIUM.ctx.drawImage(titleImage, 50, 75);

    AQUARIUM.ctx.font = "3em sans-serif";
    AQUARIUM.ctx.fillText("Aquarium Quiz", (AQUARIUM.width / 2), 285);

    if (showStart) {
      AQUARIUM.ctx.font = "1.5em sans-serif";
      AQUARIUM.ctx.fillText("Click to play", (AQUARIUM.width / 2), 335);
    }

    AQUARIUM.ctx.restore();
  }

  return {
    init: init,
    update: update,
    render: render
  };
}());