import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Upload from './Upload';

export default function Home() {
  const [imageLink, setImageLink] = useState('');
  const [tittle, setTittle] = useState('');
  const [author, setAuthor] = useState('');
  const [ISBN, setISBN] = useState('');

  const getUploadedBookInfo = (info) => {
    console.log(info);
    setImageLink(info.imageLink);
    setTittle(info.bookTittle);
    setAuthor(info.bookAuthor);
    setISBN(info.bookISBN);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Upload Pictures' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <h1 className={styles.title}>
          Bookhero book Upload - <a href='https://bookhero.in'>bookhero.in</a>
        </h1>

        <p className={styles.description}>
          Remember what you upload here will be used forever. So
          <code className={styles.code}>Be critical</code>
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Upload Image &rarr;</h2>
            <br />

            <Upload getUploadedBookInfo={getUploadedBookInfo} />
          </div>

          <div className={styles.card}>
            <div>
              <strong>Upload Book Info</strong>
            </div>
            <div>
              <p>
                Tittle: <strong>{tittle} </strong>
              </p>
              <p>
                Author: <strong>{author} </strong>
              </p>
              <p>
                ISBN: <strong>{ISBN} </strong>
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Uploaded Image &rarr;</h2>
            <img
              width='200PX'
              height='auto'
              src={imageLink}
              alt='Image uploaded'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
