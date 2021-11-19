import React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Input, Button } from '@mui/material';
import Search from '@mui/icons-material/Search';
import axios from 'axios';

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
  // backdropFilter: 'blur(6px)',
  // WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  // backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  // [theme.breakpoints.up('md')]: {
  //   height: APPBAR_DESKTOP,
  //   padding: theme.spacing(0, 5),
  // },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [keyWord, setKeyword] = useState('');

  const onSubmit = async () => {
    const response = await axios.get('/api/bookdata/searchbooks');

    console.log(response);
  };

  return (
    <div>
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
    </div>
  );
}
