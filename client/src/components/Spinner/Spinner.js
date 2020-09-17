import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  spinnerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Spinner = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.spinnerContainer}>
      <CircularProgress />
    </Grid>
  );
};

export default Spinner;
