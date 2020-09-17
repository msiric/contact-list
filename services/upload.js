import mongoose from 'mongoose';
import { bucket } from '../config/constants.js';

let gfs;

mongoose.connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: bucket,
  });
});

export const fetchMultiplePhotos = async ({ photos }) => {
  const contactPhotos = photos.map((photo) => {
    return new Promise(async (resolve, reject) => {
      const data = [];
      const contactPhoto = await gfs
        .find({ _id: mongoose.Types.ObjectId(photo) })
        .toArray();
      const downloadStream = gfs.openDownloadStream(
        mongoose.Types.ObjectId(photo)
      );
      downloadStream.on('data', (chunk) => {
        data.push(chunk);
      });
      downloadStream.on('error', async (error) => {
        reject(error);
      });
      downloadStream.on('end', async () => {
        const bufferBase64 = Buffer.concat(data).toString('base64');
        resolve({
          base64: bufferBase64,
          type: contactPhoto[0].contentType,
        });
      });
    });
  });
  const foundPhotos = await Promise.all(contactPhotos);
  return foundPhotos;
};

export const fetchSinglePhoto = async ({ photo }) => {
  return new Promise(async (resolve, reject) => {
    const data = [];
    const contactPhoto = await gfs
      .find({ _id: mongoose.Types.ObjectId(photo) })
      .toArray();
    const downloadStream = gfs.openDownloadStream(
      mongoose.Types.ObjectId(photo)
    );
    downloadStream.on('data', (chunk) => {
      data.push(chunk);
    });
    downloadStream.on('error', async (error) => {
      reject(error);
    });
    downloadStream.on('end', async () => {
      const bufferBase64 = Buffer.concat(data).toString('base64');
      resolve({ base64: bufferBase64, type: contactPhoto[0].contentType });
    });
  });
};

export const deleteSinglePhoto = async ({ photo }) => {
  return await gfs.delete(mongoose.Types.ObjectId(photo));
};
