import React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Input, Button } from '@mui/material';
import Search from '@mui/icons-material/Search';
import axios from 'axios';
import * as rax from 'retry-axios';
import { useRouter } from 'next/router';
import connectDB from '../Backend/config/dbConnect';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  maxWidth: '850px',
  padding: theme.spacing(0, 3),
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [keyWord, setKeyword] = useState('');

  const router = useRouter();

  const onSubmit = async () => {
    const response = await axios.get('/api/bookdata/searchbooks', {
      params: { keyword: keyWord },
    });

    console.log(response);

    // router.push(`/${keyWord}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
      }}>
      <SearchbarStyle>
        <Search />
        <Input
          autoFocus
          fullWidth
          placeholder='Search by: tittle, author or ISBN'
          value={keyWord}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          sx={{
            mr: 1,
            fontWeight: 'fontWeightBold',
            margin: '0px -30px',
            padding: '0px 40px',
          }}
        />
        <Button variant='contained' onClick={onSubmit}>
          Search
        </Button>
      </SearchbarStyle>
      <div>This is the display</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  await connectDB();
  const BookfromDB = await BookData.find({
    bookTittle: { $regex: 'Think and grow rich', $options: 'i' },
  });

  console.log(BookfromDB);
  if (!BookfromDB) {
    return {
      notFound: true,
    };
  }

  const Books = BookfromDB.map((book, index) => ({
    imageLink: book.imageLink,
    bookISBN: book.bookISBN,
    bookTittle: book.bookTittle,
    bookAuthor: book.bookAuthor,
  }));

  return {
    props: { data: JSON.parse(JSON.stringify(Books)) }, // will be passed to the page component as props
  };
}
