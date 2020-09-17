import { createMuiTheme } from '@material-ui/core/styles';

export const contactListTheme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen-Sans',
      'Ubuntu',
      'Cantarell',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 14,
  },
  palette: {
    primary: { main: '#2da1ad' },
    secondary: { main: '#abd9de' },
    success: { main: '#2da1ad' },
    warning: { main: '#bbc4c3' },
    text: {
      primary: '#bbc4c3',
      secondary: '#2da1ad',
    },
  },
  padding: {
    container: 20,
  },
  margin: {
    container: 20,
  },
  breakpoints: {
    xs: 380,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
});

contactListTheme.overrides.MuiSvgIcon = {
  fontSizeSmall: {
    fontSize: 18,
  },
};

contactListTheme.overrides.MuiFormHelperText = {
  contained: {
    marginLeft: 0,
    marginRight: 0,
  },
};

contactListTheme.overrides.MuiCardContent = {
  root: {
    '&:last-child': {
      paddingBottom: 16,
    },
  },
};

contactListTheme.overrides.MuiDialog = {
  paperWidthSm: {
    padding: 16,
    width: '100%',
    maxWidth: 450,
  },
};

contactListTheme.overrides.MuiGrid = {
  item: {
    width: '100%',
  },
};
