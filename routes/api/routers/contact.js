import express from 'express';
import {
  deleteContact,
  deleteFavorite,
  getContact,
  getContacts,
  getFavorites,
  patchContact,
  postContact,
  postFavorite,
} from '../../../controllers/contact.js';
import {
  checkParamsId,
  requestHandler as handler,
} from '../../../utils/helpers.js';
import { upload } from '../../../utils/upload.js';

const router = express.Router();

router
  .route('/contacts')
  .get(handler(getContacts))
  .post(upload.single('contactPhoto'), handler(postContact));

router
  .route('/contacts/:contactId')
  .get(checkParamsId, handler(getContact))
  .patch([checkParamsId, upload.single('contactPhoto')], handler(patchContact))
  .delete([checkParamsId, handler(deleteContact)]);

router.route('/favorites').get(handler(getFavorites));

router
  .route('/favorites/:favoriteId')
  .post(checkParamsId, handler(postFavorite))
  .delete(checkParamsId, handler(deleteFavorite));

export default router;
