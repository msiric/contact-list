import { Box } from '@material-ui/core';
import React from 'react';
import Header from '../components/Header/Header.js';
import AppLayoutStyles from './AppLayout.style.js';

const AppLayout = ({ children }) => {
  const classes = AppLayoutStyles();

  return (
    <Box className={classes.appRoot}>
      <Header />
      <Box className={classes.appContainer}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
