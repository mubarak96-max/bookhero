//A function that compares 4 arrays and return the simmilarity
//The function returns array of the simmilarity
function compareArrays(array1, array2, array3, array4) {
  var array = [array1, array2, array3, array4];
  var count = 0;
  var countArray = [];
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array[i].length; j++) {
      if (array[i][j] == array[i][j + 1]) {
        count++;
      }
    }
    countArray.push(count);
    count = 0;
  }
  return countArray;
}

export default compareArrays;
