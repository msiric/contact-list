import { AppBar, Box, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../assets/logo.png';

const useStyles = makeStyles(() => ({
  headerBar: {
    background: 'linear-gradient(0.25turn, #41A7B1, #6FC3C9)',
    boxShadow: 'none',
    height: 56,
  },
  headerToolbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  headerLogo: {
    paddingTop: 4,
    width: 178,
  },
  headerBox: {
    height: 8,
    background: 'linear-gradient(0.25turn, #78C1C7, #99D5D9)',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.headerBar}>
      <Toolbar variant="dense" className={classes.headerToolbar}>
        <Box component={RouterLink} to="/">
          <img src={Logo} alt="Logo" className={classes.headerLogo} />
        </Box>
      </Toolbar>
      <Box className={classes.headerBox}></Box>
    </AppBar>
  );
};

export default Header;
