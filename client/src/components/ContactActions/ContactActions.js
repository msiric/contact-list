import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  contactActionsBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  contactActionsLeft: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ContactActions = ({ leftItems, rightItems }) => {
  const classes = useStyles();

  return (
    <Box className={classes.contactActionsBox}>
      <Box className={classes.contactActionsLeft}>{...leftItems}</Box>
      <Box>{...rightItems}</Box>
    </Box>
  );
};

export default ContactActions;
