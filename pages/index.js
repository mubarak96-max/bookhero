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
            <strong>Nkangi Jafari by (nkangi.com)</strong>
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
