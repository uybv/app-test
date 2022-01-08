import * as React from 'react';
import clsx from 'clsx';
import { Table, TableBody, TableCell, TableRow, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ContentSave from '@material-ui/icons/Save';

import { OrderState } from '../types';

const useStyles = makeStyles({
    container: { minWidth: '35em' },
    rightAlignedCell: { textAlign: 'right' },
    boldCell: { fontWeight: 'bold' },
});

const renderPaymentMethod = (type: any) => {
    let data = '';
    switch (type) {
        case 1:
            data = 'PayPay';
            break;
        case 2:
            data = 'Credit card';
            break;
        case 3:
            data = 'Apple pay';
            break;
        case 4:
            data = 'Google pay';
    }

    return data;
}

const Totals = (props: any) => {
    const { record, handleUpdate } = props;
    const classes = useStyles();

    return (
        <Table className={classes.container}>
            <TableBody>
                <TableRow>
                    <TableCell className={classes.boldCell}>
                        金額
                    </TableCell>
                    <TableCell
                        className={clsx(
                            classes.boldCell,
                            classes.rightAlignedCell
                        )}
                    >
                        {record.st === OrderState.CANCEL && (
                            <Button
                            style={{ backgroundColor: 'red', marginRight: 15 }}
                            variant={'contained'}
                            type={'button'}
                            color={'secondary'}
                            startIcon={<ContentSave />}
                            onClick={() => {
                                if (!window.confirm('本当に払い戻ししますか?'))
                                    return false;
                                handleUpdate(record, { refund_total: record?.total, st: 0 });
                            }}
                        >
                            払い戻しする
                        </Button>
                        )}
                        {record?.total.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'JPY',
                        })}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        支払方法
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {renderPaymentMethod(record?.payment.type)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        決済手数料
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        ¥0
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        金額 - 決済手数料
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {(record?.total ?? 0).toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'JPY',
                        })}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        消費税
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {(record?.tax_total ?? 0).toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'JPY',
                        })}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default Totals;
