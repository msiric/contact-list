import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import SearchInput from '../../components/SearchInput/SearchInput.js';

const useStyles = makeStyles(() => ({
  contactsSearchBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const ContactsSearch = ({ query, handleSearchChange }) => {
  const classes = useStyles();

  return (
    <Box className={classes.contactsSearchBox}>
      <SearchInput query={query} handleSearchChange={handleSearchChange} />
    </Box>
  );
};

export default ContactsSearch;
