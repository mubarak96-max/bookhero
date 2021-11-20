import React from 'react';
import Searchbar from './SearchBar';

const SearchBook = () => {
  return (
    <div
      style={{
        display: "'flex",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>
      <p
        style={{
          maxWidth: '800px',
          textAlign: 'center',
          margin: '15px auto 50px',
        }}>
        This is the search pannel, Search a book by using the book
        <strong> tittle, isbn or author.</strong> <br />
        The results will consist of the image for a preview and a link that will
        be added in the shopify excel document
      </p>
      <Searchbar />
    </div>
  );
};

export default SearchBook;
