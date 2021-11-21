import nc from 'next-connect';
import BookData from '../../../Backend/Models/BookData';
import connectDB from '../../../Backend/config/dbConnect';

//Initialise next-connect
const handler = nc({ attachParams: true });

//POST REQUEST TO CASHFREE
handler.get(async (req, res) => {
  //Search keyword query

  try {
    console.log(req.params.wild, 'params');
    console.log(req.params.keyword, 'params');
    console.log(req.query, 'query');
    console.log(req.body, 'body');

    // const keywordCondition = req.body ? req.body : '';
    // $or: [
    //   { bookTittle: { $regex: req.query.keyword, $options: 'i' } },
    //   { bookISBN: { $regex: req.query.keyword, $options: 'i' } },
    //   { bookTittle: { $regex: req.query.keyword, $options: 'i' } },
    // ],

    const Book = await BookData.find({
      $or: [
        { bookTittle: { $regex: req.query.keyword, $options: 'i' } },
        { bookISBN: { $regex: req.query.keyword, $options: 'i' } },
        { bookAuthor: { $regex: req.query.keyword, $options: 'i' } },
      ],
    });

    console.log('Book', Book);

    // small letter
    return res.json(Book);
  } catch (error) {
    console.log(error.message, error);
  }
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
};

export default connectDB(handler);
