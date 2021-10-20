import React from 'react';
import { Admin, Resource, ListGuesser, defaultTheme } from 'react-admin';
import { authProvider } from './authProvider';
import { dataProvider } from './dataProvider';
import Layout from './Layout';

import {
  unstable_createMuiStrictModeTheme,
  createMuiTheme,
} from '@material-ui/core/styles';

// FIXME MUI bug https://github.com/mui-org/material-ui/issues/13394
const theme =
    process.env.NODE_ENV !== 'production'
        ? unstable_createMuiStrictModeTheme(defaultTheme)
        : createMuiTheme(defaultTheme);

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} theme={theme} layout={Layout}>
  </Admin>
);

export default App;
