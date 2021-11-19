import React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Input, Button } from '@mui/material';
import Search from '@mui/icons-material/Search';
import axios from 'axios';
import * as rax from 'retry-axios';

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

  const onSubmit = async () => {
    // const response = await axios.get('/api/bookdata/searchbooks', keyWord);

    console.log(keyWord);
    const body = { keyWord };

    const interceptorId = rax.attach();
    const response = await axios({
      method: 'GET',
      url: '/api/bookdata/searchbooks',
      raxConfig: {
        retry: 3,
        noResponseRetries: 2,
        retryDelay: 500,
        httpMethodsToRetry: ['POST', 'PUT', 'GET'],

        onRetryAttempt: (err) => {
          const cfg = rax.getConfig(err);
          console.log(
            `Request failed, Retry attempt #${cfg.currentRetryAttempt}`,
          );
        },
      },
      params: body, //Order info attached to be received as body
    });

    console.log(response);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
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
    </div>
  );
}
