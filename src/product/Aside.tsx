import * as React from 'react';
import inflection from 'inflection';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    useGetList,
} from 'react-admin';

import { Category } from '../types';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            width: '15em',
            marginRight: '1em',
            overflow: 'initial',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));

const Aside = () => {
    const listCat = useGetList<any>(
        'category',
        { page: 1, perPage: 100 },
        { field: 'name', order: 'ASC' },
        {}
    );
    const categories = listCat.data;
    const catIds = listCat.ids;

    const listTax = useGetList<any>(
        'tax',
        { page: 1, perPage: 100 },
        { field: 'name', order: 'ASC' },
        {}
    );
    const tax = listTax.data;
    const taxIds = listTax.ids;

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <FilterLiveSearch />

                <FilterList
                    label="resources.product.filters.sales"
                    icon={<AttachMoneyIcon />}
                >
                    <FilterListItem
                        label="resources.product.filters.best_sellers"
                        value={{
                            sales_lte: undefined,
                            sales_gt: 25,
                            sales: undefined,
                        }}
                    />
                    <FilterListItem
                        label="resources.product.filters.average_sellers"
                        value={{
                            sales_lte: 25,
                            sales_gt: 10,
                            sales: undefined,
                        }}
                    />
                    <FilterListItem
                        label="resources.product.filters.low_sellers"
                        value={{
                            sales_lte: 10,
                            sales_gt: 0,
                            sales: undefined,
                        }}
                    />
                    <FilterListItem
                        label="resources.product.filters.never_sold"
                        value={{
                            sales_lte: undefined,
                            sales_gt: undefined,
                            sales: 0,
                        }}
                    />
                </FilterList>
                <FilterList
                    label="resources.product.filters.category"
                    icon={<LocalOfferIcon />}
                >
                    {catIds &&
                        categories &&
                        catIds.map((id: any) => (
                            <FilterListItem
                                label={categories[id].name}
                                key={categories[id].id}
                                value={{ cat_ids: categories[id].id }}
                            />
                        ))}
                </FilterList>
                <FilterList
                    label="resources.product.filters.tax"
                    icon={<LocalOfferIcon />}
                >
                    {taxIds &&
                        tax &&
                        taxIds.map((id: any) => (
                            <FilterListItem
                                label={tax[id].name}
                                key={tax[id].id}
                                value={{ tax_ids: tax[id].id }}
                            />
                        ))}
                </FilterList>
            </CardContent>
        </Card>
    );
};

export default Aside;
