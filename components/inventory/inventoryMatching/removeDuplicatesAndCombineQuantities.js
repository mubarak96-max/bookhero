const removeDuplicatesAndCombineQuantities = async (books) => {
  const titleMap = {};

  books.forEach((book) => {
    book.Quantity = Number(book?.Quantity);
    // If the book title is not in the map, add it
    if (!titleMap[book.Title]) {
      titleMap[book.Title] = { ...book };
    } else {
      // If it is in the map, increment the quantity
      titleMap[book.Title].Quantity += book.Quantity;
    }
  });

  // Convert the values of the titleMap back to an array
  return Object.values(titleMap);
};

export default removeDuplicatesAndCombineQuantities;
