import { Avatar as Photo, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  avatarBox: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Avatar = ({ alt, src, className }) => {
  const classes = useStyles();

  return (
    <Box className={classes.avatarBox}>
      <Photo alt={alt} src={src} className={className} />
    </Box>
  );
};

export default Avatar;
