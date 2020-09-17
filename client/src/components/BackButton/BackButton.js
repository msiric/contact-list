import { Box, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack as BackIcon } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { contactListTheme } from '../../constants/theme.js';

const useStyles = makeStyles((theme) => ({
  backButtonIcon: {
    color: contactListTheme.palette.text.primary,
  },
}));

const BackButton = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box>
      <IconButton aria-label="Back" onClick={history.goBack}>
        <BackIcon className={classes.backButtonIcon} />
      </IconButton>
    </Box>
  );
};

export default BackButton;
