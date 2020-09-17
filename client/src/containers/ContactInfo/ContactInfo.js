import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Email as EmailIcon, Phone as PhoneIcon } from '@material-ui/icons';
import React from 'react';
import Label from '../../components/Label/Label';
import { contactListTheme } from '../../constants/theme';

const useStyles = makeStyles((theme) => ({
  contactInfoBox: {
    display: 'flex',
    padding: 60,
    [theme.breakpoints.down(contactListTheme.breakpoints.xs)]: {
      padding: 30,
    },
  },
  contactInfoItem: {
    display: 'flex',
  },
  contactInfoHeading: {
    marginBottom: 40,
    [theme.breakpoints.down(contactListTheme.breakpoints.md)]: {
      marginBottom: 0,
    },
  },
  contactInfoEmail: {
    marginBottom: 40,
  },
  contactInfoLabel: {
    textTransform: 'uppercase',
    color: contactListTheme.palette.warning.main,
    minWidth: 100,
    width: '25%',
  },
  contactInfoNumber: {
    textDecoration: 'underline',
    color: contactListTheme.palette.warning.main,
    marginBottom: 30,
  },
  contactInfoIcon: {
    marginRight: 10,
  },
}));

const ContactInfo = ({ contact }) => {
  const classes = useStyles();

  return (
    <Box className={classes.contactInfoBox}>
      <Grid container>
        <Grid item xs={12} md={3} className={classes.contactInfoHeading}>
          <Label
            containerStyles={{ marginBottom: 20 }}
            icon={
              <EmailIcon
                color="primary"
                fontSize="small"
                className={classes.contactInfoIcon}
              />
            }
            text={<Typography color="primary">email</Typography>}
            rtl={false}
          />
        </Grid>
        <Grid item xs={12} md={9} className={classes.contactInfoEmail}>
          <Typography noWrap>{contact.email}</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Label
            containerStyles={{ marginBottom: 20 }}
            icon={
              <PhoneIcon
                color="primary"
                fontSize="small"
                className={classes.contactInfoIcon}
              />
            }
            text={<Typography color="primary">numbers</Typography>}
            rtl={false}
          />
        </Grid>
        {contact.numbers &&
          contact.numbers.map((item, index) =>
            index !== 0 ? (
              [
                <Grid key={`leftGrid.${index}`} item xs={12} md={3}></Grid>,
                <Grid
                  key={`rightGrid.${index}`}
                  item
                  xs={12}
                  md={9}
                  className={classes.contactInfoItem}
                >
                  <Typography noWrap className={classes.contactInfoLabel}>
                    {item.label}
                  </Typography>
                  <Typography noWrap className={classes.contactInfoNumber}>
                    {item.number}
                  </Typography>
                </Grid>,
              ]
            ) : (
              <Grid
                item
                xs={12}
                md={9}
                key={index}
                className={classes.contactInfoItem}
              >
                <Typography noWrap className={classes.contactInfoLabel}>
                  {item.label}
                </Typography>
                <Typography noWrap className={classes.contactInfoNumber}>
                  {item.number}
                </Typography>
              </Grid>
            )
          )}
      </Grid>
    </Box>
  );
};

export default ContactInfo;
