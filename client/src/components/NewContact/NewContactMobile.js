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
  },
  newContactCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 70,
    width: '100%',
    margin: '10px 0',
    padding: '0 20px',
    border: '3px dotted',
    color: contactListTheme.palette.primary.main,
    textDecoration: 'none',
    boxShadow: 'none',
  },
  newContactIcon: {
    marginRight: 20,
  },
}));

const NewContactMobile = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.newContactWrapper}>
      <Card
        component={RouterLink}
        to="/add_contact"
        className={classes.newContactCard}
      >
        <AddIcon className={classes.newContactIcon} />
        <Typography variant="body2" color="primary" noWrap>
          Add new
        </Typography>
      </Card>
    </Grid>
  );
};

export default NewContactMobile;
