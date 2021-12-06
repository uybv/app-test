import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, FieldProps, useTranslate, useQueryWithStore } from 'react-admin';

import { AppState, Order, Product } from '../types';

const useStyles = makeStyles({
    rightAlignedCell: { textAlign: 'right' },
});

const Basket = (props: FieldProps<Order>) => {
    const { record } = props;
    const classes = useStyles();
    const translate = useTranslate();

    const { loaded, data: products } = useQueryWithStore<AppState>(
        {
            type: 'getMany',
            resource: 'product',
            payload: {
                ids: record ? record.foods.map(item => item.id) : [],
            },
        },
        {},
        state => {
            const productIds = record
                ? record.foods.map(item => item.id)
                : [];

            return productIds
                .map<Product>(
                    productId =>
                        state.admin.resources.product.data[
                            productId
                        ] as Product
                )
                .filter(r => typeof r !== 'undefined')
                .reduce((prev, next) => {
                    prev[next.id] = next;
                    return prev;
                }, {} as { [key: string]: Product });
        }
    );

    if (!loaded || !record) return null;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        {translate(
                            'resources.order.fields.basket.reference'
                        )}
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {translate(
                            'resources.order.fields.basket.unit_price'
                        )}
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {translate('resources.order.fields.basket.quantity')}
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {translate('resources.order.fields.basket.total')}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {record.foods.map(
                    (item: any) =>
                        products[item.id] && (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Link to={`/products/${item.id}`}>
                                        {products[item.id].name}
                                    </Link>
                                </TableCell>
                                <TableCell className={classes.rightAlignedCell}>
                                    {products[
                                        item.id
                                    ].price.toLocaleString(undefined, {
                                        style: 'currency',
                                        currency: 'JPY',
                                    })}
                                </TableCell>
                                <TableCell className={classes.rightAlignedCell}>
                                    {item.quantity}
                                </TableCell>
                                <TableCell className={classes.rightAlignedCell}>
                                    {(
                                        products[item.id].price 
                                    ).toLocaleString(undefined, {
                                        style: 'currency',
                                        currency: 'JPY',
                                    })}
                                </TableCell>
                            </TableRow>
                        )
                )}
            </TableBody>
        </Table>
    );
};

export default Basket;
