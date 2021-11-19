import nc from 'next-connect';

//Initialise next-connect
const handler = nc();

//POST REQUEST TO CASHFREE
handler.get(async (req, res) => {
  //Search keyword query
  const keywordCondition = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const count = await Product.find({
    $and: [{ ...keywordCondition }],
  }).countDocuments();

  const Book = await Product.find({
    $and: [{ ...keywordCondition }],
  }).limit(pageSize);

  // small letter
  res.json({ Book });
});

export default handler;
