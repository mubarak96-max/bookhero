import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, TextField } from '@mui/material';

const Upload = () => {
  const [tittle, setTittle] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [Isbn, setIsbn] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    // get secure url from our server
    const { url } = await fetch('/api/authaws').then((res) => res.json());
    console.log(url);
    // post the image direclty to the s3 bucket
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/jpg',
      },
      body: file,
    });

    const imageUrl = url.split('?')[0];

    const bookInformation = {
      imageLink: imageUrl,
      bookISBN: Isbn,
      bookTittle: tittle,
      bookAuthor: author,
    };

    const sendToDatabase = await axios.post(
      '/api/bookdata/addbook',
      bookInformation,
    );

    console.log(sendToDatabase);
  };

  return (
    <>
      <TextField
        id='outlined-basic'
        label='Tittle'
        variant='outlined'
        onChange={(e) => {
          setTittle(e.target.value);
        }}
      />
      <br /> <br />
      <TextField
        id='outlined-basic'
        label='Author'
        variant='outlined'
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
          }}
        />
      </label>
      <br />
      <br />
      <Button variant='contained' component='span' onClick={handleUpload}>
        Upload
      </Button>
    </>
  );
};

export default Upload;
