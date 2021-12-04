//React component that that has an input field for files and a button to upload the file.
import Papa from 'papaparse';
import React, { useState, useEffect } from 'react';
import compareArrays from '../Functions/compareArrays';

const Upload = (props) => {
  const [files, setFiles] = useState('');

  const onChange = (e) => {
    setFiles(e.target.files);
  };

  const csvToJson = async (fileToConvert, fileName) => {
    const parseFile = () => {
      return new Promise((resolve) => {
        Papa.parse(fileToConvert, {
          header: true,
          complete: (results) => {
            resolve(results.data);
          },
        });
      });
    };
    let parsedData = await parseFile();
    for (let i = 0; i < parsedData.length; i++) {
      if (parsedData[i].Title !== '') {
        parsedData[i].location = fileName;
      }
    }
    return parsedData;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let completeConvertedArray = [];

    for (let i = 0; i < files.length; i++) {
      const filename = files[i].name.split('.')[0];

      const csvs = await csvToJson(files[i], filename);
      console.log(csvs);
      completeConvertedArray.push(csvs);
    }
    console.log('completeConvertedArray', completeConvertedArray);

    //Make the array of arrays into one array
    const finalArray = [].concat.apply([], completeConvertedArray);

    compareArrays(finalArray);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type='file' multiple onChange={onChange} />
        <button type='submit'>Upload</button>
      </div>
    </form>
  );
};

export default Upload;
