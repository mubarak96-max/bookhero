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
    if (obj[key].length > 1) {
      result.push({
        Title: key,
        locations: obj[key],
      });
    }
  }

  return result;
};

export default findDuplicates;
