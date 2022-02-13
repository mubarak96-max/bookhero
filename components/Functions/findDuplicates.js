const findDuplicates = (arr) => {
  var obj = {};
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    if (obj[current.Title] === undefined) {
      obj[current.Title] = [current.location];
    } else {
      obj[current.Title].push(current.location);
    }
  }

  for (var key in obj) {
    if (obj[key].length > 1 && key !== '') {
      result.push({
        Title: key,
        locations: obj[key],
      });
    }
  }

  console.log(result);
  const toFindDuplicates = (array) =>
    array.filter((item, index) => arr.indexOf(item) !== index);

  //A function to get how many times an element occurs in an array
  const getOccurrence = (array, element) => {
    return array.reduce((a, e) => (e === element ? a + 1 : a), 0);
  };

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].locations.length; j++) {
      const duplicateElements = getOccurrence(
        result[i].locations,
        result[i].locations[j],
      );
      console.log(`Duplicates in ${result[i].locations[j]}`, duplicateElements);
    }
  }

  return result;
};

export default findDuplicates;
