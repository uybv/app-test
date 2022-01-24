import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
    ReduxState,
    usePermissions
} from 'react-admin';
import { AppState } from '../types';
import order from '../order';
import user from '../user';
import product from '../product';
import category from '../category';
import branch from '../branch';
import tax from '../tax';
import news from '../news';
import staff from '../staff';
import slide from '../slide';
import SubMenu from './SubMenu';

type MenuName = 'menuCatalog' | 'menuSales' | 'menuUsers';

const Menu = ({ dense = false }: MenuProps) => {
    const [state, setState] = useState({
        menuCatalog: true,
        menuSales: true,
        menuUsers: true,
    });
    const translate = useTranslate();
    const open = useSelector((state: ReduxState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change
    const classes = useStyles();
    const { permissions } = usePermissions();

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.open]: open,
                [classes.closed]: !open,
            })}
        >
            {' '}
            <DashboardMenuItem />
            <MenuItemLink
                to={{
                    pathname: '/order',
                    state: { _scrollToTop: true },
                }}
                primaryText={translate(`resources.order.name`, {
                    smart_count: 2,
                })}
                leftIcon={<order.icon />}
                dense={dense}
            />
            <MenuItemLink
                to={{
                    pathname: '/user',
                    state: { _scrollToTop: true },
                }}
                primaryText={translate(`resources.user.name`, {
                    smart_count: 2,
                })}
                leftIcon={<user.icon />}
                dense={dense}
            />
            {permissions === 'admin' && (
                <>
                    <MenuItemLink
                        to={{
                            pathname: '/news',
                            state: { _scrollToTop: true },
                        }}
                        primaryText={translate(`resources.news.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<news.icon />}
                        dense={dense}
                    />
                    <MenuItemLink
                        to={{
                            pathname: '/slide',
                            state: { _scrollToTop: true },
                        }}
                        primaryText={translate(`resources.slide.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<slide.icon />}
                        dense={dense}
                    />
                    <MenuItemLink
                        to={{
                            pathname: '/category',
                            state: { _scrollToTop: true },
                        }}
                        primaryText={translate(`resources.category.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<category.icon />}
                        dense={dense}
                    />

                    <MenuItemLink
                        to={{
                            pathname: '/product',
                            state: { _scrollToTop: true },
                        }}
                        primaryText={translate(`resources.product.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<product.icon />}
                        dense={dense}
                    />

                    <MenuItemLink
                        to={{
                            pathname: '/branch',
                            state: { _scrollToTop: true },
                        }}
                        primaryText={translate(`resources.branch.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<branch.icon />}
                        dense={dense}
                    />
                    <MenuItemLink
                        to={{
                            pathname: '/tax',
                            state: { _scrollToTop: true },
                        }}
                        primaryText={translate(`resources.tax.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<tax.icon />}
                        dense={dense}
                    />
                    <MenuItemLink
                        to={{
                            pathname: '/staff',
                            state: { _scrollToTop: true },
                        }}
                        primaryText={translate(`resources.staff.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<staff.icon />}
                        dense={dense}
                    />
                </>
            )}
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    open: {
        width: 200,
    },
    closed: {
        width: 55,
    },
}));

export default Menu;
