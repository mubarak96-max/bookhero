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
    let convertedArray = [];
    Papa.parse(fileToConvert, {
      header: true,
      complete: function (results, file) {
        for (let i = 0; i < results.data.length; i++) {
          results.data[i].location = fileName;
          convertedArray.push(results.data[i]);
        }

        console.log('convertedArray', convertedArray);
      },
    });

    return convertedArray;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    for (let i = 0; i < files.length; i++) {
      const filename = files[i].name.split('.')[0];

      const csvs = await csvToJson(files[i], filename);

      console.log('csvs', csvs);
      //   if (files.length === count) {
      //     compareArrays(arrayCheck);
      //   }
    }
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
