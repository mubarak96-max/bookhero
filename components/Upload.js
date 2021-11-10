import React from 'react';

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
    console.log('URL', url);
    console.log('IMAGEuRL', imageUrl);
    console.log(response);
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
