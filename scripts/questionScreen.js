AQUARIUM.questionScreen = (function() {

  var totals;

  /**
    @method init
  */

  function init() {
    totals = AQUARIUM.fishScreen.getTotals();
  }

  /**
    @method update
  */

  function update(dt) {

  }

  /**
    @method render
  */

  function render() {
    AQUARIUM.ctx.save();

    AQUARIUM.ctx.fillStyle = "#D71C40";
    AQUARIUM.ctx.fillRect(0, 0, AQUARIUM.width, AQUARIUM.height);


    AQUARIUM.ctx.fillStyle = "#FFFFFF";
    AQUARIUM.ctx.font = "24pt sans-serif";

    AQUARIUM.ctx.fillText("Question goes here", 100, 100);

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

  function newQuestion(qNum) {
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
        opText2;

    // console.log(totals);
    // console.log(qNum);

    switch(qNum) {
      case 0: // "How many fish were there?"
        question["text"] = "How many fish were there?";
        question["answer"] = getFishCount("fish");
        break;
      case 1: // "How many {green|red|orange|small|medium|large} fish were there?"
        optionArr1 = [
          "green",
          "red",
          "orange",
          "small",
          "medium",
          "large"
        ];
        index1 = AQUARIUM.utils.randomIndex(optionArr1);
        opText1 = optionArr1[index1];
        question.answer = getFishCount(opText1);
        question.text = "How many " + opText1 + " fish were there?";
        break;
      case 2: // "Were there more {green|red|orange|small|medium|large} fish than {green|red|orange|small|medium|large} fish?"
        optionArr1 = [
          "green",
          "red",
          "orange",
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

        question.answer = (getFishCount(opText1) > getFishCount(opText2));
        question.text = "Were there more " + opText1 + " fish than " + opText2 + " fish?";
        break;
      case 3: // "How many {small|medium|large} {green|red|orange} fish were there?"
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
          "orange"
        ];
        index2 = AQUARIUM.utils.randomIndex(optionArr2);
        opText2 = optionArr2[index2];

        question.answer = getFishCount([opText1, opText2]);
        question.text = "How many " + opText1 + " " + opText2 + " fish were there?";
        break;
    }

    return question;
  }

  return {
    init: init,
    render: render,
    update: update
  };
}());
