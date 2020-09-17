import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Favorite as FavoritedIcon,
  FavoriteBorder as FavoriteIcon,
} from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react';
import { contactListTheme } from '../../constants/theme.js';
import { Context } from '../../context/Store.js';
import { deleteFavorite, postFavorite } from '../../services/contact.js';

const useStyles = makeStyles((theme) => ({
  favoriteButtonIcon: {
    color: contactListTheme.palette.text.primary,
  },
}));

const FavoriteButton = ({ contact, fontSize, iconStyles }) => {
  const [store, dispatch] = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const handleFavoriteClick = async (id) => {
    try {
      if (store[id]) {
        await deleteFavorite.request({ favoriteId: id });
        dispatch({
          type: 'removeFavorite',
          favorite: id,
        });
        enqueueSnackbar(deleteFavorite.success.message, {
          variant: deleteFavorite.success.variant,
        });
      } else {
        await postFavorite.request({ favoriteId: id });
        dispatch({
          type: 'addFavorite',
          favorite: id,
        });
        enqueueSnackbar(postFavorite.success.message, {
          variant: postFavorite.success.variant,
        });
      }
    } catch (err) {
      if (store[id]) {
        enqueueSnackbar(deleteFavorite.error.message, {
          variant: deleteFavorite.error.variant,
        });
      } else {
        enqueueSnackbar(postFavorite.error.message, {
          variant: postFavorite.error.variant,
        });
      }
    }
  };

  return (
    <IconButton
      aria-label={store[contact._id.toString()] ? 'Unfavorite' : 'Favorite'}
      onClick={() => handleFavoriteClick(contact._id)}
      style={iconStyles}
    >
      {store[contact._id.toString()] ? (
        <FavoritedIcon
          fontSize={fontSize}
          className={classes.favoriteButtonIcon}
        />
      ) : (
        <FavoriteIcon
          fontSize={fontSize}
          className={classes.favoriteButtonIcon}
        />
      )}
    </IconButton>
  );
};

export default FavoriteButton;
