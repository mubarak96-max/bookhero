const findDuplicates = (arr) => {
  var obj = {};
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];

    if (obj[current.Title] === undefined) {
      obj[current.Title] = [
        `${current.location} - (${current['Variant Inventory Qty']})`,
      ];
    } else {
      obj[current.Title].push(
        `${current.location} - (${current['Variant Inventory Qty']})`,
      );
    }
  }

  for (var key in obj) {
    if (obj[key].length > 1 && key !== '' && key !== 'undefined') {
      result.push({
        Title: key,
        locations: obj[key],
      });
    }
  }

  console.log(result);

  return result;
};

export default findDuplicates;
