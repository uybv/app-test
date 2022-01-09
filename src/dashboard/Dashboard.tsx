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
    const version = useVersion();
    const dataProvider = useDataProvider();

    const fetchOrders = useCallback(async () => {
        const aMonthAgo = subDays(new Date(), 30);
        const { data: monthOrders } = await dataProvider.getList<Order>(
            'order',
            {
                filter: { date_gte: aMonthAgo.valueOf(), st: OrderState.PAID },
                sort: { field: 'created_time', order: 'DESC' },
                pagination: {} as any,
            }
        );
        const { data: todayOrders } = await dataProvider.getList<Order>(
            'order',
            {
                filter: { date_gte: moment().startOf('day').valueOf(), st: OrderState.PAID },
                sort: { field: 'created_time', order: 'DESC' },
                pagination: {} as any,
            }
        );
        const month = monthOrders
            .reduce(
                (stats: any, order: any) => {
                    stats.revenue += order.total;
                    stats.total++;

                    if (order.payment.type === PaymentType.Paypay) {
                        stats.revenuePaypay += order.total;
                        stats.totalPayPay++;
                    } else if (order.payment.type === PaymentType.Card) {
                        stats.revenueCardPay += order.total;
                        stats.totalCardPay++;
                    } else if (order.payment.type === PaymentType.Google) {
                        stats.revenueGooglePay += order.total;
                        stats.totalGooglePay++;
                    } else if (order.payment.type === PaymentType.Apple) {
                        stats.revenueApplePay += order.total;
                        stats.totalApplePay++;
                    }
                    return stats;
                },
                {
                    revenue: 0,
                    total: 0,
                    revenuePaypay: 0,
                    totalPayPay: 0,
                    revenueCardPay: 0,
                    totalCardPay: 0,
                    revenueGooglePay: 0,
                    totalGooglePay: 0,
                    revenueApplePay: 0,
                    totalApplePay: 0,
                }
            );
        const today = todayOrders
            .reduce(
                (stats: any, order: any) => {
                    stats.revenue += order.total;
                    stats.total++;
                    return stats;
                },
                {
                    revenue: 0,
                    total: 0,
                }
            );
        setState((state: any) => ({
            ...state,
            monthOrders,
            revenueMonth: month.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'JPY',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            monthTotalOrder: month.total,
            revenuePaypayMonth: month.revenuePaypay.toLocaleString(undefined, {
                style: 'currency',
                currency: 'JPY',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            monthPaypayTotalOrder: month.totalPayPay,
            revenueCardPayMonth: month.revenueCardPay.toLocaleString(undefined, {
                style: 'currency',
                currency: 'JPY',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            monthCarPayTotalOrder: month.totalcardPay,
            revenueGooglePayMonth: month.revenueGooglePay.toLocaleString(undefined, {
                style: 'currency',
                currency: 'JPY',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            monthGooglePayTotalOrder: month.totalGooglePay,
            revenueApplePayMonth: month.revenueApplePay.toLocaleString(undefined, {
                style: 'currency',
                currency: 'JPY',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            monthApplePayTotalOrder: month.totalApplePay,
            revenueToday: today.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'JPY',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            todayTotalOrder: today.total,

        }));
    }, [dataProvider]);

    const fetchCustomers = useCallback(async () => {
        const aMonthAgo = subDays(new Date(), 30);
        const { data: monthCustomers } = await dataProvider.getList<any>(
            'customer',
            {
                filter: { date_gte: aMonthAgo.valueOf() },
                sort: { field: 'created_at', order: 'DESC' },
                pagination: {} as any,
            }
        );
        const { data: todayCustomers } = await dataProvider.getList<any>(
            'customer',
            {
                filter: { date_gte: moment().startOf('day').valueOf(), st: OrderState.PAID },
                sort: { field: 'created_at', order: 'DESC' },
                pagination: {} as any,
            }
        );
        setState((state: any) => ({
            ...state,
            todayTotalCustomer: todayCustomers ? todayCustomers.reduce((v: number) => ++v, 0) : 0,
            monthTotalCustomer: monthCustomers ? monthCustomers.reduce((v: number) => ++v, 0) : 0,
        }));
    }, [dataProvider]);

    useEffect(() => {
        fetchOrders();
        fetchCustomers();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    const {
        monthOrders,
        revenueMonth,
        revenueToday,
        monthTotalOrder,
        todayTotalOrder,
        revenuePaypayMonth,
        monthPaypayTotalOrder,
        revenueCardPayMonth,
        monthCarPayTotalOrder,
        revenueGooglePayMonth,
        monthGooglePayTotalOrder,
        revenueApplePayMonth,
        monthApplePayTotalOrder,
        todayTotalCustomer,
        monthTotalCustomer
    } = state;
    return (
        <>
            <div style={styles.flex}>
                <div style={styles.leftCol}>
                    <div style={styles.flex}>
                        <MonthlyRevenue value={revenueMonth} />
                        <Spacer />
                        <NbNewOrders value={todayTotalOrder} />
                    </div>
                    <div style={styles.singleCol}>
                        <OrderChart orders={monthOrders} />
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
                                                {(revenueToday ?? 0).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {(revenueToday ?? 0).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {todayTotalOrder}
                                            </TableCell>
                                            <TableCell>
                                                {todayTotalCustomer}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                当月
                                            </TableCell>
                                            <TableCell>
                                                {(revenueMonth ?? 0).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {(revenueMonth ?? 0).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {monthTotalOrder}
                                            </TableCell>
                                            <TableCell>
                                                {monthTotalCustomer}
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
                                {/* <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    // className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                /> */}
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
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>
                                                {(revenueMonth ?? 0).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {(revenueCardPayMonth ?? 0).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {(revenueApplePayMonth ?? 0).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {(revenueGooglePayMonth ?? 0).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {(revenuePaypayMonth ?? 0).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                })}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                売上 - 決済手数料
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>
                                                {(revenueMonth ?? 0).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {(revenueCardPayMonth ?? 0).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {(revenueApplePayMonth ?? 0).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {(revenueGooglePayMonth ?? 0).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {(revenuePaypayMonth ?? 0).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'JPY',
                                                })}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                消費税
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                注文数
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>
                                                {monthTotalOrder}
                                            </TableCell>
                                            <TableCell>
                                                {monthCarPayTotalOrder}
                                            </TableCell>
                                            <TableCell>
                                                {monthApplePayTotalOrder}
                                            </TableCell>
                                            <TableCell>
                                                {monthGooglePayTotalOrder}
                                            </TableCell>
                                            <TableCell>
                                                {monthPaypayTotalOrder}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                新規会員数
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                キャンセル数
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                合計会員数
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                ダウンロード数
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
                                            </TableCell>
                                            <TableCell>0
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
    );
};

export default Dashboard;
