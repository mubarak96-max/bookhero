import nc from 'next-connect';
import connectDB from '../../../Backend/config/db';
import BookData from '../../../Backend/Models/BookData';

const handler = nc();
handler.post(async (req, res) => {
  try {
    const { imageLink, bookISBN, bookTittle, bookAuthor } = req.body;
    var bookData = new BookData({
      imageLink,
      bookISBN,
      bookTittle,
      bookAuthor,
    });

    // Create new subscriber
    const bookDatacreated = await bookData.save();

    if (!bookDatacreated) {
      throw new Error('Saving the email address');
    }

    return res.status(201).send(bookDatacreated);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default connectDB(handler);
