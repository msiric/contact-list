import { Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon } from '@material-ui/icons';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { contactListTheme } from '../../constants/theme';

const useStyles = makeStyles((theme) => ({
  newContactWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 500,
  },
  newContactCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: 160,
    margin: 20,
    border: '3px dotted',
    color: contactListTheme.palette.primary.main,
    textDecoration: 'none',
    boxShadow: 'none',
  },
}));

const NewContactDesktop = () => {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      className={classes.newContactWrapper}
    >
      <Card
        component={RouterLink}
        to="/add_contact"
        className={classes.newContactCard}
      >
        <AddIcon />
        <Typography variant="h6" color="primary" component="p" noWrap>
          Add new
        </Typography>
      </Card>
    </Grid>
  );
};

export default NewContactDesktop;
