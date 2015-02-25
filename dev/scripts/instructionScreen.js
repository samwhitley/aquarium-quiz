AQUARIUM.instructionScreen = (function() {
  var specs = AQUARIUM.fishScreen.getFishSpecs(),
      spriteSrc = "images/sprites-left.png",
      fish = [
        {
          pos: [110, 120]
        },
        {
          pos: [110, 230]
        },
        {
          pos: [110, 340]
        },
        {
          pos: [245, 140]
        },
        {
          pos: [245, 250]
        },
        {
          pos: [245, 360]
        },
        {
          pos: [380, 150]
        },
        {
          pos: [380, 260]
        },
        {
          pos: [380, 370]
        }
      ],
      showText = true,
      interval;

  /**
    @method init
  */

  function init() {
    fish[0].sprite = new Sprite(spriteSrc, specs[2].colors[0].pos, specs[2].size); // large green
    fish[1].sprite = new Sprite(spriteSrc, specs[2].colors[1].pos, specs[2].size); // large red
    fish[2].sprite = new Sprite(spriteSrc, specs[2].colors[2].pos, specs[2].size); // large gold
    fish[3].sprite = new Sprite(spriteSrc, specs[1].colors[0].pos, specs[1].size); // med green
    fish[4].sprite = new Sprite(spriteSrc, specs[1].colors[1].pos, specs[1].size); // med red
    fish[5].sprite = new Sprite(spriteSrc, specs[1].colors[2].pos, specs[1].size); // med gold
    fish[6].sprite = new Sprite(spriteSrc, specs[0].colors[0].pos, specs[0].size); // small green
    fish[7].sprite = new Sprite(spriteSrc, specs[0].colors[1].pos, specs[0].size); // small red
    fish[8].sprite = new Sprite(spriteSrc, specs[0].colors[2].pos, specs[0].size); // small gold

    interval = setInterval(flashText, 500);
  }

  /**
    @method update
  */

  function update(dt) {
    AQUARIUM.input.setInputState();

    if (AQUARIUM.input.justClicked()) {
      AQUARIUM.main.changeScreen("fish");
    }
  }

  /**
    @method render
  */

  function render() {
    AQUARIUM.ctx.save();

    AQUARIUM.ctx.fillStyle = "#001758";
    AQUARIUM.ctx.fillRect(0, 0, AQUARIUM.width, AQUARIUM.height);

    AQUARIUM.ctx.fillStyle = "#FFFFFF";
    AQUARIUM.ctx.font = "24px sans-serif";
    AQUARIUM.ctx.fillText("Pay attention to the fish on the next screen...", 10, 30);

    if (showText) {
      AQUARIUM.ctx.fillText("Click to start", 10, 480);
    }

    AQUARIUM.ctx.font = "18px sans-serif";

    AQUARIUM.ctx.fillText("Large", 140, 90);
    AQUARIUM.ctx.fillText("Medium", 260, 90);
    AQUARIUM.ctx.fillText("Small", 390, 90);

    AQUARIUM.ctx.fillText("Green", 30, 170);
    AQUARIUM.ctx.fillText("Red", 30, 280);
    AQUARIUM.ctx.fillText("Gold", 30, 390);

    for(var i = 0, len = fish.length; i < len; i++) {
      entity = fish[i];
      AQUARIUM.ctx.save();
      AQUARIUM.ctx.translate(entity.pos[0], entity.pos[1]);
      entity.sprite.render(AQUARIUM.ctx);
      AQUARIUM.ctx.restore();
    }

    AQUARIUM.ctx.restore();
  }

  function flashText() {
    showText = !showText;
  }

  return {
    init: init,
    update: update,
    render: render
  };
}());