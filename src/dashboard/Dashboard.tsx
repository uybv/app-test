import React, { useState, useEffect, useCallback } from 'react';
import { useVersion, useDataProvider } from 'react-admin';
import { Table, TableBody, TableCell, TableRow, Card, CardContent, TextField } from '@material-ui/core';
import { subDays } from 'date-fns';

import MonthlyRevenue from './MonthlyRevenue';
import NbNewOrders from './NbNewOrders';
import OrderChart from './OrderChart';

import { Order, OrderState } from '../types';
import _ from 'lodash';
import moment from 'moment';

export enum PaymentType {
    Cash = 0,
    Paypay = 1,
    Card = 2,
    Apple = 3,
    Google = 4
}

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;

const Dashboard = () => {
    const [state, setState] = useState<any>({});
    const [startTime, setStartTime] = useState<number>(moment().startOf('month').valueOf());
    const [endTime, setEndTime] = useState<number>(moment().endOf('month').valueOf());
    const version = useVersion();
    const dataProvider = useDataProvider();

    const formatCurrency = (value: any) => {
        return value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'JPY',
        })
    }

    const fetchOrders = useCallback(async (start, end) => {
        const { data: byDayOrders } = await dataProvider.getList<Order>(
            'order',
            {
                filter: {
                    date_gte: start,
                    date_lte: end,
                    st: [OrderState.PAID, OrderState.WAITING_RECEIVE, OrderState.COMPLETE, OrderState.CANCEL]
                },
                sort: { field: 'created_time', order: 'DESC' },
                pagination: {} as any,
            }
        );
        const { data: monthOrders } = await dataProvider.getList<Order>(
            'order',
            {
                filter: { date_gte: subDays(new Date(), 30).valueOf(), st: [OrderState.PAID, OrderState.WAITING_RECEIVE, OrderState.COMPLETE, OrderState.CANCEL] },
                sort: { field: 'created_time', order: 'DESC' },
                pagination: {} as any,
            }
        );
        const { data: todayOrders } = await dataProvider.getList<Order>(
            'order',
            {
                filter: { date_gte: moment().startOf('day').valueOf(), st: [OrderState.PAID, OrderState.WAITING_RECEIVE, OrderState.COMPLETE, OrderState.CANCEL] },
                sort: { field: 'created_time', order: 'DESC' },
                pagination: {} as any,
            }
        );
        const byDay = byDayOrders
            .reduce(
                (stats: any, order: any) => {
                    const revenue = order.refund_total ? 0 : order.total;
                    const tax_total = order.refund_total ? 0 : (order?.tax_total ?? 0);
                    const fee_amount = order?.payment?.fee_amount ?? 0;
                    stats.revenue += revenue;
                    stats.tax_total += tax_total;
                    stats.fee_amount += fee_amount;
                    stats.total_order++;
                    if (order.st === OrderState.CANCEL) {
                        stats.total_cancel++;
                    }

                    if (order.payment.type === PaymentType.Paypay) {
                        stats.paypay.revenue += revenue;
                        stats.paypay.tax_total += tax_total;
                        stats.paypay.fee_amount += fee_amount;
                        stats.paypay.total_order++;
                        if (order.st === OrderState.CANCEL) {
                            stats.paypay.total_cancel++;
                        }
                    } else if (order.payment.type === PaymentType.Card) {
                        stats.card.revenue += revenue;
                        stats.card.tax_total += tax_total;
                        stats.card.fee_amount += fee_amount;
                        stats.card.total_order++;
                        if (order.st === OrderState.CANCEL) {
                            stats.card.total_cancel++;
                        }
                    } else if (order.payment.type === PaymentType.Google) {
                        stats.google_pay.revenue += revenue;
                        stats.google_pay.tax_total += tax_total;
                        stats.google_pay.fee_amount += fee_amount;
                        stats.google_pay.total_order++;
                        if (order.st === OrderState.CANCEL) {
                            stats.google_pay.total_cancel++;
                        }
                    } else if (order.payment.type === PaymentType.Apple) {
                        stats.apple_pay.revenue += revenue;
                        stats.apple_pay.tax_total += tax_total;
                        stats.apple_pay.fee_amount += fee_amount;
                        stats.apple_pay.total_order++;
                        if (order.st === OrderState.CANCEL) {
                            stats.apple_pay.total_cancel++;
                        }
                    }

                    if (order.platform === 'ios') {
                        stats.apple_store.revenue += revenue;
                        stats.apple_store.tax_total += tax_total;
                        stats.apple_store.fee_amount += fee_amount;
                        stats.apple_store.total_order++;
                        if (order.st === OrderState.CANCEL) {
                            stats.apple_store.total_cancel++;
                        }
                    } else if (order.platform === 'android') {
                        stats.google_store.revenue += revenue;
                        stats.google_store.tax_total += tax_total;
                        stats.google_store.fee_amount += fee_amount;
                        stats.google_store.total_order++;
                        if (order.st === OrderState.CANCEL) {
                            stats.google_store.total_cancel++;
                        }
                    }

                    return stats;
                },
                {
                    revenue: 0,
                    tax_total: 0,
                    fee_amount: 0,
                    total_order: 0,
                    total_cancel: 0,
                    paypay: {
                        revenue: 0,
                        tax_total: 0,
                        fee_amount: 0,
                        total_order: 0,
                        total_cancel: 0,
                    },
                    card: {
                        revenue: 0,
                        tax_total: 0,
                        fee_amount: 0,
                        total_order: 0,
                        total_cancel: 0,
                    },
                    google_pay: {
                        revenue: 0,
                        tax_total: 0,
                        fee_amount: 0,
                        total_order: 0,
                        total_cancel: 0,
                    },
                    apple_pay: {
                        revenue: 0,
                        tax_total: 0,
                        fee_amount: 0,
                        total_order: 0,
                        total_cancel: 0,
                    },
                    apple_store: {
                        revenue: 0,
                        tax_total: 0,
                        fee_amount: 0,
                        total_order: 0,
                        total_cancel: 0,
                    },
                    google_store: {
                        revenue: 0,
                        tax_total: 0,
                        fee_amount: 0,
                        total_order: 0,
                        total_cancel: 0,
                    }
                }
            );
        const month = monthOrders
            .reduce(
                (stats: any, order: any) => {
                    const revenue = order.refund_total ? 0 : order.total;
                    const tax_total = order.refund_total ? 0 : (order?.tax_total ?? 0);
                    const fee_amount = order?.payment?.fee_amount ?? 0;
                    stats.revenue += revenue;
                    stats.tax_total += tax_total;
                    stats.fee_amount += fee_amount;
                    stats.total_order++;
                    if (order.st === OrderState.CANCEL) {
                        stats.total_cancel++;
                    }

                    return stats;
                },
                {
                    revenue: 0,
                    tax_total: 0,
                    fee_amount: 0,
                    total_order: 0,
                    total_cancel: 0,
                }
            );
        const today = todayOrders
            .reduce(
                (stats: any, order: any) => {
                    const revenue = order.refund_total ? 0 : order.total;
                    const tax_total = order.refund_total ? 0 : (order?.tax_total ?? 0);
                    const fee_amount = order?.payment?.fee_amount ?? 0;
                    stats.revenue += revenue;
                    stats.tax_total += tax_total;
                    stats.fee_amount += fee_amount;
                    stats.total_order++;
                    if (order.st === OrderState.CANCEL) {
                        stats.total_cancel++;
                    }

                    return stats;
                },
                {
                    revenue: 0,
                    tax_total: 0,
                    fee_amount: 0,
                    total_order: 0,
                    total_cancel: 0,
                }
            );
        setState((state: any) => ({
            ...state,
            order: {
                monthOrders,
                month,
                today,
                byDay,
            }
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataProvider]);

    const fetchUsers = useCallback(async (start, end) => {
        const users = await dataProvider.getList<any>(
            'user',
            {
                filter: { },
                sort: { field: 'created_at', order: 'DESC' },
                pagination: {} as any,
            }
        );
        const byDay = await dataProvider.getList<any>(
            'user',
            {
                filter: { date_gte: start, date_lte: end },
                sort: { field: 'created_at', order: 'DESC' },
                pagination: {} as any,
            }
        );
        const month = await dataProvider.getList<any>(
            'user',
            {
                filter: { date_gte: moment().startOf('month').valueOf(), date_lte: moment().endOf('month').valueOf() },
                sort: { field: 'created_at', order: 'DESC' },
                pagination: {} as any,
            }
        );
        const today = await dataProvider.getList<any>(
            'user',
            {
                filter: { date_gte: moment().startOf('day').valueOf() },
                sort: { field: 'created_at', order: 'DESC' },
                pagination: {} as any,
            }
        );
        setState((state: any) => ({
            ...state,
            user: {
                total: users?.total ?? 0,
                apple_store: (users && users.data) ? users.data.filter(v => { return v.platform === 'ios'; }).reduce((nb: number) => ++nb, 0) : 0,
                google_store: (users && users.data) ? users.data.filter(v => { return v.platform === 'android'; }).reduce((nb: number) => ++nb, 0) : 0,
                byDay: {
                    total: byDay?.total ?? 0,
                    apple_store: (byDay && byDay.data) ? byDay.data.filter(v => { return v.platform === 'ios'; }).reduce((nb: number) => ++nb, 0) : 0,
                    google_store: (byDay && byDay.data) ? byDay.data.filter(v => { return v.platform === 'android'; }).reduce((nb: number) => ++nb, 0) : 0,
                },
                today: today?.total ?? 0,
                month: month?.total ?? 0,
            }
        }));
    }, [dataProvider]);

    useEffect(() => {
        fetchOrders(startTime, endTime);
        fetchUsers(startTime, endTime);
    }, [version, startTime, endTime]); // eslint-disable-line react-hooks/exhaustive-deps

    const {
        order,
        user
    } = state;
    return order && user ? (
        <>
            <div style={styles.flex}>
                <div style={styles.leftCol}>
                    <div style={styles.flex}>
                        <MonthlyRevenue value={formatCurrency(order?.month?.revenue ?? 0)} />
                        <Spacer />
                        <NbNewOrders value={order?.month?.total_order ?? 0} />
                    </div>
                    <div style={styles.singleCol}>
                        <OrderChart orders={order?.monthOrders ?? []} />
                    </div>
                </div>
                <div style={styles.rightCol}>
                    <div style={_.assign({}, styles.singleCol, { marginTop: 0 })}>
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                            </TableCell>
                                            <TableCell>
                                                売上
                                            </TableCell>
                                            <TableCell>
                                                売上 - 決済手数料
                                            </TableCell>
                                            <TableCell>
                                                オーダー数
                                            </TableCell>
                                            <TableCell>
                                                新規会員数
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                本日
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.today?.revenue ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency((order?.today?.revenue ?? 0) - (order?.today?.fee_amount ?? 0))}
                                            </TableCell>
                                            <TableCell>
                                                {order?.today?.total_order}
                                            </TableCell>
                                            <TableCell>
                                                {user?.today}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                当月
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.month?.revenue ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency((order?.month?.revenue ?? 0) - (order?.month?.fee_amount ?? 0))}
                                            </TableCell>
                                            <TableCell>
                                                {order.month?.total_order}
                                            </TableCell>
                                            <TableCell>
                                                {user?.month}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                            </CardContent>
                        </Card>
                    </div>
                    <div style={styles.singleCol}>
                        <Card>
                            <CardContent>
                                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 15 }}>
                                    <TextField
                                        label="集計開始日"
                                        type="date"
                                        defaultValue={moment(startTime).format('YYYY-MM-DD')}
                                        style={{ marginRight: 25 }}
                                        // className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onBlur={(event) => {
                                            const time = moment(event.target.value).valueOf();
                                            if (time > endTime) {
                                                setEndTime(moment(event.target.value).endOf('day').valueOf());
                                            }
                                            setStartTime(time);
                                        }}
                                    />
                                    <TextField
                                        label="集計終了日"
                                        type="date"
                                        defaultValue={moment(endTime).format('YYYY-MM-DD')}
                                        // className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onBlur={(event) => {
                                            const time = moment(event.target.value).endOf('day').valueOf();
                                            if (time < startTime) {
                                                setStartTime(moment(event.target.value).valueOf());
                                            }
                                            setEndTime(time);
                                        }}
                                    />
                                </div>

                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                            </TableCell>
                                            <TableCell>
                                                Apple Store
                                            </TableCell>
                                            <TableCell>
                                                Google Play Store
                                            </TableCell>
                                            <TableCell>
                                                合計
                                            </TableCell>
                                            <TableCell>
                                                クレジットカード
                                            </TableCell>
                                            <TableCell>
                                                Apple Pay
                                            </TableCell>
                                            <TableCell>
                                                Google Pay
                                            </TableCell>
                                            <TableCell>
                                                PayPay
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                売上
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.apple_store?.revenue ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.google_store?.revenue ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.revenue ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.card?.revenue ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.apple_pay?.revenue ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.google_pay?.revenue ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.paypay?.revenue ?? 0)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                売上 - 決済手数料
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency((order?.byDay?.apple_store?.revenue ?? 0) - (order?.byDay?.apple_store?.fee_amount ?? 0))}

                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency((order?.byDay?.google_store?.revenue ?? 0) - (order?.byDay?.google_store?.fee_amount ?? 0))}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency((order?.byDay?.revenue ?? 0) - (order?.byDay?.fee_amount ?? 0))}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency((order?.byDay?.card?.revenue ?? 0) - (order?.byDay?.card?.fee_amount ?? 0))}

                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency((order?.byDay?.apple_pay?.revenue ?? 0) - (order?.byDay?.apple_pay?.fee_amount ?? 0))}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency((order?.byDay?.google_pay?.revenue ?? 0) - (order?.byDay?.google_pay?.fee_amount ?? 0))}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency((order?.byDay?.paypay?.revenue ?? 0) - (order?.byDay?.paypay?.fee_amount ?? 0))}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                消費税
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.apple_store?.tax_total ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.google_store?.tax_total ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.tax_total ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.card?.tax_total ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.apple_pay?.tax_total ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.google_pay?.tax_total ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.paypay?.tax_total ?? 0)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                オーダー数
                                            </TableCell>
                                            <TableCell>
                                                {order?.byDay?.apple_store?.total_order ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {order?.byDay?.google_store?.total_order ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {order?.byDay?.total_order ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {order?.byDay?.card?.total_order ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {order?.byDay?.apple_pay?.total_order ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {order?.byDay?.google_pay?.total_order ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {order?.byDay?.paypay?.total_order ?? 0}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                4.その他数
                                            </TableCell>
                                            <TableCell>
                                                {order?.byDay?.apple_store?.total_cancel ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {order?.byDay?.google_store?.total_cancel ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {order?.byDay?.total_cancel ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {order?.byDay?.card?.total_cancel ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {order?.byDay?.apple_pay?.total_cancel ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {order?.byDay?.google_pay?.total_cancel ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {order?.byDay?.paypay?.total_cancel ?? 0}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                新規会員数
                                            </TableCell>
                                            <TableCell>
                                                {user?.byDay?.apple_store ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {user?.byDay?.google_store ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {user?.byDay?.total ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                -
                                            </TableCell>
                                            <TableCell>
                                                -
                                            </TableCell>
                                            <TableCell>
                                                -
                                            </TableCell>
                                            <TableCell>
                                                -
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>
                                                合計会員数
                                            </TableCell>
                                            <TableCell>
                                                {user?.apple_store ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {user?.google_store ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {user?.total ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                -
                                            </TableCell>
                                            <TableCell>
                                                -
                                            </TableCell>
                                            <TableCell>
                                                -
                                            </TableCell>
                                            <TableCell>
                                                -
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    ) : null;
};

export default Dashboard;
