import * as React from 'react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import {
    AutocompleteInput,
    BooleanField,
    Datagrid,
    DatagridProps,
    DateField,
    DateInput,
    Identifier,
    List,
    ListContextProvider,
    ListProps,
    NullableBooleanInput,
    NumberField,
    ReferenceInput,
    ReferenceField,
    SearchInput,
    TextField,
    TextInput,
    useGetList,
    useListContext,
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import NbItemsField from './NbItemsField';
import MobileGrid from './MobileGrid';
import { Customer, OrderState } from '../types';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import AddressField from '../visitors/AddressField';

const orderFilters = [
    <SearchInput source="q" alwaysOn />,
    <ReferenceInput source="customer_id" reference="customer">
        <AutocompleteInput
            optionText={(choice: Customer) =>
                choice && choice.id // the empty choice is { id: '' }
                    ? `${choice.display_name.first_name} ${choice.display_name.last_name}`
                    : ''
            }
        />
    </ReferenceInput>,
    // <DateInput source="date_gte" />,
    // <DateInput source="date_lte" />,
    // <TextInput source="total_gte" />,
    // <NullableBooleanInput source="returned" />,
];

const useDatagridStyles = makeStyles({
    total: { fontWeight: 'bold' },
});

const tabs = [
    { id: 1, name: '注文済み' },
    { id: 3, name: '来店待ち' },
    { id: 4, name: '完了' },
    { id: 9, name: 'キャンセル済み' },
];

interface TabbedDatagridProps extends DatagridProps { }

const useGetTotals = (filterValues: any) => {
    const { total: totalOrdered } = useGetList(
        'order',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, st: [OrderState.CART, OrderState.PAID] }
    );
    const { total: totalWaitingReceive } = useGetList(
        'order',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, st: OrderState.WAITING_RECEIVE }
    );
    const { total: totalCompleted } = useGetList(
        'order',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, st: OrderState.COMPLETE }
    );
    const { total: totalCancelled } = useGetList(
        'order',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, st: OrderState.CANCEL }
    );
    return {
        ordered: totalOrdered,
        waitingReceive: totalWaitingReceive,
        completed: totalCompleted,
        cancelled: totalCancelled,
    };
};

const TabbedDatagrid = (props: TabbedDatagridProps) => {
    const listContext = useListContext();
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const [ordered, setOrdered] = useState<Identifier[]>([] as Identifier[]);
    const [waitingReceive, setWaitingReceive] = useState<Identifier[]>(
        [] as Identifier[]
    );
    const [completed, setCompleted] = useState<Identifier[]>(
        [] as Identifier[]
    );
    const [cancelled, setCancelled] = useState<Identifier[]>(
        [] as Identifier[]
    );
    const totals = useGetTotals(filterValues) as any;

    useEffect(() => {
        console.log(ids);
        if (ids && ids !== filterValues.st) {
            switch (filterValues.st) {
                case OrderState.CART:
                case OrderState.PAID:
                    setOrdered(ids);
                    break;
                case OrderState.WAITING_RECEIVE:
                    setWaitingReceive(ids);
                    break;
                case OrderState.COMPLETE:
                    setCompleted(ids);
                    break;
                case OrderState.CANCEL:
                    setCancelled(ids);
                    break;
            }
        }
    }, [ids, filterValues.st]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<{}>, value: any) => {
            setFilters &&
                setFilters(
                    { ...filterValues, st: value },
                    displayedFilters
                );
        },
        [displayedFilters, filterValues, setFilters]
    );

    const selectedIds =
        filterValues.st === OrderState.CART
            ? ordered
            : filterValues.st === OrderState.WAITING_RECEIVE
                ? waitingReceive
                : filterValues.st === OrderState.COMPLETE
                    ? completed
                    : cancelled;

    return (
        <Fragment>
            <Tabs
                variant="fullWidth"
                centered
                value={filterValues.st}
                indicatorColor="primary"
                onChange={handleChange}
            >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={
                            totals[choice.name]
                                ? `${choice.name} (${totals[choice.name]})`
                                : choice.name
                        }
                        value={choice.id}
                    />
                ))}
            </Tabs>
            <Divider />
            {isXSmall ? (
                <ListContextProvider
                    value={{ ...listContext, ids: selectedIds }}
                >
                    <MobileGrid {...props} ids={selectedIds} />
                </ListContextProvider>
            ) : (
                <div>
                    {filterValues.st === OrderState.CART && (
                        <ListContextProvider
                            value={{ ...listContext, ids: ordered }}
                        >
                            <Datagrid {...props} optimized rowClick="edit">
                                <DateField source="created_time" showTime />
                                <CustomerReferenceField />
                                <NbItemsField />
                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'JYP',
                                    }}
                                    className={classes.total}
                                />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.st === OrderState.WAITING_RECEIVE && (
                        <ListContextProvider
                            value={{ ...listContext, ids: waitingReceive }}
                        >
                            <Datagrid {...props} optimized rowClick="edit">
                                <DateField source="created_time" showTime />
                                <CustomerReferenceField />
                                <NbItemsField />
                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'JYP',
                                    }}
                                    className={classes.total}
                                />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.st === OrderState.COMPLETE && (
                        <ListContextProvider
                            value={{ ...listContext, ids: completed }}
                        >
                            <Datagrid {...props} rowClick="edit">
                                <DateField source="created_time" showTime />
                                <CustomerReferenceField />
                                <NbItemsField />
                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'JYP',
                                    }}
                                    className={classes.total}
                                />
                                {/* <BooleanField source="returned" /> */}
                            </Datagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.st === OrderState.CANCEL && (
                        <ListContextProvider
                            value={{ ...listContext, ids: cancelled }}
                        >
                            <Datagrid {...props} rowClick="edit">
                                <DateField source="created_time" showTime />
                                <CustomerReferenceField />
                                <NbItemsField />
                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'JYP',
                                    }}
                                    className={classes.total}
                                />
                                {/* <BooleanField source="returned" /> */}
                            </Datagrid>
                        </ListContextProvider>
                    )}
                </div>
            )}
        </Fragment>
    );
};

const OrderList = (props: ListProps) => (
    <List
        {...props}
        filterDefaultValues={{ st: OrderState.CART }}
        sort={{ field: 'date', order: 'DESC' }}
        perPage={25}
        filters={orderFilters}
    >
        <TabbedDatagrid />
    </List>
);

export default OrderList;
