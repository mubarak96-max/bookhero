//React component that that has an input field for files and a button to upload the file.
import React, { useState } from 'react';
import arrayToCSV from '../Functions/arrayToCSV';
import findTagsDuplicates from '../Functions/findTagsDuplicates';
import csvToJson from '../Functions/CsvToJson';
// import { LoadingButton } from '@mui/lab';
// import { SaveIcon } from '@mui/icons-material';

const Upload = (props) => {
  const [files, setFiles] = useState('');
  const [downloadSource, setDownloadSource] = useState('');

  const onChange = (e) => {
    setFiles(e.target.files);
  };

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // let completeConvertedArray = [];

    // for (let i = 0; i < files.length; i++) {
    //   const filename = files[i].name.split('.')[0];

    //   const csvs = await csvToJson(files[i], filename);

    //   completeConvertedArray.push(csvs);
    // }

    // //Make the array of arrays into one array
    // const finalArray = [].concat.apply([], completeConvertedArray);

    // const final = findTagsDuplicates(finalArray);

    // const url = arrayToCSV(final, 'All tags.csv');

    // setDownloadSource(url);
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
    </div>
  );
};

export default Upload;
