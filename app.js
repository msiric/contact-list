import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import http from 'http';
import createError from 'http-errors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import { mongo } from './config/secret.js';
import api from './routes/api/index.js';

const app = express();
const __dirname = path.resolve();
http.Server(app);

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));

mongoose.connect(mongo.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use('/api', api);

app.use((req, res, next) => {
  createError(404);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ status_code: err.status || 500, error: err.message });
});

export default app;
