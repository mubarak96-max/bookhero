//A function to find duplicate values in an array
function findDuplicates(array) {
  var sorted_arr = array.slice().sort();
  var results = [];
  for (var i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      results.push(sorted_arr[i]);
    }
  }
  console.log(results);
}

const array = [1, 2, 4, 5, 6, 3, 5, 3, 5, 7, 7];
findDuplicates(array);

export default findDuplicates;
