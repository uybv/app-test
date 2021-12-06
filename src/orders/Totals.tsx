import * as React from 'react';
import clsx from 'clsx';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FieldProps, useTranslate } from 'react-admin';

import { Order } from '../types';

const useStyles = makeStyles({
    container: { minWidth: '35em' },
    rightAlignedCell: { textAlign: 'right' },
    boldCell: { fontWeight: 'bold' },
});

const Totals = (props: FieldProps<Order>) => {
    const { record } = props;
    const classes = useStyles();
    const translate = useTranslate();

    return (
        <Table className={classes.container}>
            <TableBody>
                <TableRow>
                    <TableCell>
                        {translate('resources.order.fields.basket.sum')}
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {record?.total.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'JPY',
                        })}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.boldCell}>
                        {translate('resources.order.fields.basket.total')}
                    </TableCell>
                    <TableCell
                        className={clsx(
                            classes.boldCell,
                            classes.rightAlignedCell
                        )}
                    >
                        {record?.total.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'USD',
                        })}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default Totals;
