import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Spinner from './components/Spinner/Spinner.js';
import { contactListTheme } from './constants/theme.js';
import { Context } from './context/Store.js';
import AppLayout from './layouts/AppLayout.js';
import { getFavorites } from './services/contact.js';

const routes = [
  {
    path: ['/', '/contacts'],
    Component: lazy(() => import('./pages/AllContacts')),
    exact: true,
  },
  {
    path: '/contact/:id',
    Component: lazy(() => import('./pages/ViewContact')),
    exact: true,
  },
  {
    path: '/add_contact',
    Component: lazy(() => import('./pages/AddContact')),
    exact: true,
  },
  {
    path: '/edit_contact/:id',
    Component: lazy(() => import('./pages/EditContact')),
    exact: true,
  },
  {
    path: '/favorites',
    Component: lazy(() => import('./pages/FavoriteContacts')),
    exact: true,
  },
];

const AppRoute = ({ component: Component, error, ...rest }) => {
  const { enqueueSnackbar } = useSnackbar();

  if (error)
    enqueueSnackbar(error, {
      variant: 'error',
    });

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <AppLayout>
            <Suspense fallback={null}>
              <Component {...props} />
            </Suspense>
          </AppLayout>
        );
      }}
    />
  );
};

const App = () => {
  const [state, setState] = useState({ loading: true, error: '' });
  const [store, dispatch] = useContext(Context);

  const fetchFavorites = async () => {
    try {
      const { data } = await getFavorites.request();
      const formattedFavorites = {};
      for (let favorite of data.favorites) {
        formattedFavorites[favorite._id] = true;
      }
      dispatch({
        type: 'setFavorites',
        favorites: formattedFavorites,
      });
      setState({ ...state, loading: false, error: '' });
    } catch (err) {
      setState({ ...state, loading: false, error: getFavorites.error.message });
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return state.loading ? (
    <Spinner />
  ) : (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider
        theme={{
          ...contactListTheme,
        }}
      >
        <CssBaseline />
        <BrowserRouter>
          <Route
            render={(route) => {
              const { location } = route;
              return (
                <Switch location={location}>
                  {routes.map(({ path, Component, exact }) => (
                    <AppRoute
                      path={path}
                      key={path}
                      exact={exact}
                      component={Component}
                      error={state.error}
                    />
                  ))}
                  <Redirect to="/404" />
                </Switch>
              );
            }}
          />
        </BrowserRouter>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default App;
