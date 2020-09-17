import { Field } from 'formik';
import React from 'react';
import ImageInput from '../../components/ImageInput/ImageInput.js';

const ContactAvatar = ({ preview }) => {
  return (
    <Field name="contactPhoto">
      {({
        field,
        form: { touched, errors, setFieldValue, setFieldTouched },
        meta,
      }) => (
        <ImageInput
          meta={meta}
          field={field}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          helperText={meta.touched && meta.error}
          error={meta.touched && Boolean(meta.error)}
          preview={preview}
        />
      )}
    </Field>
  );
};

export default ContactAvatar;
