//A function that takes in an array and find duplicates
//and returns an array of duplicates

function findDuplicates(array) {
  var duplicates = [];
  for (var i = 0; i < array.length; i++) {
    for (var j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        duplicates.push(array[i]);
      }
    }
  }
  return duplicates;
}
