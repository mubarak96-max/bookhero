const findDuplicates = (arr) => {
  var obj = {};
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];

    if (current.Tags) {
      const splitted = arr[i].Tags.split(',');
      //   console.log(splitted);
      for (let j = 0; j < splitted.length; j++) {
        console.log('splitted one', splitted[j]);

        if (obj[splitted[j]] === undefined) {
          obj[splitted[j].trim()] = 1;
          //   console.log(obj);
        } else {
          obj[splitted[j].trim()] += 1;
          //   console.log(obj);
        }
      }
    }
  }

  console.log(obj);

  for (var key in obj) {
    result.push({
      Tag: key,
      Appearance: obj[key],
    });
  }

  console.log('results', result);

  return result;
};

export default findDuplicates;
