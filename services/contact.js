import { user } from '../config/constants.js';
import Contact from '../models/contact.js';
import User from '../models/user.js';

export const fetchAllContacts = async () => {
  const foundContacts = await Contact.find();
  return foundContacts;
};

export const addNewContact = async ({ body, file }) => {
  const newContact = new Contact();
  newContact.name = body.contactName;
  newContact.email = body.contactEmail;
  newContact.numbers = JSON.parse(body.contactNumbers);
  newContact.photo = file.id;
  const savedContact = await newContact.save();
  return savedContact;
};

export const fetchExistingContact = async ({ parameters }) => {
  const foundContact = await Contact.findOne({ _id: parameters.contactId });
  return foundContact;
};

export const editExistingContact = async ({ parameters, body, file }) => {
  const updatedContact = await Contact.updateOne(
    { _id: parameters.contactId },
    {
      name: body.contactName,
      email: body.contactEmail,
      numbers: JSON.parse(body.contactNumbers),
      photo: file.id,
    }
  );
  return updatedContact;
};

export const removeExistingContact = async ({ parameters }) => {
  const deletedContact = await Contact.deleteOne({
    _id: parameters.contactId,
  });
  return deletedContact;
};

export const fetchExistingUser = async () => {
  const foundUser = await User.findOne({ name: user.name }).populate(
    'favorites'
  );
  return foundUser;
};

export const addNewFavorite = async ({ parameters }) => {
  const updatedUser = await User.updateOne(
    { name: user.name },
    { $addToSet: { favorites: parameters.favoriteId } }
  );
  return updatedUser;
};

export const removeExistingFavorite = async ({ parameters }) => {
  const updatedUser = await User.updateOne(
    { name: user.name },
    { $pull: { favorites: parameters.favoriteId } }
  );
  return updatedUser;
};
