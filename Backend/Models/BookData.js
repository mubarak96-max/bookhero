import mongoose from 'mongoose';

const BookDataSchema = mongoose.Schema(
  {
    imageLink: { type: String },
    bookISBN: { type: String },
    bookTittle: { type: String },
    bookAuthor: { type: String },
  },
  { timestamps: true },
);

const BookData =
  mongoose.models.BookData || mongoose.model('BookData', BookDataSchema);

export default BookData;
