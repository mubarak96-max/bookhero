//React component that that has an input field for files and a button to upload the file.
import React, { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';

const AddToFirebase = (props) => {
  const [files, setFiles] = useState('');
  const [downloadSource, setDownloadSource] = useState('');
  const [loading, setLoading] = React.useState(false);

  const onChange = (e) => {
    setFiles(e.target.files);

    console.log(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const storageRef = ref(storage, 'documents/csv.csv');

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, files).then((snapshot) => {
      console.log('Uploaded a blob or file!', snapshot);
    });

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
