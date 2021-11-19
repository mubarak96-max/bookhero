import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Upload from '../components/Upload';
import Image from 'next/image';

export default function Home() {
  const [imageLink, setImageLink] = useState('');

  const getImage = (link) => {
    console.log(link);
    setImageLink(link);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Upload Image &rarr;</h2>
            <br />

            <Upload getImage={getImage} />
          </div>

          <div className={styles.card}>
            <p>Upload Book Info</p>
          </div>

          <div className={styles.card}>
            <h2>Uploaded Image &rarr;</h2>
            <img
              width='200'
              height='auto'
              src={imageLink}
              alt='Image uploaded'
            />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href='https://nkangi.com' target='_blank' rel='noopener noreferrer'>
          Developed By
          <span className={styles.logo}>
            {/* <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} /> */}
            <strong>Nkangi Jafri</strong>
          </span>
        </a>
      </footer>
    </div>
  );
}
