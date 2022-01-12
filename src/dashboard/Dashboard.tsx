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
        const { data: orders } = await dataProvider.getList<Order>(
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
        const { data: ago30DayOrders } = await dataProvider.getList<Order>(
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
        const byDay = orders
            .reduce(
                (stats: any, order: any) => {
                    const revenue = order.total;
                    stats.revenue += revenue;
                    stats.tax_total += order?.tax_total ?? 0;
                    stats.fee_amount += order?.payment?.fee_amount ?? 0;
                    stats.total_order++;
                    if (order.st === OrderState.CANCEL) {
                        stats.total_cancel++;
                    }

                    if (order.payment.type === PaymentType.Paypay) {
                        stats.paypay.revenue += revenue;
                        stats.paypay.tax_total += order?.tax_total ?? 0;
                        stats.paypay.fee_amount += order?.payment?.fee_amount ?? 0;
                        stats.paypay.total_order++;
                        if (order.st === OrderState.CANCEL) {
                            stats.paypay.total_cancel++;
                        }
                    } else if (order.payment.type === PaymentType.Card) {
                        stats.card.revenue += revenue;
                        stats.card.tax_total += order?.tax_total ?? 0;
                        stats.card.fee_amount += order?.payment?.fee_amount ?? 0;
                        stats.card.total_order++;
                        if (order.st === OrderState.CANCEL) {
                            stats.card.total_cancel++;
                        }
                    } else if (order.payment.type === PaymentType.Google) {
                        stats.google_pay.revenue += revenue;
                        stats.google_pay.tax_total += order?.tax_total ?? 0;
                        stats.google_pay.fee_amount += order?.payment?.fee_amount ?? 0;
                        stats.google_pay.total_order++;
                        if (order.st === OrderState.CANCEL) {
                            stats.google_pay.total_cancel++;
                        }
                    } else if (order.payment.type === PaymentType.Apple) {
                        stats.apple_pay.revenue += revenue;
                        stats.apple_pay.tax_total += order?.tax_total ?? 0;
                        stats.apple_pay.fee_amount += order?.payment?.fee_amount ?? 0;
                        stats.apple_pay.total_order++;
                        if (order.st === OrderState.CANCEL) {
                            stats.apple_pay.total_cancel++;
                        }
                    }

                    if (order.platform === 'ios') {
                        stats.apple_store.revenue += revenue;
                        stats.apple_store.tax_total += order?.tax_total ?? 0;
                        stats.apple_store.fee_amount += order?.payment?.fee_amount ?? 0;
                        stats.apple_store.total_order++;
                        if (order.st === OrderState.CANCEL) {
                            stats.apple_store.total_cancel++;
                        }
                    } else if (order.platform === 'android') {
                        stats.google_store.revenue += revenue;
                        stats.google_store.tax_total += order?.tax_total ?? 0;
                        stats.google_store.fee_amount += order?.payment?.fee_amount ?? 0;
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
        const ago30Day = ago30DayOrders
            .reduce(
                (stats: any, order: any) => {
                    const revenue = order.total - (order?.refund_total ?? 0) - (order?.payment?.fee_amount ?? 0);
                    stats.revenue += revenue;
                    stats.tax_total += order?.tax_total ?? 0;
                    stats.fee_amount += order?.payment?.fee_amount ?? 0;
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
                    const revenue = order.total - (order?.refund_total ?? 0) - (order?.payment?.fee_amount ?? 0);
                    stats.revenue += revenue;
                    stats.tax_total += order?.tax_total ?? 0;
                    stats.fee_amount += order?.payment?.fee_amount ?? 0;
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
                ago30DayOrders,
                ago30Day,
                today,
                byDay,
            }
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataProvider]);

    const fetchCustomers = useCallback(async (start, end) => {
        const aMonthAgo = subDays(new Date(), 30);
        const ago30Day = await dataProvider.getList<any>(
            'customer',
            {
                filter: { date_gte: aMonthAgo.valueOf() },
                sort: { field: 'created_at', order: 'DESC' },
                pagination: {} as any,
            }
        );
        const today = await dataProvider.getList<any>(
            'customer',
            {
                filter: { date_gte: moment().startOf('day').valueOf(), st: OrderState.PAID },
                sort: { field: 'created_at', order: 'DESC' },
                pagination: {} as any,
            }
        );
        setState((state: any) => ({
            ...state,
            customer: {
                today: today?.total ?? 0,
                ago30Day: ago30Day?.total ?? 0,
            }
        }));
    }, [dataProvider]);

    useEffect(() => {
        fetchOrders(startTime, endTime);
        fetchCustomers(startTime, endTime);
    }, [version, startTime, endTime]); // eslint-disable-line react-hooks/exhaustive-deps

    const {
        order,
        customer
    } = state;
    return order && customer ? (
        <>
            <div style={styles.flex}>
                <div style={styles.leftCol}>
                    <div style={styles.flex}>
                        <MonthlyRevenue value={formatCurrency(order?.ago30Day?.revenue ?? 0)} />
                        <Spacer />
                        <NbNewOrders value={order?.ago30Day?.total_order ?? 0} />
                    </div>
                    <div style={styles.singleCol}>
                        <OrderChart orders={order?.ago30DayOrders ?? []} />
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
                                                注文数
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
                                                {customer?.today}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                当月
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.ago30Day?.revenue ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency((order?.ago30Day?.revenue ?? 0) - (order?.ago30Day?.fee_amount ?? 0))}
                                            </TableCell>
                                            <TableCell>
                                                {order.ago30Day?.total_order}
                                            </TableCell>
                                            <TableCell>
                                                {customer?.ago30Day}
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
                                            console.log(event.target.value);
                                            console.log(moment(event.target.value).valueOf());
                                            setStartTime(moment(event.target.value).valueOf());
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
                                            setEndTime(moment(event.target.value).valueOf())
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
                                                {formatCurrency(order?.byDay?.apple_store?.revenue ?? 0 - order?.byDay?.apple_store?.fee_amount ?? 0)}

                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.google_store?.revenue ?? 0 - order?.byDay?.google_store?.fee_amount ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.revenue ?? 0 - order?.byDay?.fee_amount ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.card?.revenue ?? 0 - order?.byDay?.card?.fee_amount ?? 0)}

                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.apple_pay?.revenue ?? 0 - order?.byDay?.apple_pay?.fee_amount ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.google_pay?.revenue ?? 0 - order?.byDay?.google_pay?.fee_amount ?? 0)}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(order?.byDay?.paypay?.revenue ?? 0 - order?.byDay?.paypay?.fee_amount ?? 0)}
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
                                                注文数
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
                                                キャンセル数
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
                                                {customer?.byDay?.apple_store?.total_new ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {customer?.byDay?.google_store?.total_new ?? 0}
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
                                            <TableCell>
                                                -
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>
                                                合計会員数
                                            </TableCell>
                                            <TableCell>
                                                {customer?.byDay?.apple_store?.total ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                {customer?.byDay?.google_store?.total ?? 0}
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
                                            <TableCell>
                                                -
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                ダウンロード数
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
