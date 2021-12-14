import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, TextField } from '@mui/material';

const Upload = ({ getUploadedBookInfo, getBlob }) => {
  const [uploadError, setUploadError] = useState('');
  const [tittle, setTittle] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [Isbn, setISBN] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    // get secure url from our server
    const { url } = await fetch('/api/authaws').then((res) => res.json());
    // post the image direclty to the s3 bucket
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/jpg',
      },
      body: image,
    });

    if (response.status === 200) {
      const imageUrl = url.split('?')[0];

      const bookInformation = {
        imageLink: imageUrl,
        bookISBN: Isbn,
        bookTittle: tittle,
        bookAuthor: author,
      };

      setAuthor('');
      setISBN('');
      setTittle('');
      setImage('');

      const sendToDatabase = await axios.post(
        '/api/bookdata/addbook',
        bookInformation,
      );

      getUploadedBookInfo(sendToDatabase.data);

      console.log(sendToDatabase);
    } else {
      setUploadError(true);
    }
  };

  return (
    <>
      <TextField
        id='outlined-basic'
        label='Tittle'
        variant='outlined'
        value={tittle}
        onChange={(e) => {
          setTittle(e.target.value);
        }}
      />
      <br /> <br />
      <TextField
        id='outlined-basic'
        label='Author'
        variant='outlined'
        value={author}
        onChange={(e) => {
          console.log('Changed');
          setAuthor(e.target.value);
        }}
      />
      <br /> <br />
      <TextField
        id='outlined-basic'
        label='ISBN'
        variant='outlined'
        value={Isbn}
        onChange={(e) => {
          setISBN(e.target.value);
        }}
      />
      <br />
      <br />
      <label htmlFor='contained-button-file'>
        <Input
          accept='image/*'
          id='contained-button-file'
          type='file'
          onChange={(e) => {
            setImage(e.target.files[0]);
            getBlob(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </label>
      <br />
      <br />
      {tittle && author && Isbn && image && (
        <Button variant='contained' component='span' onClick={handleUpload}>
          Confirm Upload
        </Button>
      )}
      {uploadError && (
        <h2>
          Upload Error, Reload the page and try again, if it persists contact
          Jafari
        </h2>
      )}
    </>
  );
};

export default Upload;
