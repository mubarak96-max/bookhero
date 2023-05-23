import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Upload from './Upload';
import { Button } from '@mui/material';

export default function Home() {
  const [imageLink, setImageLink] = useState('');
  const [tittle, setTittle] = useState('');
  const [author, setAuthor] = useState('');
  const [ISBN, setISBN] = useState('');

  const [blob, setBlob] = useState('');

  const [copied, setCopied] = useState(false);

  const getUploadedBookInfo = (info) => {
    setImageLink(info.imageLink);
    setTittle(info.bookTittle);
    setAuthor(info.bookAuthor);
    setISBN(info.bookISBN);
  };

  //Get the blob to display the image before uploading
  const getBlob = (dataURL) => {
    setBlob(dataURL);
  };

  const copyToClipboard = () => {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(imageLink);
    setCopied(true);
    setImageLink('');
    setTittle('');
    setAuthor('');
    setISBN('');
    setBlob('');
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

            <Upload
              getUploadedBookInfo={getUploadedBookInfo}
              getBlob={getBlob}
            />
          </div>

          <div className={styles.card}>
            <h2>Uploaded Image &rarr;</h2>
            <Image
              width={200}
              height={200}
              src={blob ? blob : '/favicon.ico'}
              alt='Image uploaded'
            />
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

              <br />

              {imageLink && (
                <Button
                  variant='contained'
                  component='span'
                  onClick={copyToClipboard}
                >
                  Copy image Link
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
