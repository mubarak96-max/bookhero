const compareArrays = (array) => {
  //Iterate through the array to find the same values

  console.log(array[0].Title);
  let same = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 1; j < array.length; j++) {
      if (
        array[i].Title === array[j].Title &&
        i !== j &&
        array[i].Title !== ''
      ) {
        same.push(array[i]);
      }
    }
  }
  //Return the array of same values
  //   console.log('same', same);
  return same;
};

export default compareArrays;
