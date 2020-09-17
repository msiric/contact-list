import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ContactDesktop from '../../components/Contact/ContactDesktop.js';
import ContactMobile from '../../components/Contact/ContactMobile.js';
import NewContactDesktop from '../../components/NewContact/NewContactDesktop.js';
import NewContactMobile from '../../components/NewContact/NewContactMobile.js';

const useStyles = makeStyles(() => ({
  contactsGalleryBox__Desktop: {
    display: 'flex',
    width: '90%',
    alignSelf: 'center',
  },
  contactsGalleryBox__Mobile: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
  },
}));

const ContactsGallery = ({
  collapse,
  favorites,
  contacts,
  handlePopupToggle,
  handlePopupDelete,
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={
        !collapse
          ? classes.contactsGalleryBox__Desktop
          : classes.contactsGalleryBox__Mobile
      }
    >
      {!favorites ? (
        !collapse ? (
          <NewContactDesktop />
        ) : (
          <NewContactMobile />
        )
      ) : null}
      {!collapse
        ? contacts.map((contact, index) => (
            <ContactDesktop
              key={index}
              contact={contact}
              photo={contact.photo}
              handlePopupToggle={handlePopupToggle}
              handlePopupDelete={handlePopupDelete}
            />
          ))
        : contacts.map((contact, index) => (
            <ContactMobile
              key={index}
              contact={contact}
              photo={contact.photo}
              handlePopupToggle={handlePopupToggle}
              handlePopupDelete={handlePopupDelete}
            />
          ))}
    </Grid>
  );
};

export default ContactsGallery;
