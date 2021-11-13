import * as React from 'react';
import {
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    List,
    ListProps,
    NullableBooleanInput,
    NumberField,
    SearchInput,
} from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CustomerLinkField from './CustomerLinkField';
import ColoredNumberField from './ColoredNumberField';
import MobileGrid from './MobileGrid';
import VisitorListAside from './VisitorListAside';
import { ReactElement } from 'react';

const visitorFilters = [
    <SearchInput source="q" alwaysOn />,
    // <DateInput source="last_seen_gte" />,
    // <NullableBooleanInput source="has_ordered" />,
    // <NullableBooleanInput source="has_newsletter" defaultValue />
];

const useStyles = makeStyles(theme => ({
    nb_commands: { color: 'purple' },
    hiddenOnSmallScreens: {
        display: 'table-cell',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
}));

const VisitorList = (props: ListProps): ReactElement => {
    const classes = useStyles();
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
        <List
            {...props}
            filters={visitorFilters}
            sort={{ field: 'last_seen', order: 'DESC' }}
            perPage={25}
            // aside={<VisitorListAside />}
        >
            {isXsmall ? (
                <MobileGrid />
            ) : (
                <Datagrid optimized rowClick="edit">
                    <CustomerLinkField />
                    <DateField source="last_login_at" />
                    <NumberField
                        source="total_order"
                        label="resources.customer.fields.order"
                        className={classes.nb_commands}
                    />
                    <ColoredNumberField
                        source="total_revenue"
                        options={{ style: 'currency', currency: 'USD' }}
                    />
                    <DateField source="latest_purchase" showTime />
                    <BooleanField source="has_newsletter" label="News." />
                </Datagrid>
            )
            }
        </List>
    );
};

export default VisitorList;
