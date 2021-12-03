//A function takes in an array of objects and returns an an array of objects with one key added to each object.
const addKey = (array, key) => {
  return array.map((obj) => {
    obj[key] = true;
    return obj;
  });
};
