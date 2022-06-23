// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCtyqNVV8Opo5P9fwpRP1PlfNPX4LfP8Vg',
  authDomain: 'bookhero-app.firebaseapp.com',
  projectId: 'bookhero-app',
  storageBucket: 'bookhero-app.appspot.com',
  messagingSenderId: '460075177742',
  appId: '1:460075177742:web:8fdb3fd7b6e54910e1e95f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const functions = getFunctions();
const storage = getStorage();

//For the emulators
connectAuthEmulator(auth, 'http://localhost:9099');
connectFirestoreEmulator(db, 'localhost', 8080);
connectFunctionsEmulator(functions, 'localhost', 5001);
connectStorageEmulator(storage, 'localhost', 4000);

export { auth, db, functions, storage };
