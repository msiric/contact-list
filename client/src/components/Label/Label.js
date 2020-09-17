import { Grid } from '@material-ui/core';
import React from 'react';

const Label = ({ containerStyles, icon, text, rtl }) => {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      style={{ ...containerStyles }}
    >
      {rtl ? [text, icon] : [icon, text]}
    </Grid>
  );
};

export default Label;
