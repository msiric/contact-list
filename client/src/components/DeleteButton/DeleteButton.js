import { Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React from 'react';
import { contactListTheme } from '../../constants/theme';

const useStyles = makeStyles((theme) => ({
  deleteButtonControl: {
    textTransform: 'initial',
  },
  deleteButtonIcon: {
    color: contactListTheme.palette.text.primary,
  },
}));

const DeleteButton = ({ contact, handlePopupToggle, fontSize, withText }) => {
  const classes = useStyles();

  return withText ? (
    <Button
      disableRipple
      className={classes.deleteButtonControl}
      onClick={() => handlePopupToggle(contact._id)}
    >
      Delete{' '}
      <IconButton>
        <DeleteIcon className={classes.deleteButtonIcon} fontSize={fontSize} />
      </IconButton>
    </Button>
  ) : (
    <IconButton
      aria-label="Delete"
      onClick={() => handlePopupToggle(contact._id)}
    >
      <DeleteIcon fontSize={fontSize} className={classes.deleteButtonIcon} />
    </IconButton>
  );
};

export default DeleteButton;
