AQUARIUM.questionScreen = (function() {
  var totals,
      question = {
        text: "",
        answer: 0
      },
      seeAnswer = {
        text: "See answer",
        x: 55,
        y: 425,
        width: 200,
        height: 50,
        action: seeAnswerAction
      },
      playAgain = {
        text: "Play again",
        x: 325,
        y: 425,
        width: 200,
        height: 50,
        action: playAgainAction
      },
      answer = {
        text: "",
        visible: false
      },
      prevQIndex; // holds the index of the last asked question

  /**
    @method init
  */

  function init() {
    totals = AQUARIUM.fishScreen.getTotals();
    question = newQuestion();
    answer.text = question.answer;
    answer.visible = false;
  }

  /**
    @method update
  */

  function update(dt) {
    var mouseX,
        mouseY;

    AQUARIUM.input.setInputState();

    if (AQUARIUM.input.justClicked()) {
      mouseX = mouse.x();
      mouseY = mouse.y();

      if (mouseX >= 20 && mouseX <= (20 + seeAnswer.width) && mouseY >= 390 && mouseY <= 390 + seeAnswer.height) {
        seeAnswer.action();
      }

      if (mouseX >= 280 && mouseX <= (280 + playAgain.width) && mouseY >= 390 && mouseY <= 390 + playAgain.height) {
        playAgain.action();
      }
    }
  }

  /**
    @method render
  */

  function render() {
    AQUARIUM.ctx.save();

    AQUARIUM.ctx.fillStyle = "#001758";
    AQUARIUM.ctx.fillRect(0, 0, AQUARIUM.width, AQUARIUM.height);

    AQUARIUM.ctx.fillStyle = "#000"; AQUARIUM.ctx.fillRect(0, 0,
    AQUARIUM.width, 70);

    AQUARIUM.ctx.fillStyle = "#FFFFFF";
    AQUARIUM.ctx.font = "18px sans-serif";
    AQUARIUM.ctx.textAlign = "left";

    AQUARIUM.ctx.fillText(question.text, 20, 40);

    if (answer.visible) {
      // AQUARIUM.ctx.fillStyle = "#339900";
      // AQUARIUM.ctx.fillRect(0, 70, AQUARIUM.width, 35);
      AQUARIUM.ctx.fillStyle = "#FFFFFF";
      AQUARIUM.ctx.fillText(answer.text, 20, 95);
    }


    AQUARIUM.ctx.fillStyle = "#af364c";
    AQUARIUM.ctx.fillRect(20, 390, seeAnswer.width, seeAnswer.height);

    AQUARIUM.ctx.fillStyle = "#af364c";
    AQUARIUM.ctx.fillRect(280, 390, playAgain.width, playAgain.height);

    AQUARIUM.ctx.font = "24px sans-serif";
    AQUARIUM.ctx.fillStyle = "#FFFFFF";
    AQUARIUM.ctx.fillText(seeAnswer.text, seeAnswer.x, seeAnswer.y);
    AQUARIUM.ctx.fillText(playAgain.text, playAgain.x, playAgain.y);

    AQUARIUM.ctx.restore();
  }

  /**
    @method getFishCount - returns the fish count for a given option or set of options

    @return {Number} answer
  */

  function getFishCount(option) {
    // console.log("getFishCount");

    var answer;

    if (option instanceof Array) {
      // console.log("getFishCount: option is an array");
      answer = totals[option[0]][option[1]];
    }
    else if (typeof totals[option] === "object") {
      // console.log("getFishCount: answer is object");
      answer = totals[option]["total"];
    }
    else {
      // console.log("getFishCount: answer is not object");
      answer = totals[option];
    }
    return answer;
  }

  /**
    @method newQuestion - generates a question and answer based on the number and type of fish on the screen.
  */

  function newQuestion() {
    // console.log("newQuestion: " + qNum);

    var question = {
          text: "",
          answer: 0
        },
        optionArr1 = [],
        optionArr2 = [],
        index1,
        index2,
        opText1,
        opText2,
        qNum = Math.floor(Math.random() * 4);

    while(prevQIndex === qNum) {
      qNum = Math.floor(Math.random() * 4);
    }

    prevQIndex = qNum;

    // console.log(totals);
    // console.log(qNum);

    switch(qNum) {
      case 0: // "How many fish were there?"
        question["text"] = "How many fish were there?";
        question["answer"] = getFishCount("fish");
        break;
      case 1: // "How many {green|red|gold|small|medium|large} fish were there?"
        optionArr1 = [
          "green",
          "red",
          "gold",
          "small",
          "medium",
          "large"
        ];
        index1 = AQUARIUM.utils.randomIndex(optionArr1);
        opText1 = optionArr1[index1];
        question.answer = getFishCount(opText1);
        question.text = "How many " + opText1 + " fish were there?";
        break;
      case 2: // "Were there more {green|red|gold|small|medium|large} fish than {green|red|gold|small|medium|large} fish?"
        optionArr1 = [
          "green",
          "red",
          "gold",
          "small",
          "medium",
          "large"
        ];
        index1 = AQUARIUM.utils.randomIndex(optionArr1);
        opText1 = optionArr1[index1];

        optionArr2 = optionArr1.slice(0);
        optionArr2.splice(index1, 1);
        index2 = AQUARIUM.utils.randomIndex(optionArr2);
        opText2 = optionArr2[index2];

        question.answer = (getFishCount(opText1) > getFishCount(opText2)) ? "Yes" : "No";
        question.text = "Were there more " + opText1 + " fish than " + opText2 + " fish?";
        break;
      case 3: // "How many {small|medium|large} {green|red|gold} fish were there?"
        optionArr1 = [
          "small",
          "medium",
          "large"
        ];
        index1 = AQUARIUM.utils.randomIndex(optionArr1);
        opText1 = optionArr1[index1];

        optionArr2 = [
          "green",
          "red",
          "gold"
        ];
        index2 = AQUARIUM.utils.randomIndex(optionArr2);
        opText2 = optionArr2[index2];

        question.answer = getFishCount([opText1, opText2]);
        question.text = "How many " + opText1 + " " + opText2 + " fish were there?";
        break;
    }

    return question;
  }

  function playAgainAction() {
    console.log("playAgainAction()");
    AQUARIUM.main.changeScreen("fish");
  }

  function seeAnswerAction() {
    console.log("seeAnswerAction()");
    answer.visible = true;
  }

  return {
    init: init,
    render: render,
    update: update
  };
}());
