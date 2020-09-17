import axios from 'axios';

export const getContacts = {
  request: async () => await axios.get('/api/contacts'),
  success: { message: 'Contacts successfully fetched', variant: 'success' },
  error: { message: 'Failed to fetch contacts', variant: 'error' },
};
export const postContact = {
  request: async ({ data }) => await axios.post('/api/contacts', data),
  success: { message: 'Contact successfully created', variant: 'success' },
  error: { message: 'Failed to create contact', variant: 'error' },
};
export const getContact = {
  request: async ({ contactId }) =>
    await axios.get(`/api/contacts/${contactId}`),
  success: { message: 'Contact successfully fetched', variant: 'success' },
  error: { message: 'Failed to fetch contact', variant: 'error' },
};
export const patchContact = {
  request: async ({ contactId, data }) =>
    await axios.patch(`/api/contacts/${contactId}`, data),
  success: { message: 'Contact successfully edited', variant: 'success' },
  error: { message: 'Failed to edit contact', variant: 'error' },
};
export const deleteContact = {
  request: async ({ contactId }) =>
    await axios.delete(`/api/contacts/${contactId}`),
  success: { message: 'Contact successfully deleted', variant: 'success' },
  error: { message: 'Failed to delete contact', variant: 'error' },
};
export const getFavorites = {
  request: async () => await axios.get('/api/favorites'),
  success: { message: 'Favorites successfully fetched', variant: 'success' },
  error: { message: 'Failed to fetch favorites', variant: 'error' },
};
export const postFavorite = {
  request: async ({ favoriteId }) =>
    await axios.post(`/api/favorites/${favoriteId}`),
  success: {
    message: 'Contact successfully favorited',
    variant: 'success',
  },
  error: { message: 'Failed to favorite contact', variant: 'error' },
};
export const deleteFavorite = {
  request: async ({ favoriteId }) =>
    await axios.delete(`/api/favorites/${favoriteId}`),
  success: {
    message: 'Contact successfully unfavorited',
    variant: 'success',
  },
  error: {
    message: 'Failed to unfavorite contact',
    variant: 'error',
  },
};
