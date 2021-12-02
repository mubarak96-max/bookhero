//React component that that has an input field for files and a button to upload the file.
import Papa from 'papaparse';
import React, { useState, useEffect } from 'react';
import compareArrays from '../Functions/compareArrays';

const Upload = (props) => {
  const [files, setFiles] = useState('');

  const onChange = (e) => {
    setFiles(e.target.files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const arrayCheck = [];
    let count = 0;
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      const fileName = files[i].name.split('.')[0];
      Papa.parse(files[i], {
        header: true,
        complete: function (results) {
          for (let i = 0; i < results.data.length; i++) {
            results.data[i].location = fileName;
          }

          arrayCheck.push(...results.data);
          count++;

          console.log(files.length, count);

          if (files.length === count) {
            console.log(arrayCheck);
            compareArrays(arrayCheck);
          }
        },
      });
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
