import * as initYup from 'yup';

const yup = initYup.default;

export const contactValidation = yup.object().shape({
  contactName: yup.string().trim().required('Name is required'),
  contactEmail: yup
    .string()
    .email('Email needs to be valid')
    .trim()
    .required('Email is required'),
  contactNumbers: yup.string().trim().required('Email is required'),
});
