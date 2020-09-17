import { Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  contactHeaderBox: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
    paddingTop: 10,
  },
  contactHeaderUp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactHeaderDivider: {
    margin: '0 -16px',
  },
  contactHeaderLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  contactHeaderRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
}));

const ContactHeaderMobile = ({ startItems, endItems, bottomItems }) => {
  const classes = useStyles();

  return (
    <Box className={classes.contactHeaderBox}>
      <Box className={classes.contactHeaderUp}>
        <Box>{startItems}</Box>
        <Box>{endItems}</Box>
      </Box>
      <Divider className={classes.contactHeaderDivider} />
      <Box
        className={
          bottomItems.length > 1
            ? classes.contactHeaderLeft
            : classes.contactHeaderRight
        }
      >
        {bottomItems}
      </Box>
    </Box>
  );
};

export default ContactHeaderMobile;
