import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  Clear as ClearIcon,
  Error as ErrorIcon,
  Publish as UploadIcon,
} from '@material-ui/icons';
import React, { createRef, useEffect, useState } from 'react';
import { contactListTheme } from '../../constants/theme.js';

const useStyles = makeStyles((theme) => ({
  imageInputFile: { display: 'none' },
  imageInputContainer: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageInputTitle: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
  imageInputAvatar: {
    margin: 'auto',
    width: 160,
    height: 160,
    borderColor: contactListTheme.palette.secondary.main,
    borderStyle: 'solid',
    borderSize: '1px',
    '&:hover': {
      '& $overlayRemove': {
        opacity: 1,
      },
    },
  },
  imageInputPreview: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  imageInputLoading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    opacity: 1,
    transition: '.5s ease',
    backgroundColor: contactListTheme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageInputUpload: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    opacity: 1,
    transition: '.5s ease',
    backgroundColor: contactListTheme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageInputRemove: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    opacity: 0,
    transition: '.5s ease',
    backgroundColor: contactListTheme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageInputError: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    opacity: 1,
    transition: '.5s ease',
    backgroundColor: theme.palette.error.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageInputText: {
    marginTop: 3,
  },
  imageInputIcon: {
    color: 'white',
  },
}));

const ImageInput = ({
  field,
  setFieldValue,
  setFieldTouched,
  error,
  helperText,
  title,
  preview,
}) => {
  const [state, setState] = useState({
    loading: false,
    file: null,
    imagePreviewUrl: null,
  });
  const fileUpload = createRef();

  const classes = useStyles();

  useEffect(() => {
    if (preview && !state.imagePreviewUrl)
      setState((prevState) => ({
        ...prevState,
        file: preview,
        imagePreviewUrl: `data:${preview.type};base64,${preview.base64}`,
      }));
  }, []);

  const showFileUpload = (e) => {
    if (!error && state.file) {
      setFieldValue(field.name, null);
      setState((prevState) => ({ ...prevState, file: null }));
    } else if (fileUpload) {
      fileUpload.current.value = null;
      fileUpload.current.click();
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setState({
          loading: false,
          file: file,
          imagePreviewUrl: reader.result,
        });
        setFieldValue(field.name, file);
        setFieldTouched(field.name, true);
      };
    }
  };

  return (
    <Box className={classes.imageInputContainer}>
      <input
        className={classes.imageInputFile}
        id={field.name}
        name={field.name}
        type="file"
        onChange={handleImageChange}
        ref={fileUpload}
      />
      <Typography className={classes.imageInputTitle} variant="h5" noWrap>
        {title}
      </Typography>
      <Avatar className={classes.imageInputAvatar} onClick={showFileUpload}>
        {state.loading ? (
          <Box className={classes.imageInputLoading}>
            <CircularProgress color="white" />
          </Box>
        ) : error ? (
          <Box className={classes.imageInputError}>
            <IconButton disableRipple className={classes.imageInputIcon}>
              <ErrorIcon fontSize="large" />
            </IconButton>
          </Box>
        ) : state.file ? (
          <Box className={classes.imageInputRemove}>
            <IconButton disableRipple className={classes.imageInputIcon}>
              <ClearIcon fontSize="large" />
            </IconButton>
          </Box>
        ) : (
          <Box className={classes.imageInputUpload}>
            <IconButton disableRipple className={classes.imageInputIcon}>
              <UploadIcon fontSize="large" />
            </IconButton>
          </Box>
        )}
        {state.file && (
          <img
            className={classes.imageInputPreview}
            src={state.imagePreviewUrl}
            alt="..."
          />
        )}
      </Avatar>

      {error ? (
        <Typography
          variant="caption"
          color="error"
          noWrap
          className={classes.imageInputText}
        >
          {helperText}
        </Typography>
      ) : null}
    </Box>
  );
};

export default ImageInput;
