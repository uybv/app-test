import * as React from 'react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import {
    AutocompleteInput,
    DatagridProps,
    Identifier,
    List,
    ListContextProvider,
    ListProps,
    ReferenceInput,
    useGetList,
    useListContext,
    EditButton,
    TopToolbar,
    FilterButton
} from 'react-admin';
import { Divider, Tabs, Tab } from '@material-ui/core';

import { Customer, OrderState } from '../types';
import MyDatagrid from '../datagrid/MyDatagrid';
import OrderCreatedTimeAndBranchField from './OrderCreatedTimeAndBranchField';
import OrderDeliveryTimeAndUserField from './OrderDeliveryTimeAndUserField';
import OrderFoodField from './OrderFoodField';
import OrderPaymentMethodAndTotalCostField from './OrderPaymentMethodAndTotalCostField';

const orderFilters = [
    <ReferenceInput source="user_id" reference="customer">
        <AutocompleteInput
            optionText={(choice: Customer) =>
                choice && choice.id // the empty choice is { id: '' }
                    ? `${choice.display_name.first_name} ${choice.display_name.last_name}`
                    : ''
            }
        />
    </ReferenceInput>,
    <ReferenceInput source="branch_id" reference="branch">
        <AutocompleteInput
            optionText={(choice: any) =>
                choice && choice.id // the empty choice is { id: '' }
                    ? `${choice.name}`
                    : ''
            }
        />
    </ReferenceInput>,
];

const tabs = [
    { id: 1, name: '注文済み' },
    { id: 2, name: '来店待ち' },
    { id: 3, name: '完了' },
    { id: 4, name: 'キャンセル済み' },
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
            let st = OrderState.PAID;
            switch (value) {
                case 1:
                    st = OrderState.PAID;
                    break;
                case 2:
                    st = OrderState.WAITING_RECEIVE;
                    break;
                case 3:
                    st = OrderState.COMPLETE;
                    break;
                case 4:
                    st = OrderState.CANCEL;
                    break;
            }
            setFilters &&
                setFilters(
                    { ...filterValues, st: st },
                    displayedFilters
                );
        },
        [displayedFilters, filterValues, setFilters]
    );

    const convertTabIndex = (st: any) => {
        let index = 1;
        switch (st) {
            case OrderState.PAID:
                index = 1;
                break;
            case OrderState.WAITING_RECEIVE:
                index = 2;
                break;
            case OrderState.COMPLETE:
                index = 3;
                break;
            case OrderState.CANCEL:
                index = 4;
                break;
        }

        return index;
    }

    return (
        <Fragment>
            <Tabs
                variant="fullWidth"
                centered
                value={convertTabIndex(filterValues.st)}
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
            <div>
                {filterValues.st === OrderState.PAID && (
                    <ListContextProvider
                        value={{ ...listContext, ids: ordered }}
                    >
                        <MyDatagrid {...props} optimized rowClick='edit'>
                            <OrderCreatedTimeAndBranchField />
                            <OrderDeliveryTimeAndUserField />
                            <OrderFoodField />
                            <OrderPaymentMethodAndTotalCostField />
                            <EditButton />
                        </MyDatagrid>
                    </ListContextProvider>
                )}
                {filterValues.st === OrderState.WAITING_RECEIVE && (
                    <ListContextProvider
                        value={{ ...listContext, ids: waitingReceive }}
                    >
                        <MyDatagrid {...props} optimized rowClick='edit'>
                            <OrderCreatedTimeAndBranchField />
                            <OrderDeliveryTimeAndUserField />
                            <OrderFoodField />
                            <OrderPaymentMethodAndTotalCostField />
                            <EditButton />
                        </MyDatagrid>
                    </ListContextProvider>
                )}
                {filterValues.st === OrderState.COMPLETE && (
                    <ListContextProvider
                        value={{ ...listContext, ids: completed }}
                    >
                        <MyDatagrid {...props} optimized rowClick='edit'>
                            <OrderCreatedTimeAndBranchField />
                            <OrderDeliveryTimeAndUserField />
                            <OrderFoodField />
                            <OrderPaymentMethodAndTotalCostField />
                            <EditButton />
                        </MyDatagrid>
                    </ListContextProvider>
                )}
                {filterValues.st === OrderState.CANCEL && (
                    <ListContextProvider
                        value={{ ...listContext, ids: cancelled }}
                    >
                        <MyDatagrid {...props} optimized rowClick='edit'>
                            <OrderCreatedTimeAndBranchField />
                            <OrderDeliveryTimeAndUserField />
                            <OrderFoodField />
                            <OrderPaymentMethodAndTotalCostField />
                            <EditButton />
                        </MyDatagrid>
                    </ListContextProvider>
                )}
            </div>
        </Fragment>
    );
};

const ListActions = (props: any) => (
    <TopToolbar>
        <FilterButton />
    </TopToolbar>
);

const OrderList = (props: ListProps) => (
    <List
        {...props}
        filterDefaultValues={{ st: OrderState.PAID }}
        perPage={50}
        filters={orderFilters}
        actions={<ListActions />}
    >
        <TabbedDatagrid />
    </List>
);

export default OrderList;
