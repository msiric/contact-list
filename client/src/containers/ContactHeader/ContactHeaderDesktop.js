import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  contactHeaderBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  contactHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ContactHeaderDesktop = ({ startItems, endItems }) => {
  const classes = useStyles();

  return (
    <Box className={classes.contactHeaderBox}>
      <Box className={classes.contactHeaderLeft}>{startItems}</Box>
      <Box>{endItems}</Box>
    </Box>
  );
};

export default ContactHeaderDesktop;
