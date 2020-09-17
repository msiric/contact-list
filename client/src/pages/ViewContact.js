import { Container, Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Avatar from '../components/Avatar/Avatar.js';
import BackButton from '../components/BackButton/BackButton';
import EditButton from '../components/EditButton/EditButton';
import FavoriteButton from '../components/FavoriteButton/FavoriteButton';
import Spinner from '../components/Spinner/Spinner.js';
import { minTabletWidth } from '../constants/breakpoints.js';
import { contactListTheme } from '../constants/theme.js';
import ContactHeaderDesktop from '../containers/ContactHeader/ContactHeaderDesktop.js';
import ContactHeaderMobile from '../containers/ContactHeader/ContactHeaderMobile.js';
import ContactInfo from '../containers/ContactInfo/ContactInfo.js';
import { Context } from '../context/Store.js';
import { getContact } from '../services/contact.js';

const useStyles = makeStyles((theme) => ({
  viewContactContainer: {
    display: 'flex',
  },
  viewContactGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
  viewContactAvatar__Desktop: {
    width: 180,
    height: 180,
  },
  viewContactAvatar__Mobile: {
    width: 70,
    height: 70,
    [theme.breakpoints.down(contactListTheme.breakpoints.xs)]: {
      width: 50,
      height: 50,
    },
  },
  viewContactName__Desktop: {
    marginLeft: 10,
  },
  viewContactName__Mobile: {
    marginLeft: 10,
    [theme.breakpoints.down(contactListTheme.breakpoints.sm)]: {
      fontSize: 24,
    },
  },
  viewContactDivider: {
    background: contactListTheme.palette.primary.main,
  },
}));

const ViewContact = ({ match }) => {
  const [state, setState] = useState({
    loading: true,
    contact: {},
    photo: {},
  });
  const [store, dispatch] = useContext(Context);

  const { enqueueSnackbar } = useSnackbar();
  const isTablet = useMediaQuery({ query: minTabletWidth });

  const classes = useStyles();

  const fetchContact = async () => {
    try {
      const { data } = await getContact.request({ contactId: match.params.id });
      setState({
        ...state,
        loading: false,
        contact: data.contact,
        photo: data.photo,
      });
    } catch (err) {
      enqueueSnackbar(getContact.error.message, {
        variant: getContact.error.variant,
      });
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return state.loading ? (
    <Spinner />
  ) : (
    <Container className={classes.viewContactContainer}>
      {!isTablet && (
        <Grid item sm={12} md={3} className={classes.viewContactGrid}>
          <Avatar
            alt={state.contact.name}
            src={`data:${state.photo.type};base64,${state.photo.base64}`}
            className={classes.viewContactAvatar__Desktop}
          />
        </Grid>
      )}
      <Grid item sm={12} md={9}>
        {!isTablet ? (
          <ContactHeaderDesktop
            contact={state.contact}
            startItems={[
              <BackButton />,
              <Typography
                variant="h4"
                className={classes.viewContactName__Desktop}
                noWrap
              >
                {state.contact.name}
              </Typography>,
            ]}
            endItems={[
              <FavoriteButton contact={state.contact} />,
              <EditButton contact={state.contact} />,
            ]}
          />
        ) : (
          <ContactHeaderMobile
            contact={state.contact}
            photo={state.photo}
            startItems={[<BackButton />]}
            endItems={[
              <FavoriteButton contact={state.contact} />,
              <EditButton contact={state.contact} />,
            ]}
            bottomItems={[
              <Avatar
                alt={state.contact.name}
                src={`data:${state.photo.type};base64,${state.photo.base64}`}
                className={classes.viewContactAvatar__Mobile}
              />,
              <Typography
                variant="h4"
                className={classes.viewContactName__Mobile}
                noWrap
              >
                {state.contact.name}
              </Typography>,
            ]}
          />
        )}
        <Divider className={classes.viewContactDivider} />
        <ContactInfo contact={state.contact} />
      </Grid>
    </Container>
  );
};

export default ViewContact;
