import nextConnect, { createRouter } from 'next-connect';
import connectDB from '../../../Backend/config/dbConnect';
import BookData from '../../../Backend/Models/BookData';

const addBook = async () => {
  await connectDB();

  try {
    const Book = await BookData.create({
      imageLink,
      bookISBN,
      bookTittle,
      bookAuthor
    });

    const bookDatacreated = await Book.save();

    if (!bookDatacreated) {
      throw new Error('Saving the email address');
    }

    return res.status(201).send(bookDatacreated);
  } catch (err) {
    return res.status(500).send(error.message);
  }
};

// const handler = nc();
// const router = createRouter();
// router.post(async (req, res) => {
//   try {
//     const { imageLink, bookISBN, bookTittle, bookAuthor } = req.body;
//     var bookData = new BookData({
// imageLink,
// bookISBN,
// bookTittle,
// bookAuthor
//     });

//     // Create new subscriber
//     const bookDatacreated = await bookData.save();

// if (!bookDatacreated) {
//   throw new Error('Saving the email address');
// }

//     return res.status(201).send(bookDatacreated);
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

export default addBook;
