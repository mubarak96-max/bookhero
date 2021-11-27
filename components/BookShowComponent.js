import React from 'react';
import styles from '../styles/Home.module.css';

const BookShowComponent = (props) => {
  const { imageLink, bookTittle, bookAuthor, bookISBN } = props.book;
  const { index } = props;
  console.log(index, bookAuthor);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>
      <div className={styles.card}>
        <div>
          <strong> Book Info</strong>
        </div>
        <div>
          <p>
            Tittle: <strong>{bookTittle} </strong>
          </p>
          <p>
            Author: <strong>{bookAuthor} </strong>
          </p>
          <p>
            ISBN: <strong>{bookISBN} </strong>
          </p>
        </div>
      </div>
      <div className={styles.card}>
        <h2>Uploaded Image &rarr;</h2>
        <img width='200PX' height='auto' src={imageLink} alt='Image uploaded' />
      </div>
    </div>
  );
};

export default BookShowComponent;
