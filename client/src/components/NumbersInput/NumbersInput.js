import { Button, Grid, IconButton, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon, Clear as ClearIcon } from '@material-ui/icons';
import { Field, FieldArray } from 'formik';
import React from 'react';
import { contactListTheme } from '../../constants/theme.js';

const useStyles = makeStyles((theme) => ({
  numbersInputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  numbersInputEmail: {
    [theme.breakpoints.down(contactListTheme.breakpoints.md)]: {
      marginBottom: 10,
    },
  },
  numbersInputDelete: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numbersInputIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  numbersInputRemove: {
    borderRadius: '50%',
    border: `1px solid ${contactListTheme.palette.warning.main}`,
    height: 30,
    width: 30,
  },
  numbersInputAdd: {
    borderRadius: '50%',
    border: `1px solid ${contactListTheme.palette.primary.main}`,
    height: 30,
    width: 30,
  },
  numbersInputButton: {
    textTransform: 'initial',
    marginTop: 30,
  },
}));

const NumbersInput = ({ values }) => {
  const classes = useStyles();

  return (
    <FieldArray
      name="contactNumbers"
      render={({ push, remove }) => (
        <div>
          {values &&
            values.map((item, index) => (
              <Grid
                key={index}
                container
                className={classes.numbersInputContainer}
              >
                <Grid item xs={12} md={6} className={classes.numbersInputEmail}>
                  <Field name={`contactNumbers.${index}.number`}>
                    {({ field, form: { touched, errors }, meta }) => (
                      <TextField
                        {...field}
                        type="text"
                        placeholder="Number"
                        helperText={meta.touched && meta.error}
                        error={meta.touched && Boolean(meta.error)}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={10} md={4}>
                  <Field name={`contactNumbers.${index}.label`}>
                    {({ field, form: { touched, errors }, meta }) => (
                      <TextField
                        {...field}
                        type="text"
                        placeholder="Label"
                        helperText={meta.touched && meta.error}
                        error={meta.touched && Boolean(meta.error)}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={1} className={classes.numbersInputDelete}>
                  <IconButton
                    disabled={values.length < 2}
                    className={classes.numbersInputRemove}
                    onClick={() => remove(index)}
                  >
                    <ClearIcon className={classes.numbersInputIcon} />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          <Button
            disableRipple
            color="primary"
            className={classes.numbersInputButton}
            startIcon={
              <IconButton className={classes.numbersInputAdd}>
                <AddIcon color="primary" className={classes.numbersInputIcon} />
              </IconButton>
            }
            onClick={() => push({ number: '', label: '' })}
          >
            Add number
          </Button>
        </div>
      )}
    />
  );
};

export default NumbersInput;
