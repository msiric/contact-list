import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit as EditIcon } from '@material-ui/icons';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { contactListTheme } from '../../constants/theme';

const useStyles = makeStyles((theme) => ({
  editButtonIcon: {
    color: contactListTheme.palette.text.primary,
  },
}));

const EditButton = ({ contact, fontSize }) => {
  const classes = useStyles();

  return (
    <IconButton
      aria-label="Edit"
      component={RouterLink}
      to={`/edit_contact/${contact._id}`}
    >
      <EditIcon fontSize={fontSize} className={classes.editButtonIcon} />
    </IconButton>
  );
};

export default EditButton;
