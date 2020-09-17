import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import ContactPopup from '../components/ContactPopup/ContactPopup.js';
import Spinner from '../components/Spinner/Spinner.js';
import { minMobileWidth } from '../constants/breakpoints.js';
import ContactsGallery from '../containers/ContactsGallery/ContactsGallery.js';
import Search from '../containers/ContactsSearch/ContactsSearch.js';
import Toolbar from '../containers/ContactsToolbar/ContactsToolbar.js';
import { deleteContact, getFavorites } from '../services/contact.js';

const useStyles = makeStyles(() => ({
  favoriteContactsItem: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const FavoriteContacts = () => {
  const [state, setState] = useState({
    loading: true,
    query: '',
    favorites: [],
    popup: { open: false, contact: null },
  });

  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useMediaQuery({ query: minMobileWidth });
  const classes = useStyles();

  const fetchFavorites = async () => {
    try {
      const { data } = await getFavorites.request();
      const formattedFavorites = data.favorites.map((favorite, index) => ({
        ...favorite,
        photo: data.photos[index],
      }));
      setState({
        ...state,
        loading: false,
        favorites: formattedFavorites,
      });
    } catch (err) {
      enqueueSnackbar(getFavorites.error.message, {
        variant: getFavorites.error.variant,
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
    state.favorites.filter((item) =>
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
        favorites: prevState.favorites.filter(
          (favorite) => favorite._id !== state.popup.contact
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
    fetchFavorites();
  }, []);

  return state.loading ? (
    <Spinner />
  ) : (
    <Grid container>
      <Grid item xs={12} className={classes.favoriteContactsItem}>
        <Toolbar
          headings={[
            { text: 'All contacts', path: '/' },
            { text: 'My favorites', path: '/favorites' },
          ]}
        />
        <Search query={state.query} handleSearchChange={handleSearchChange} />
        <ContactsGallery
          collapse={isMobile ? true : false}
          favorites={true}
          contacts={state.query ? handleFilterData() : state.favorites}
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

export default FavoriteContacts;
