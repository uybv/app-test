import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, FieldProps, TextField, useTranslate, useQueryWithStore } from 'react-admin';

import { Order } from '../types';

const useStyles = makeStyles({
    rightAlignedCell: { textAlign: 'right' },
});

const Basket = (props: FieldProps<Order>) => {
    const { record } = props;
    const classes = useStyles();
    const translate = useTranslate();

    if (!record) return null;

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
                    (
                        <TableRow key={item.id}>
                            <TableCell>
                                {item.name + '\n'}
                                {item.additions && item.additions.length && item.additions.map((addition: any, idx: any) => (
                                    <div key={`${addition.name}-${idx}`}>
                                        {addition.name}: {addition.price.toLocaleString(undefined, {
                                            style: 'currency',
                                            currency: 'JPY',
                                        })}
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {item.quantity}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {((item.price + (item.additions && item.additions.length > 0 ? item.additions.map((a: any) => a.price).reduce((a: any, b: any) => a + b, 0) : 0)) * item.quantity ).toLocaleString(undefined, {
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
