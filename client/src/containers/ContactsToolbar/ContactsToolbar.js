import { Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Heading from '../../components/Heading/Heading.js';
import { contactListTheme } from '../../constants/theme.js';

const useStyles = makeStyles((theme) => ({
  contactsToolbarContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  contactsToolbarBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-6vh',
    [theme.breakpoints.down(contactListTheme.breakpoints.md)]: {
      marginTop: 0,
    },
  },
  contactsToolbarVertical: {
    background: '#BBC4C3',
    height: 18,
    alignSelf: 'center',
  },
  contactsToolbarHorizontal: {
    width: '100%',
    maxWidth: '90%',
    backgroundColor: '#45ACB7',
    height: 1.5,
  },
}));

const ContactsToolbar = ({ headings }) => {
  const classes = useStyles();

  return (
    <Box position="static" className={classes.contactsToolbarContainer}>
      <Box className={classes.contactsToolbarBox}>
        {headings.map((heading, index) => [
          <Heading
            key={`heading.${index}`}
            path={heading.path}
            text={heading.text}
          />,
          index !== headings.length - 1 && (
            <Divider
              key={`divider.${index}`}
              className={classes.contactsToolbarVertical}
              orientation="vertical"
              flexItem
            />
          ),
        ])}
      </Box>
      <Divider className={classes.contactsToolbarHorizontal} />
    </Box>
  );
};

export default ContactsToolbar;
