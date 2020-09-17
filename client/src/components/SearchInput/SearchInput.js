import { InputAdornment, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import React from 'react';
import { contactListTheme } from '../../constants/theme';

const useStyles = makeStyles(() => ({
  searchInputField: {
    margin: '6vh 0',
    width: '30%',
    minWidth: 272,
    boxShadow: '0px 0px 55px 3px rgba(0,0,0,0.15)',
  },
  searchInputIcon: {
    color: contactListTheme.palette.warning.main,
  },
}));

const Search = ({ query, handleSearchChange }) => {
  const classes = useStyles();

  return (
    <TextField
      name="searchInput"
      onChange={(e) => {
        e.persist();
        handleSearchChange(e);
      }}
      className={classes.searchInputField}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              className={classes.searchInputIcon}
              fontSize="default"
            />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
