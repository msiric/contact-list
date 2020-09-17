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
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    width: '100%',
    margin: '10px 0',
    border: `2px solid ${contactListTheme.palette.warning.main}`,
    textDecoration: 'none',
    boxShadow: 'none',
    '& hover': {
      border: '3px solid',
    },
  },
  contactContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textDecoration: 'none',
    padding: '16px 0 16px 16px',
    flex: 1,
    minWidth: 0,
  },
  contactMedia: {
    display: 'inline-block',
    width: 50,
    height: 50,
    backgroundPosition: '50% 50%',
    backgroundSize: 'cover',
    borderRadius: '50%',
    [theme.breakpoints.down(contactListTheme.breakpoints.xs)]: {
      width: 40,
      height: 40,
    },
  },
  contactName: {
    marginLeft: 30,
    color: contactListTheme.palette.text.primary,
  },
  contactActions: {
    '& button': {
      [theme.breakpoints.down(contactListTheme.breakpoints.xs)]: {
        padding: 0,
      },
    },
  },
}));

const ContactMobile = ({ contact, photo, handlePopupToggle }) => {
  const [store, dispatch] = useContext(Context);
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.contactWrapper}>
      <Card className={classes.contactCard}>
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
          <Typography variant="body2" className={classes.contactName} noWrap>
            {contact.name}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.contactActions}>
          <FavoriteButton contact={contact} fontSize="small" />
          <EditButton contact={contact} fontSize="small" />
          <DeleteButton
            withText={false}
            contact={contact}
            handlePopupToggle={handlePopupToggle}
            fontSize="small"
          />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ContactMobile;
