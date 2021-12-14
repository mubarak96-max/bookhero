//React component that that has an input field for files and a button to upload the file.
import Papa from 'papaparse';
import React, { useState } from 'react';
import arrayToCSV from '../Functions/arrayToCSV';
import findDuplicates from '../Functions/findDuplicates';
// import { LoadingButton } from '@mui/lab';
// import { SaveIcon } from '@mui/icons-material';

const Upload = (props) => {
  const [files, setFiles] = useState('');
  const [downloadSource, setDownloadSource] = useState('');

  const onChange = (e) => {
    setFiles(e.target.files);
  };

  const [loading, setLoading] = React.useState(false);

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
    setLoading(true);

    let completeConvertedArray = [];

    for (let i = 0; i < files.length; i++) {
      const filename = files[i].name.split('.')[0];

      const csvs = await csvToJson(files[i], filename);

      completeConvertedArray.push(csvs);
    }

    //Make the array of arrays into one array
    const finalArray = [].concat.apply([], completeConvertedArray);

    const final = findDuplicates(finalArray);

    const url = arrayToCSV(final, 'duplicates.csv');

    setDownloadSource(url);
    setLoading(false);

    // a BUTTON to download the file
    // const downloadButton = document.createElement('a');
    // downloadButton.setAttribute('href', url);
    // downloadButton.setAttribute('download', 'duplicates.csv');
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type='file' multiple onChange={onChange} />
        <button type='submit'>Upload</button>
      </div>

      {downloadSource && (
        <div
          style={{
            marginTop: '60px',
          }}>
          <a
            href={downloadSource}
            download
            style={{
              backgroundColor: 'DodgerBlue',
              border: 'none',
              color: 'white',
              padding: '12px 30px',
              cursor: 'pointer',
              fontSize: '20px',
              marginTop: '60px',
            }}>
            Download
          </a>
        </div>
      )}
    </form>
  );
};

export default Upload;
