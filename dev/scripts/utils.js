AQUARIUM.utils = (function() {
  /**
    @method randomIndex - picks random index in an array

    @param {Array} arr
    @return {Number}
  */

  function randomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
  }

  return {
    randomIndex: randomIndex
  }
}());