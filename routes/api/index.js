import express from 'express';
import createError from 'http-errors';
import contact from './routers/contact.js';

const router = express.Router();

router.use('/', contact);

router.use((req, res, next) => {
  createError(404);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ status_code: err.status || 500, error: err.message });
});

export default router;
