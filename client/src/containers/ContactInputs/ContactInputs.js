import { Box, Divider, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Email as EmailIcon,
  Person as UserIcon,
  Phone as PhoneIcon,
} from '@material-ui/icons';
import { Field } from 'formik';
import React from 'react';
import Button from '../../components/Button/Button.js';
import Link from '../../components/Link/Link.js';
import NumbersInput from '../../components/NumbersInput/NumbersInput.js';
import { contactListTheme } from '../../constants/theme.js';

const useStyles = makeStyles(() => ({
  contactInputsContainer: {
    marginBottom: 10,
  },
  contactInputsItem: {
    padding: '20px 0',
  },
  contactInputsActions: {
    marginTop: 60,
  },
  contactInputsDivider: {
    backgroundColor: contactListTheme.palette.primary.main,
  },
  contactInputsGrid: {
    marginBottom: 20,
  },
  contactInputsLabel: {
    marginLeft: 10,
  },
}));

const ContactInputs = ({ values }) => {
  const classes = useStyles();

  return (
    <div>
      <div>
        <Divider className={classes.contactInputsDivider} />
        <Grid item xs={12} md={6} className={classes.contactInputsItem}>
          <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.contactInputsContainer}
          >
            <UserIcon
              color="primary"
              fontSize="small"
              className={classes.contactInfoIcon}
            />
            <Typography className={classes.contactInputsLabel} color="primary">
              full name
            </Typography>
          </Grid>
          <Field name="contactName">
            {({ field, form: { touched, errors }, meta }) => (
              <TextField
                {...field}
                type="text"
                placeholder="Full name"
                helperText={meta.touched && meta.error}
                error={meta.touched && Boolean(meta.error)}
                variant="outlined"
                fullWidth
              />
            )}
          </Field>
        </Grid>
        <Divider className={classes.contactInputsDivider} />
        <Grid item xs={12} md={6} className={classes.contactInputsItem}>
          <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.contactInputsGrid}
          >
            <EmailIcon
              color="primary"
              fontSize="small"
              className={classes.contactInfoIcon}
            />
            <Typography className={classes.contactInputsLabel} color="primary">
              email
            </Typography>
          </Grid>
          <Field name="contactEmail">
            {({ field, form: { touched, errors }, meta }) => (
              <TextField
                {...field}
                type="text"
                placeholder="Email"
                helperText={meta.touched && meta.error}
                error={meta.touched && Boolean(meta.error)}
                variant="outlined"
                fullWidth
              />
            )}
          </Field>
        </Grid>
        <Divider className={classes.contactInputsDivider} />
        <Grid item xs={12} className={classes.contactInputsItem}>
          <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.contactInputsGrid}
          >
            <PhoneIcon
              color="primary"
              fontSize="small"
              className={classes.contactInfoIcon}
            />
            <Typography className={classes.contactInputsLabel} color="primary">
              numbers
            </Typography>
          </Grid>
          <NumbersInput values={values} />
        </Grid>
      </div>
      <Box
        className={classes.contactInputsActions}
        display="flex"
        justifyContent="space-between"
      >
        <Link
          path="/"
          color={contactListTheme.palette.warning.main}
          text="Cancel"
        />
        <Button
          type="submit"
          color={contactListTheme.palette.primary.main}
          text="Save"
        />
      </Box>
    </div>
  );
};

export default ContactInputs;
