import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';
import { contactListTheme } from '../../constants/theme.js';
import Button from '../Button/Button.js';

const useStyles = makeStyles(() => ({
  contactPopupTitle: {
    padding: '0 0 16px 0',
  },
  contactPopupContent: {
    padding: '40px 24px',
  },
  contactPopupActions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
  },
  contactPopupPrompt: {
    color: contactListTheme.palette.text.primary,
  },
}));

const ContactPopup = ({ open, handlePopupToggle, handlePopupDelete }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={handlePopupToggle}
      aria-labelledby="Delete contact"
    >
      <DialogTitle className={classes.contactPopupTitle}>
        {'Delete'}
      </DialogTitle>
      <Divider />
      <DialogContent className={classes.contactPopupContent}>
        <DialogContentText
          align="center"
          className={classes.contactPopupPrompt}
        >
          Are you sure you want to delete this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.contactPopupActions}>
        <Button
          onClick={handlePopupToggle}
          color={contactListTheme.palette.warning.main}
          text="Cancel"
        />
        <Button
          onClick={handlePopupDelete}
          color={contactListTheme.palette.primary.main}
          text="Delete"
        />
      </DialogActions>
    </Dialog>
  );
};
export default ContactPopup;
