AQUARIUM.menuScreen = (function() {
  var onePlayer = {
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
    AQUARIUM.input.setInputState();

    if (AQUARIUM.input.justClicked()) {
      AQUARIUM.input.isTextClicked(onePlayer);
      AQUARIUM.input.isTextClicked(twoPlayer);
    }
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

    // console.log(AQUARIUM.ctx.font);

    AQUARIUM.input.setTextDimensions(onePlayer, AQUARIUM.ctx);
    AQUARIUM.input.centerText(onePlayer);
    AQUARIUM.ctx.fillText(onePlayer.text, onePlayer.x, onePlayer.y);

    AQUARIUM.input.setTextDimensions(twoPlayer, AQUARIUM.ctx);
    AQUARIUM.input.centerText(twoPlayer);
    AQUARIUM.ctx.fillText(twoPlayer.text, twoPlayer.x, twoPlayer.y);

    AQUARIUM.ctx.restore();
  }

  return {
    init: init,
    update: update,
    render: render
  };
}());
