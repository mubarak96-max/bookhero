import React from 'react';
import BookData from '../Backend/Models/BookData';
import connectDB from '../Backend/config/dbConnect';

const SearchedBook = () => {
  return <div>This is a search</div>;
};

export default SearchedBook;

export async function getServerSideProps(context) {
  await connectDB();

  console.log(context.params, 'params');
  console.log(context.params.keyword, 'params');
  console.log(context.query, 'query');

  //   const keywordCondition = {
  //     bookTittle: { $regex: req.query, $options: 'i' },
  //   };

  const keyword = context.params.keyword;

  // const keywordCondition = req.body ? req.body : '';

  const BooksFromDB = await BookData.find({
    bookTittle: { $regex: keyword, $options: 'i' },
  });

  console.log('bOOKS:', BooksFromDB);
  // .limit()
  if (!BooksFromDB) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: JSON.parse(JSON.stringify(BooksFromDB)) }, // will be passed to the page component as props
  };
}
