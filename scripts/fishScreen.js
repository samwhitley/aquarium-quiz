AQUARIUM.fishScreen = (function() {
  var fish = [], // all fish objects
      fishCount = 30 + (Math.floor(Math.random() * 30) + 1), // total number of fish - from 31 to 60
      fishSpecs = [ // specs for new fish objects
        {
          type: "small",
          size: [57, 26],
          speed: 100,
          colors: [
            {
              name: "green",
              pos: [90, 0]
            },
            {
              name: "red",
              pos: [90, 27]
            },
            {
              name: "orange",
              pos: [90, 55]
            }
          ]
        },
        {
          type: "medium",
          size: [88, 44],
          speed: 75,
          colors: [
            {
              name: "green",
              pos: [0, 0]
            },
            {
              name: "red",
              pos: [0, 45]
            },
            {
              name: "orange",
              pos: [0, 90]
            }
          ]
        },
        {
          type: "large",
          size: [97, 101],
          speed: 50,
          colors: [
            {
              name: "green",
              pos: [150, 0]
            },
            {
              name: "red",
              pos: [150, 102]
            },
            {
              name: "orange",
              pos: [150, 204]
            }
          ]
        }
      ],
      totals = {},
      countdownMax = 3,
      remainingSeconds = 0, // Seconds left to view the fish screen
      countdownTimer; // target for the countdown timeout

  /**
    @method init
  */

  function init() {
    console.log("fishScreen: init");

    countdownTimer = setInterval(countdown, 1000);

    totals = {
      fish: 0,
      red: 0,
      green: 0,
      orange: 0,
      small: {
        total: 0,
        red: 0,
        green: 0,
        orange: 0
      },
      medium: {
        total: 0,
        red: 0,
        green: 0,
        orange: 0
      },
      large: {
        total: 0,
        red: 0,
        green: 0,
        orange: 0
      }
    };

    reset();
  }

  /**
    @method update - updates information about game objects like position
  */

  function update(dt) {
    // console.log("fishScreen: update");

    var xPos,
        yPos,
        dx,
        dy,
        width,
        height;

    for (var i = 0, len = fish.length; i < len; i++) {
      xPos = fish[i].pos[0];
      yPos = fish[i].pos[1];
      dx = fish[i].dx;
      dy = fish[i].dy;
      width = fish[i].size[0];
      height = fish[i].size[1];

      if (xPos + width + (dx * dt) > AQUARIUM.width || xPos + (dx * dt) < 0) {
        fish[i].dx = -dx;

        if (fish[i].dx > 0) { // Moving right
          fish[i].sprite = fish[i].rightSprite;
        } else { // Moving left
          fish[i].sprite = fish[i].leftSprite;
        }
      }

      if (yPos + height + (dy * dt) > AQUARIUM.height || yPos + (dy * dt) < 0) {
        fish[i].dy = -dy;
      }

      fish[i].pos[0] += (fish[i].dx * dt);
      fish[i].pos[1] += (fish[i].dy * dt);
    }
  }

  /**
    @method render - clears the screen and draws all game objects
  */

  function render() {
    var entity;

    AQUARIUM.ctx.fillStyle = "#000000";
    AQUARIUM.ctx.fillRect(0, 0, AQUARIUM.width, AQUARIUM.height);

    for(var i = 0, len = fish.length; i < len; i++) {
      entity = fish[i];
      AQUARIUM.ctx.save();
      AQUARIUM.ctx.translate(entity.pos[0], entity.pos[1]);
      entity.sprite.render(AQUARIUM.ctx);
      AQUARIUM.ctx.restore();
    }

    AQUARIUM.ctx.fillStyle = "#FFFFFF";
    AQUARIUM.ctx.font = "24pt sans-serif";
    AQUARIUM.ctx.fillText(remainingSeconds, 50, 50);
  }

  function countdown() {
    remainingSeconds -= 1;

    if (remainingSeconds === 0) {
      clearInterval(countdownTimer);

      AQUARIUM.main.changeScreen("question");
    }
  }

  /**
    @method newFish - creates a new random fish

    @return {Object} newFish - fish object with random starting position, type, and color
  */

  function newFish() {
    var typeIndex = AQUARIUM.utils.randomIndex(fishSpecs),
        currChoice = fishSpecs[typeIndex],
        colorIndex = AQUARIUM.utils.randomIndex(currChoice.colors),
        currColor = currChoice.colors[colorIndex],
        newFish = {},
        startX = Math.floor(Math.random() * AQUARIUM.width + 1),
        startY = Math.floor(Math.random() * AQUARIUM.height + 1);

    // Add the attributes of this fish to the totals object
    totals["fish"] += 1;
    totals[currColor.name] += 1;
    totals[currChoice.type]["total"] += 1;
    totals[currChoice.type][currColor.name] += 1;

    // If the object's width extends offscreen, move it left so it fits
    if (startX + currChoice.size[0] > AQUARIUM.width) {
      startX -= currChoice.size[0];
    }

    // If the object's height extends offscreen, move it up so it fits
    if (startY + currChoice.size[1] > AQUARIUM.height) {
      startY -= currChoice.size[1];
    }

    newFish.pos = [startX, startY];
    newFish.type = currChoice.type;
    newFish.size = currChoice.size;
    newFish.color = currColor.name;
    newFish.leftSprite = new Sprite("images/sprites-left.png", currColor.pos, currChoice.size);
    newFish.rightSprite = new Sprite("images/sprites-right.png", currColor.pos, currChoice.size);

    newFish.dx = currChoice.speed;
    newFish.sprite = newFish.rightSprite;

    if (Math.random() < 0.5) {
      newFish.dx = currChoice.speed + (Math.floor(Math.random() * 20));
      newFish.sprite = newFish.rightSprite;
    }
    else {
      newFish.dx = -currChoice.speed - Math.floor((Math.random() * 20));
      newFish.sprite = newFish.leftSprite;
    }

    if (Math.random() < 0.5) {
      newFish.dy = Math.floor(currChoice.speed / 2) + (Math.random() * 30);
    }
    else {
      newFish.dy = Math.floor(-currChoice.speed / 2) - (Math.random() * 30);
    }

    return newFish;
  }

  /**
    @method getTotals - getter for the totals object

    @return {Object} totals
  */

  function getTotals() {
    return totals;
  }

  /**
    @method reset
  */

  function reset() {
    console.log("fishScreen: reset");

    remainingSeconds = countdownMax;

    fish = [];

    for (var i = 0; i < fishCount; i++) {
      fish.push(newFish());
    }
  }

  return {
    init: init,
    update: update,
    render: render,
    reset: reset,
    getTotals: getTotals
  };
}());
