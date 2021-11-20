import nc from 'next-connect';
import BookData from '../../../Backend/Models/BookData';
import connectDB from '../../../Backend/config/dbConnect';

//Initialise next-connect
const handler = nc();

//POST REQUEST TO CASHFREE
handler.get(async (req, res) => {
  //Search keyword query

  try {
    console.log(req.params.keyword, 'query');

    const keywordCondition =
      {
        bookTittle: { $regex: req.query, $options: 'i' },
      } || 'This is';
    console.log(keywordCondition);

    // const keywordCondition = req.body ? req.body : '';

    const Book = await BookData.find({
      bookTittle: { $regex: 'Think and grow r', $options: 'i' },
    });

    console.log('bOOKS:', Book);

    // small letter
    res.json({ Book });
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
