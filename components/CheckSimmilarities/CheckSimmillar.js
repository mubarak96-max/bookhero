//React component that that has an input field for files and a button to upload the file.
import Papa from 'papaparse';
import React, { useState, useEffect } from 'react';
import compareArrays from '../Functions/compareArrays';

const Upload = (props) => {
  const [files, setFiles] = useState('');

  const onChange = (e) => {
    setFiles(e.target.files);
  };

  const csvToJson = async (fileToConvert) => {
    const FileConverted = [];
    Papa.parse(fileToConvert, {
      header: true,
      complete: function (results, file) {
        console.log(file);

        FileConverted.push(...results.data);
      },
    });

    //   for (let i = 0; i < results.data.length; i++) {
    //     results.data[i].location = files[i].name.split('.')[0];
    //   }

    return FileConverted;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const arrayCheck = [];
    let count = 0;
    for (let i = 0; i < files.length; i++) {
      console.log(`File No${i}`, files[i].name.split('.')[0]);

      const csvs = await csvToJson(files[i]);
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
