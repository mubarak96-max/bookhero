import React from 'react';
import DisplayTabs from '../components/Tabs';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.main}>
      <DisplayTabs />

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
};

export default Home;
