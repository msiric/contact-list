import { makeStyles } from '@material-ui/core/styles';
import { contactListTheme } from '../constants/theme.js';

const AppLayoutStyles = makeStyles((theme) => ({
  appRoot: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    height: '100%',
  },
  appContainer: {
    minHeight: 'calc(94vh - 56px)',
    height: '100%',
    width: '100%',
    marginTop: '6vh',
    paddingBottom: '6vh',
    boxSizing: 'border-box',
    display: 'flex',
    [theme.breakpoints.down(contactListTheme.breakpoints.md)]: {
      marginTop: 0,
      minHeight: 'calc(100vh - 56px)',
    },
  },
}));

export default AppLayoutStyles;
