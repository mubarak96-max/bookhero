import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

import { useState } from 'react';

// material
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
  IconButton,
} from '@mui/material';
import Search from '@mui/icons-material/Search';

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
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <SearchbarStyle>
          <Input
            autoFocus
            fullWidth
            // disableUnderline
            placeholder='Search by: tittle, author or ISBN'
            sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
          />
          <Search />
          <Button variant='contained' onClick={handleClose}>
            Search
          </Button>
        </SearchbarStyle>
      </div>
    </ClickAwayListener>
  );
}
