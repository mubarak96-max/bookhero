//React component that that has an input field for files and a button to upload the file.
import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import csvToJson from './Functions/CsvToJson';

const AddToFirebase = (props) => {
  const [files, setFiles] = useState('');
  const [loading, setLoading] = React.useState(false);

  const onChange = (e) => {
    setFiles(e.target.files);

    console.log(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //Get the uploaded csvs to json array
    let completeConvertedArray = [];

    for (let i = 0; i < files.length; i++) {
      const filename = files[i].name.split('.')[0];

      const csvs = await csvToJson(files[i], filename);

      completeConvertedArray.push(csvs);
    }

    const finalArray = [].concat.apply([], completeConvertedArray);

    let count = 0;

    for (let i = 0; i < finalArray.length; i++) {
      console.log(finalArray[i]);

      if (finalArray[i].Title === '') {
        continue;
      }

      const docRef = await addDoc(collection(db, 'availableBooks'), {
        title: finalArray[i].Title,
        barcode: finalArray[i]['Variant Barcode'],
        price: finalArray[i]['Variant Price'],
        sku: finalArray[i]['Variant SKU'],
        number: 1,
      });

      count += 1;
    }

    const getAllDocs = await getDocs(collection(db, 'availableBooks'));
    getAllDocs.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });

    console.log('Count', count);
    setLoading(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: '100px',
        height: '40vh',
      }}>
      <form onSubmit={onSubmit}>
        <div>
          <input type='file' multiple onChange={onChange} />
          <button type='submit'>Upload</button>
        </div>
      </form>
    </div>
  );
};

export default AddToFirebase;
