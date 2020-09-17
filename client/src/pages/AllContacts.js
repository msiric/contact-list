import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import ContactPopup from '../components/ContactPopup/ContactPopup.js';
import Spinner from '../components/Spinner/Spinner.js';
import { minMobileWidth } from '../constants/breakpoints.js';
import ContactsGallery from '../containers/ContactsGallery/ContactsGallery.js';
import ContactsSearch from '../containers/ContactsSearch/ContactsSearch.js';
import ContactsToolbar from '../containers/ContactsToolbar/ContactsToolbar.js';
import { deleteContact, getContacts } from '../services/contact.js';

const useStyles = makeStyles(() => ({
  allContactsItem: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const AllContacts = () => {
  const [state, setState] = useState({
    loading: true,
    query: '',
    contacts: [],
    popup: { open: false, contact: null },
  });

  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useMediaQuery({ query: minMobileWidth });
  const classes = useStyles();

  const fetchContacts = async () => {
    try {
      const { data } = await getContacts.request();
      const formattedContacts = data.contacts.map((contact, index) => ({
        ...contact,
        photo: data.photos[index],
      }));
      setState({
        ...state,
        loading: false,
        contacts: formattedContacts,
      });
    } catch (err) {
      enqueueSnackbar(getContacts.error.message, {
        variant: getContacts.error.variant,
      });
    }
  };

  const handleSearchChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      query: e.target.value,
    }));
  };

  const handleFilterData = () =>
    state.contacts.filter((item) =>
      item.name.toLowerCase().includes(state.query.toLowerCase())
    );

  const handlePopupToggle = (id) => {
    setState((prevState) => ({
      ...prevState,
      popup: { open: !prevState.popup.open, contact: id },
    }));
  };

  const handlePopupDelete = async () => {
    try {
      await deleteContact.request({ contactId: state.popup.contact });
      setState((prevState) => ({
        ...prevState,
        contacts: prevState.contacts.filter(
          (contact) => contact._id !== state.popup.contact
        ),
        popup: { open: false, contact: null },
      }));
      enqueueSnackbar(deleteContact.success.message, {
        variant: deleteContact.success.variant,
      });
    } catch (err) {
      enqueueSnackbar(deleteContact.error.message, {
        variant: deleteContact.error.variant,
      });
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return state.loading ? (
    <Spinner />
  ) : (
    <Grid container>
      <Grid item xs={12} className={classes.allContactsItem}>
        <ContactsToolbar
          headings={[
            { text: 'All contacts', path: '/' },
            { text: 'My favorites', path: '/favorites' },
          ]}
        />
        <ContactsSearch
          query={state.query}
          handleSearchChange={handleSearchChange}
        />
        <ContactsGallery
          collapse={isMobile ? true : false}
          favorites={false}
          contacts={state.query ? handleFilterData() : state.contacts}
          handlePopupToggle={handlePopupToggle}
        />
      </Grid>
      <ContactPopup
        open={state.popup.open}
        contact={state.popup.contact}
        handlePopupToggle={handlePopupToggle}
        handlePopupDelete={handlePopupDelete}
      />
    </Grid>
  );
};

export default AllContacts;
