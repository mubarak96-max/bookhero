import React from 'react';

const SearchedBook = () => {
  return <div></div>;
};

export default SearchedBook;

export async function getServerSideProps(context) {
  await dbConnect();

  console.log(req.params.wild, 'params');
  console.log(req.params.keyword, 'params');
  console.log(req.query, 'query');
  console.log(req.body, 'body');

  const keywordCondition = {
    bookTittle: { $regex: req.query, $options: 'i' },
  };
  console.log(keywordCondition);

  // const keywordCondition = req.body ? req.body : '';

  const Book = await BookData.find({
    bookTittle: { $regex: 'Think and grow', $options: 'i' },
  });

  console.log('bOOKS:', Book);
  // .limit()
  if (!ordersFromDB) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: JSON.parse(JSON.stringify(ordersFromDB)) }, // will be passed to the page component as props
  };
}
