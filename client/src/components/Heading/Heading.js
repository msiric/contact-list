import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { contactListTheme } from '../../constants/theme.js';

const useStyles = makeStyles(() => ({
  headingLabel: {
    color: contactListTheme.palette.warning.main,
    margin: '44px 28px',
    fontSize: 18,
    textDecoration: 'none',
  },
  headingActive: {
    color: contactListTheme.palette.primary.main,
  },
}));

const Heading = ({ text, path }) => {
  const location = useLocation();
  const classes = useStyles();

  const checkCurrentPath = (path) =>
    path === location.pathname ? classes.headingActive : null;

  return path ? (
    <Typography
      component={RouterLink}
      to={path}
      variant="h6"
      noWrap
      className={`${classes.headingLabel} ${checkCurrentPath(path)}`}
    >
      {text}
    </Typography>
  ) : (
    <Typography variant="h6" noWrap className={classes.headingLabel}>
      {text}
    </Typography>
  );
};

export default Heading;
