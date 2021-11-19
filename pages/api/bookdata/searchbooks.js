import nc from 'next-connect';
import BookData from '../../../Backend/Models/BookData';

//Initialise next-connect
const handler = nc();

//POST REQUEST TO CASHFREE
handler.get(async (req, res) => {
  //Search keyword query

  console.log(req.query.keyWord, 'query');

  const keywordCondition = req.query.keyWord
    ? { bookTittle: { $regex: req.query.keyWord, $options: 'i' } }
    : {};
  console.log(keywordCondition);
  // const keywordCondition = req.body ? req.body : '';

  const Book = await BookData.find({
    $and: [{ ...keywordCondition }],
  });

  console.log(Book);

  // small letter
  res.json({ Book });
});

export default handler;
