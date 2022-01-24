import * as React from 'react';
import { useSelector } from 'react-redux';
import { Layout, LayoutProps } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';
import { lightTheme } from './themes';
import { AppState } from '../types';

export default (props: LayoutProps) => {
    const theme = useSelector((state: AppState) =>
        state.theme === 'dark' ? lightTheme : lightTheme
    );
    return <Layout {...props} appBar={AppBar} menu={Menu} theme={theme} />;
};
