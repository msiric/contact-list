import escapeHTML from 'escape-html';
import createError from 'http-errors';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export const requestHandler = (promise) => async (req, res, next) => {
  const boundParams = {
    query: { ...req.query },
    parameters: { ...req.params },
    body: { ...req.body },
    file: { ...req.file },
  };
  try {
    const result = await promise({ ...boundParams });
    return res.json(result || { message: 'OK' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const checkParamsId = (req, res, next) => {
  const isId = (id) => (ObjectId(id) ? true : false);
  let isValid = true;
  for (let param in req.params) {
    const value = req.params[param];
    if (!value) isValid = false;
    else if (!isId(value)) isValid = false;
  }
  if (isValid) return next();
  throw createError(400, 'Invalid route parameter');
};

export const sanitizeData = (body) =>
  Object.keys(body).reduce((obj, key) => {
    if (Array.isArray(body[key])) {
      obj[key] = body[key].map((elem) => {
        if (typeof elem === 'object') return sanitizeData(elem);
        return escapeHTML(elem);
      });
    } else if (typeof body[key] === 'object') {
      obj[key] = sanitizeData(body[key]);
    } else {
      obj[key] = escapeHTML(body[key]);
    }
    return obj;
  }, {});
