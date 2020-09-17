import * as yup from 'yup';
import { upload } from '../../../common/constants.js';

export const contactValidation = yup.object().shape({
  contactName: yup.string().trim().required('Name is required'),
  contactEmail: yup
    .string()
    .email('Email needs to be valid')
    .trim()
    .required('Email is required'),
  contactNumbers: yup
    .array()
    .of(
      yup.object().shape({
        number: yup
          .string()
          .matches(/^[0-9]*$/, 'Number needs to be valid')
          .required('Number is required'),
        label: yup.string().trim().required('Label is required'),
      })
    )
    .required('At least one number is required'),
  contactPhoto: yup
    .mixed()
    .required('Photo is required')
    .test(
      'fileSize',
      'File too large',
      (value) => value && value.size <= upload.contact.fileSize
    )
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) => value && upload.contact.mimeTypes.includes(value.type)
    ),
});
