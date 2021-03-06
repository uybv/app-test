import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import {
    AutocompleteInput,
    Identifier,
    ListContextProvider,
    ListProps,
    ReferenceInput,
    useListContext,
    TopToolbar,
    FilterButton,
} from 'react-admin';
import { Divider, Tabs, Tab } from '@material-ui/core';

import { User, OrderState } from '../types';
import MyDatagrid from '../base/datagrid/MyDatagrid';
import OrderCreatedTimeAndBranchField from './OrderCreatedTimeAndBranchField';
import OrderDeliveryTimeAndUserField from './OrderDeliveryTimeAndUserField';
import OrderFoodField from './OrderFoodField';
import OrderPaymentMethodAndTotalCostField from './OrderPaymentMethodAndTotalCostField';
import MyList from '../base/list/MyList';
import PrevNextPagination from '../base/list/PrevNextPagination';

const orderFilters = [
    <ReferenceInput source="branch_id" reference="branch" alwaysOn >
        <AutocompleteInput
            optionText={(choice: any) =>
                choice && choice.id // the empty choice is { id: '' }
                    ? `${choice.name}`
                    : ''
            }
        />
    </ReferenceInput>,
    <ReferenceInput source="user_id" reference="user" alwaysOn >
        <AutocompleteInput
            optionText={(choice: User) =>
                choice && choice.id // the empty choice is { id: '' }
                    ? `${choice.display_name.last_name} ${choice.display_name.first_name}`
                    : ''
            }
        />
    </ReferenceInput>,
];

const tabs = [
    { id: 1, name: '1.オーダー' },
    { id: 2, name: '2.確認済' },
    { id: 3, name: '3.受取済' },
    { id: 4, name: '4.その他' },
];

const TabbedDatagrid = (props: any) => {
    const listContext = useListContext();
    const { ids, filterValues, setFilters, displayedFilters, refetch } = listContext;

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

    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, 1000 * 60);
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
        return () => {
            clearInterval(interval)
          }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ids, filterValues]);

    const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
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
    }

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
                        label={choice.name}
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
                            <OrderCreatedTimeAndBranchField sortable={false} />
                            <OrderDeliveryTimeAndUserField sortable={false} />
                            <OrderFoodField sortable={false} />
                            <OrderPaymentMethodAndTotalCostField sortable={false} />
                        </MyDatagrid>
                    </ListContextProvider>
                )}
                {filterValues.st === OrderState.WAITING_RECEIVE && (
                    <ListContextProvider
                        value={{ ...listContext, ids: waitingReceive }}
                    >
                        <MyDatagrid {...props} optimized rowClick='edit'>
                            <OrderCreatedTimeAndBranchField sortable={false} />
                            <OrderDeliveryTimeAndUserField sortable={false} />
                            <OrderFoodField sortable={false} />
                            <OrderPaymentMethodAndTotalCostField sortable={false} />
                        </MyDatagrid>
                    </ListContextProvider>
                )}
                {filterValues.st === OrderState.COMPLETE && (
                    <ListContextProvider
                        value={{ ...listContext, ids: completed }}
                    >
                        <MyDatagrid {...props} optimized rowClick='edit'>
                            <OrderCreatedTimeAndBranchField sortable={false} />
                            <OrderDeliveryTimeAndUserField sortable={false} />
                            <OrderFoodField sortable={false} />
                            <OrderPaymentMethodAndTotalCostField sortable={false} />
                        </MyDatagrid>
                    </ListContextProvider>
                )}
                {filterValues.st === OrderState.CANCEL && (
                    <ListContextProvider
                        value={{ ...listContext, ids: cancelled }}
                    >
                        <MyDatagrid {...props} optimized rowClick='edit'>
                            <OrderCreatedTimeAndBranchField sortable={false} />
                            <OrderDeliveryTimeAndUserField sortable={false} />
                            <OrderFoodField sortable={false} />
                            <OrderPaymentMethodAndTotalCostField sortable={false} />
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
    <MyList
        {...props}
        pagination={<PrevNextPagination />}
        filterDefaultValues={{ st: OrderState.PAID }}
        perPage={50}
        sort={{ field: 'created_time', order: 'DESC' }}
        filters={orderFilters}
        actions={<ListActions />}
    >
        <TabbedDatagrid />
    </MyList>
);

export default OrderList;
