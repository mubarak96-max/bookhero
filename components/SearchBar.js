import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Input, Button } from '@mui/material';
import Search from '@mui/icons-material/Search';
import axios from 'axios';
import BookShowComponent from './BookShowComponent';

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
  const [searchResult, setSearchResult] = useState([]);

  const onSubmit = async () => {
    const response = await axios.get('/api/bookdata/searchbooks', {
      params: { keyword: keyWord },
    });

    console.log(response.data);

    setSearchResult(response.data);
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

      <div>
        {searchResult.map((book, index) => (
          <BookShowComponent
            book={book}
            index={index}
            key={`${book.bookTittle}-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
