import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { contactListTheme } from '../../constants/theme.js';
import { Context } from '../../context/Store.js';
import DeleteButton from '../DeleteButton/DeleteButton.js';
import EditButton from '../EditButton/EditButton.js';
import FavoriteButton from '../FavoriteButton/FavoriteButton.js';

const useStyles = makeStyles((theme) => ({
  contactWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 500,
  },
  contactCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 20,
    width: '100%',
    minWidth: 200,
    border: `2px solid ${contactListTheme.palette.warning.main}`,
    textDecoration: 'none',
    boxShadow: 'none',
    '& hover': {
      border: '3px solid',
    },
  },
  contactActions: {
    width: '100%',
    padding: '0 8px',
  },
  contactContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    marginTop: -20,
    width: '100%',
  },
  contactMedia: {
    marginBottom: 10,
    display: 'inline-block',
    width: 60,
    height: 60,
    backgroundPosition: '50% 50%',
    backgroundSize: 'cover',
    borderRadius: '50%',
  },
  contactFavorite: {
    marginRight: 'auto',
  },
  contactName: {
    textAlign: 'center',
    width: '100%',
    color: contactListTheme.palette.text.primary,
  },
}));

const ContactDesktop = ({ contact, photo, handlePopupToggle }) => {
  const [store, dispatch] = useContext(Context);
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      className={classes.contactWrapper}
    >
      <Card className={classes.contactCard}>
        <CardActions disableSpacing className={classes.contactActions}>
          <FavoriteButton
            contact={contact}
            iconStyles={{ marginRight: 'auto' }}
            fontSize="small"
          />
          <EditButton contact={contact} fontSize="small" />
          <DeleteButton
            withText={false}
            contact={contact}
            handlePopupToggle={handlePopupToggle}
            fontSize="small"
          />
        </CardActions>
        <CardContent
          className={classes.contactContent}
          component={RouterLink}
          to={`/contact/${contact._id}`}
        >
          <CardMedia
            className={classes.contactMedia}
            image={`data:${photo.type};base64,${photo.base64}`}
            title={contact.name}
          />
          <Typography variant="h6" className={classes.contactName} noWrap>
            {contact.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ContactDesktop;
