import { Button as Control } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'initial',
    width: 150,
    borderRadius: 25,
    boxShadow: 'none',
    color: 'white',
  },
}));

const Link = ({ path, color, text }) => {
  const classes = useStyles();

  return (
    <Control
      component={RouterLink}
      to={path}
      style={{ background: color }}
      className={classes.button}
      variant="contained"
    >
      {text}
    </Control>
  );
};

export default Link;
