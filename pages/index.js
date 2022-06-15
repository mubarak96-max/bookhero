import React, { useEffect } from 'react';
import DisplayTabs from '../components/Tabs';
import styles from '../styles/Home.module.css';
import { doc, setDoc } from 'firebase/firestore';

const Home = () => {
  useEffect(() => {
    // Add a new document in collection "cities"
    // (async  => await setDoc(doc(db, "cities", "LA"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA"
    // }))();

    async;
  }, []);

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
