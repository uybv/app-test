import React from 'react';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { Admin, Resource, defaultTheme } from 'react-admin';
import { authProvider } from './authProvider';
import { dataProvider } from './dataProvider';
import { Login, Layout } from './layout/index';
import { Dashboard } from './dashboard';
import japaneseMessages from './i18n/ja';
import order from './order';
import user from './user';
import product from './product';
import category from './category';
import branch from './branch';
import tax from './tax';
import news from './news';
import staff from './staff';
import slide from './slide';

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
  <Admin
    i18nProvider={i18nProvider}
    dataProvider={dataProvider}
    authProvider={authProvider}
    theme={theme}
    layout={Layout}
    loginPage={Login}
    dashboard={Dashboard}
  >
    <Resource name="order" {...order} />
    <Resource name="user" {...user} />
    <Resource name="product" {...product} />
    <Resource name="category" {...category} />
    <Resource name="branch" {...branch} />
    <Resource name="tax" {...tax} />
    <Resource name="news" {...news} />
    <Resource name="slide" {...slide} />
    <Resource name="staff" {...staff} />
  </Admin>
);

export default App;
