import React from 'react';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { Admin, defaultTheme } from 'react-admin';
import { authProvider } from './authProvider';
import { dataProvider } from './dataProvider';
import Layout from './Layout';
import japaneseMessages from './i18n/ja';

import {
  unstable_createMuiStrictModeTheme,
  createMuiTheme,
} from '@material-ui/core/styles';

// FIXME MUI bug https://github.com/mui-org/material-ui/issues/13394
const theme =
    process.env.NODE_ENV !== 'production'
        ? unstable_createMuiStrictModeTheme(defaultTheme)
        : createMuiTheme(defaultTheme);

const i18nProvider = polyglotI18nProvider(() => japaneseMessages, 'ja');

const App = () => (
  <Admin i18nProvider={i18nProvider} dataProvider={dataProvider} authProvider={authProvider} theme={theme} layout={Layout}>
  </Admin>
);

export default App;
