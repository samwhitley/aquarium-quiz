AQUARIUM.titleScreen = (function() {
  var input = {
    "isButtonDown": false,
    "wasButtonDown": false,
    "justClicked": false
  };

  /**
    @method update
  */

  function update(dt) {
    // console.log();
    input.isButtonDown = mouse.isButtonDown();
    input.justClicked = !input.isButtonDown && input.wasButtonDown;

    if (input.justClicked) {
      AQUARIUM.main.changeScreen("menu");
    }

    input.wasButtonDown = input.isButtonDown;
  }

  /**
    @method render
  */

  function render() {

    AQUARIUM.ctx.save();

    // Render background
    AQUARIUM.ctx.fillStyle = "#2738FF";
    AQUARIUM.ctx.fillRect(0, 0, AQUARIUM.width, AQUARIUM.height);

    // Render title
    AQUARIUM.ctx.fillStyle = "#FFFFFF";
    AQUARIUM.ctx.textAlign = "center";

    AQUARIUM.ctx.font = "3em sans-serif";
    AQUARIUM.ctx.fillText("Puzzle Aquarium", (AQUARIUM.width / 2), ((AQUARIUM.height / 2) - 40));

    AQUARIUM.ctx.font = "1.5em sans-serif";
    AQUARIUM.ctx.fillText("Click to play", (AQUARIUM.width / 2), ((AQUARIUM.height / 2) + 40));

    AQUARIUM.ctx.restore();
  }

  return {
    update: update,
    render: render
  };
}());
