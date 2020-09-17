import createError from 'http-errors';
import {
  addNewContact,
  addNewFavorite,
  editExistingContact,
  fetchAllContacts,
  fetchExistingContact,
  fetchExistingUser,
  removeExistingContact,
  removeExistingFavorite,
} from '../services/contact.js';
import {
  deleteSinglePhoto,
  fetchMultiplePhotos,
  fetchSinglePhoto,
} from '../services/upload.js';
import { sanitizeData } from '../utils/helpers.js';
import { contactValidation } from '../validation/validation.js';

export const getContacts = async () => {
  const foundContacts = await fetchAllContacts();
  const foundPhotos = await fetchMultiplePhotos({
    photos: foundContacts.map((contact) => contact.photo),
  });
  return { contacts: foundContacts, photos: foundPhotos };
};

export const postContact = async (...args) => {
  const { body } = { ...args[0] };
  const { error } = contactValidation.validate(sanitizeData(body));
  if (error) throw createError(400, error);
  const createdContact = await addNewContact(...args);
  return { contact: createdContact };
};

export const getContact = async (...args) => {
  const foundContact = await fetchExistingContact(...args);
  const foundPhoto = await fetchSinglePhoto({
    photo: foundContact.photo,
  });
  return { contact: foundContact, photo: foundPhoto };
};

export const patchContact = async (...args) => {
  const { body } = { ...args[0] };
  const { error } = contactValidation.validate(sanitizeData(body));
  if (error) throw createError(400, error);
  const foundContact = await fetchExistingContact(...args);
  await deleteSinglePhoto({ photo: foundContact.photo });
  const modifiedContact = await editExistingContact(...args);
  return { contact: modifiedContact };
};

export const deleteContact = async (...args) => {
  const foundContact = await fetchExistingContact(...args);
  await deleteSinglePhoto({ photo: foundContact.photo });
  const erasedContact = await removeExistingContact(...args);
  await removeExistingFavorite({
    parameters: { favoriteId: foundContact._id },
  });
  return { contact: erasedContact };
};

export const getFavorites = async () => {
  const foundUser = await fetchExistingUser();
  const foundPhotos = await fetchMultiplePhotos({
    photos: foundUser.favorites.map((favorite) => favorite.photo),
  });
  return { favorites: foundUser.favorites, photos: foundPhotos };
};

export const postFavorite = async (...args) => {
  const createdFavorite = await addNewFavorite(...args);
  return { favorite: createdFavorite };
};

export const deleteFavorite = async (...args) => {
  const erasedFavorite = await removeExistingFavorite(...args);
  return { favorite: erasedFavorite };
};
