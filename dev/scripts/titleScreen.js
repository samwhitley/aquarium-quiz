AQUARIUM.titleScreen = (function() {
  /**
    @method update
  */

  function update(dt) {
    AQUARIUM.input.setInputState();

    if (AQUARIUM.input.justClicked()) {
      AQUARIUM.main.changeScreen("menu");
    }
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