import mongoose, { model, models, Schema } from 'mongoose';

const BookDataSchema = new Schema(
  {
    imageLink: { type: String },
    bookISBN: { type: String },
    bookTittle: { type: String },
    bookAuthor: { type: String }
  },
  { timestamps: true }
);

const BookData = models.BookData || model('BookData', BookDataSchema);

export default BookData;
