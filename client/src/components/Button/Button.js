import { Button as Control } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  buttonControl: {
    textTransform: 'initial',
    width: 150,
    borderRadius: 25,
    boxShadow: 'none',
    color: 'white',
  },
}));

const Button = ({ type, color, text, onClick, className }) => {
  const classes = useStyles();

  return (
    <Control
      type={type}
      style={{ background: color }}
      className={classes.buttonControl}
      variant="contained"
      onClick={onClick || null}
    >
      {text}
    </Control>
  );
};

export default Button;
