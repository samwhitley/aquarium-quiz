var AQUARIUM = {};

AQUARIUM.main = (function() {

  var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000 / 60);
    },
    currentScreen,
    transitioning = false;

  /**
    @method init - initial setup for the game
  */

  function init() {
    console.log("main: init()");

    AQUARIUM.width = 500;
    AQUARIUM.height = 500;

    AQUARIUM.canvas = document.createElement("canvas");
    AQUARIUM.ctx = AQUARIUM.canvas.getContext("2d");
    AQUARIUM.canvas.width = AQUARIUM.width;
    AQUARIUM.canvas.height = AQUARIUM.height;

    document.body.appendChild(AQUARIUM.canvas);

    AQUARIUM.input.connectEvents();

    resources.load(["images/sprites-left.png", "images/sprites-right.png"]);
    resources.onReady(function() {
      changeScreen("title");
      beginLoop();
    });
  }

  /**
    @method beginLoop
  */

  function beginLoop() {
    var lastFrame = Date.now();

    function loop() {
      var thisFrame = Date.now(),
        elapsed = (thisFrame - lastFrame) / 1000.0;

      requestAnimFrame(loop);

      AQUARIUM.ctx.clearRect(0, 0, AQUARIUM.width, AQUARIUM.height);

      currentScreen.update(elapsed);
      currentScreen.render();

      lastFrame = thisFrame;
    }

    loop();
  }

  /**
    @method changeScreen

    @param {String} screenName - name of the screen to change to
  */

  function changeScreen(screenName) {
    if (!transitioning) {
      transitioning = true;
      switch (screenName) {
        case "title":
          currentScreen = AQUARIUM.titleScreen;
          break;
        case "menu":
          AQUARIUM.menuScreen.init();
          currentScreen = AQUARIUM.menuScreen;
          break;
        case "fish":
          AQUARIUM.fishScreen.init();
          currentScreen = AQUARIUM.fishScreen;
          break;
        case "question":
          AQUARIUM.questionScreen.init();
          currentScreen = AQUARIUM.questionScreen;
          break;
        case "result":
          currentScreen = AQUARIUM.resultScreen;
          break;
      }
      transitioning = false;
    }
  }

  return {
    init: init,
    changeScreen: changeScreen
  }
}());