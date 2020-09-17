import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import BackButton from '../components/BackButton/BackButton';
import { minTabletWidth } from '../constants/breakpoints.js';
import ContactAvatar from '../containers/ContactAvatar/ContactAvatar.js';
import ContactHeaderDesktop from '../containers/ContactHeader/ContactHeaderDesktop.js';
import ContactHeaderMobile from '../containers/ContactHeader/ContactHeaderMobile.js';
import ContactInfoInputs from '../containers/ContactInputs/ContactInputs.js';
import { postContact } from '../services/contact.js';
import { contactValidation } from '../validation/validation.js';

const useStyles = makeStyles(() => ({
  addContactContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const AddContact = () => {
  const { enqueueSnackbar } = useSnackbar();
  const isTablet = useMediaQuery({ query: minTabletWidth });
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('contactName', values.contactName);
    formData.append('contactEmail', values.contactEmail);
    formData.append('contactNumbers', JSON.stringify(values.contactNumbers));
    formData.append('contactPhoto', values.contactPhoto);
    try {
      await postContact.request({ data: formData });
      history.push('/');
      enqueueSnackbar(postContact.success.message, {
        variant: postContact.success.variant,
      });
    } catch (err) {
      enqueueSnackbar(postContact.error.message, {
        variant: postContact.error.variant,
      });
    }
  };

  return (
    <Grid container className={classes.contactGrid}>
      <Grid item xs={12} className={classes.contactItem}>
        <Formik
          initialValues={{
            contactName: '',
            contactEmail: '',
            contactNumbers: [{ number: '', label: '' }],
            contactPhoto: '',
          }}
          enableReinitialize
          validationSchema={contactValidation}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => (
            <Form className={classes.updateEmail}>
              <Container className={classes.addContactContainer}>
                {!isTablet && (
                  <Grid item xs={12} md={3}>
                    <ContactAvatar preview={false} />
                  </Grid>
                )}
                <Grid item xs={12} md={9}>
                  {!isTablet ? (
                    <ContactHeaderDesktop
                      startItems={<BackButton />}
                      endItems={null}
                    />
                  ) : (
                    <ContactHeaderMobile
                      startItems={[<BackButton />]}
                      endItems={null}
                      bottomItems={[<ContactAvatar preview={false} />]}
                    />
                  )}
                  <ContactInfoInputs values={values.contactNumbers} />
                </Grid>
              </Container>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AddContact;
