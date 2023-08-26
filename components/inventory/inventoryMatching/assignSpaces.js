import Swal from "sweetalert2";

const assignSpaces = async (arr1, arr2) => {
  const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));
  const spacesToJson = deepCopy(arr2);
  const booksToJson = deepCopy(arr1);
  let needSpace = { need: false, book: {} };

  const booksArray = booksToJson.sort(
    (a, b) => a.scannedQuantity - b.scannedQuantity
  );
  const spacesArray = spacesToJson.sort((a, b) => a.amount - b.amount);

  const totalSpaces = spacesArray.reduce((acc, item) => acc + item.amount, 0);

  const totalBooks = booksArray.reduce(
    (acc, item) => acc + item.scannedQuantity,
    0
  );

  if (totalBooks > totalSpaces) {
    Swal.fire({
      icon: "error",
      title: "Not enought space",
      text: `Provide more spaces for the books that need to be processed!`,
      footer: "<span>Get more space</span>",
    });

    return;
  }

  const processedData = booksArray.map((book) => {
    let assignedSpace;
    for (let space of spacesArray) {
      if (parseInt(space.amount) >= book.scannedQuantity) {
        assignedSpace = space.location;
        space.amount = parseInt(space.amount) - book.scannedQuantity;
        break; // Breaks out of the inner loop to go to the next book
      }
    }

    if (!assignedSpace) {
      needSpace = { need: true, book: book };
    }

    return {
      ...book,
      ...(assignedSpace ? { SKU: assignedSpace + book.ISBN } : {}),
    };
  });

  return processedData;
};

export default assignSpaces;
