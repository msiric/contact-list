import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import BackButton from '../components/BackButton/BackButton.js';
import ContactPopup from '../components/ContactPopup/ContactPopup.js';
import DeleteButton from '../components/DeleteButton/DeleteButton.js';
import Spinner from '../components/Spinner/Spinner.js';
import { minTabletWidth } from '../constants/breakpoints.js';
import { contactListTheme } from '../constants/theme.js';
import ContactAvatar from '../containers/ContactAvatar/ContactAvatar.js';
import ContactHeaderDesktop from '../containers/ContactHeader/ContactHeaderDesktop.js';
import ContactHeaderMobile from '../containers/ContactHeader/ContactHeaderMobile.js';
import ContactInputs from '../containers/ContactInputs/ContactInputs.js';
import {
  deleteContact,
  getContact,
  patchContact,
} from '../services/contact.js';
import { contactValidation } from '../validation/validation.js';

const useStyles = makeStyles(() => ({
  editContactContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  editContactActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editContactButton: {
    color: contactListTheme.palette.text.primary,
  },
}));

const EditContact = ({ match }) => {
  const [state, setState] = useState({
    loading: true,
    contact: {},
    photo: {},
    popup: { open: false, contact: null },
  });

  const { enqueueSnackbar } = useSnackbar();
  const isTablet = useMediaQuery({ query: minTabletWidth });
  const history = useHistory();
  const classes = useStyles();

  const fetchContact = async () => {
    try {
      const { data } = await getContact.request({ contactId: match.params.id });
      setState({
        ...state,
        loading: false,
        contact: data.contact,
        photo: data.photo,
      });
    } catch (err) {
      enqueueSnackbar(getContact.error.message, {
        variant: getContact.error.variant,
      });
    }
  };

  const convertDataUrlToFile = (dataUrl, filename) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) u8arr[n] = bstr.charCodeAt(n);

    return new File([u8arr], filename, { type: mime });
  };

  const handlePopupToggle = (id) => {
    setState((prevState) => ({
      ...prevState,
      popup: { open: !prevState.popup.open, contact: id },
    }));
  };

  const handlePopupDelete = async () => {
    try {
      await deleteContact.request({ contactId: state.popup.contact });
      history.push('/');
      enqueueSnackbar(deleteContact.success.message, {
        variant: deleteContact.success.variant,
      });
    } catch (err) {
      enqueueSnackbar(deleteContact.error.message, {
        variant: deleteContact.error.variant,
      });
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('contactName', values.contactName);
    formData.append('contactEmail', values.contactEmail);
    formData.append('contactNumbers', JSON.stringify(values.contactNumbers));
    formData.append('contactPhoto', values.contactPhoto);
    try {
      await patchContact.request({
        contactId: state.contact._id,
        data: formData,
      });
      history.push('/');
      enqueueSnackbar(patchContact.success.message, {
        variant: patchContact.success.variant,
      });
    } catch (err) {
      enqueueSnackbar(patchContact.error.message, {
        variant: patchContact.error.variant,
      });
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return state.loading ? (
    <Spinner />
  ) : (
    <Grid container className={classes.contactGrid}>
      <Grid item xs={12} className={classes.contactItem}>
        <Formik
          initialValues={{
            contactName: state.contact._id ? state.contact.name : '',
            contactEmail: state.contact._id ? state.contact.email : '',
            contactNumbers: state.contact._id
              ? state.contact.numbers.map((item) => ({
                  number: item.number,
                  label: item.label,
                }))
              : [{ number: '', label: '' }],
            contactPhoto: state.contact._id
              ? convertDataUrlToFile(
                  `data:${state.photo.type};base64,${state.photo.base64}`,
                  `upload.${state.photo.type.split('/')[1]}`
                )
              : '',
          }}
          enableReinitialize
          validationSchema={contactValidation}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => (
            <Form className={classes.updateEmail}>
              <Container className={classes.editContactContainer}>
                {!isTablet && (
                  <Grid item xs={12} md={3}>
                    <ContactAvatar preview={state.photo} />
                  </Grid>
                )}
                <Grid item xs={12} md={9}>
                  {!isTablet ? (
                    <ContactHeaderDesktop
                      startItems={<BackButton />}
                      endItems={
                        <DeleteButton
                          withText={true}
                          contact={state.contact}
                          handlePopupToggle={handlePopupToggle}
                          fontSize="default"
                        />
                      }
                    />
                  ) : (
                    <ContactHeaderMobile
                      startItems={[<BackButton />]}
                      endItems={
                        <DeleteButton
                          withText={false}
                          contact={state.contact}
                          handlePopupToggle={handlePopupToggle}
                          fontSize="small"
                        />
                      }
                      bottomItems={[<ContactAvatar preview={state.photo} />]}
                    />
                  )}
                  <ContactInputs values={values.contactNumbers} />
                </Grid>
              </Container>
            </Form>
          )}
        </Formik>
      </Grid>
      <ContactPopup
        open={state.popup.open}
        contact={state.popup.contact}
        handlePopupToggle={handlePopupToggle}
        handlePopupDelete={handlePopupDelete}
      />
    </Grid>
  );
};

export default EditContact;
