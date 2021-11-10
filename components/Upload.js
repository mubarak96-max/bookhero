import React from 'react';
import axios from 'axios';

const Upload = () => {
  const handleChange = async (e) => {
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
      bookISBN: '222222',
      bookTittle: 'This is a book',
      bookAuthor: 'Nkangi Jafri',
    };

    const sendToDatabase = await axios.post(
      '/api/bookdata/addbook',
      bookInformation,
    );
    console.log(sendToDatabase);
  };

  return (
    <div>
      <input
        id='uploadPic'
        onChange={handleChange}
        accept='image/*'
        type='file'
      />
    </div>
  );
};

export default Upload;
