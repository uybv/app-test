import * as React from 'react';
import { useCallback } from 'react';
import {
    BooleanInput,
    DateField,
    Edit,
    EditProps,
    FormWithRedirect,
    Labeled,
    ReferenceField,
    SelectField,
    TextField,
    Toolbar,
    useTranslate,
    TopToolbar,
    ListButton,
    SaveButton,
    DeleteButton,
    useCreate,
    useRedirect,
    useNotify,
    ReferenceArrayInput,
    AutocompleteArrayInput,
    required
} from 'react-admin';
import {
    Card,
    CardContent,
    Box,
    Grid,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Order, Customer, OrderState } from '../types';
import Basket from './Basket';
import Totals from './Totals';
import { ChevronLeft, Delete } from '@material-ui/icons';

interface OrderTitleProps {
    record?: Order;
}

const OrderTitle = ({ record }: OrderTitleProps) => {
    // const translate = useTranslate();
    return record ? (
        <span>
            Order
        </span>
    ) : null;
};

const CustomerDetails = ({ record }: { record?: Customer }) => (
    <Box display="flex" flexDirection="column">
        <Typography>
            {(record?.display_name.first_name || record?.display_name.last_name)
                ? (record?.display_name.first_name + ' ' + record?.display_name.last_name)
                : 'お客様'
            }
        </Typography>
        <Typography>
            {record?.email}
        </Typography>
    </Box>
);

const BranchDetails = ({ record }: { record?: any }) => (
    <Box display="flex" flexDirection="column">
        <Typography>
            {record?.name}
        </Typography>
    </Box>
);

const useEditStyles = makeStyles({
    root: { alignItems: 'flex-start' },
    delete: {
        color: 'red'
    }
});

const useButtonStyles = makeStyles({
    delete: {
        color: 'red'
    }
});

const EditActions = ({ basePath, data }: any) => (
    <TopToolbar>
        <ListButton basePath={basePath} icon={<ChevronLeft />} />
    </TopToolbar>
);

const Spacer = () => <Box m={1}>&nbsp;</Box>;

const OrderForm = (props: any) => {
    const translate = useTranslate();
    const classes = useButtonStyles();
    return (
        <FormWithRedirect
            {...props}
            render={(formProps: any) => (
                <Box maxWidth="50em">
                    <Card>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={8}>
                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'resources.order.section.order'
                                        )}
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Labeled
                                                source="created_time"
                                                resource="order"
                                            >
                                                <DateField
                                                    label="注文日時"
                                                    source="created_time"
                                                    resource="order"
                                                    record={formProps.record}
                                                    showTime
                                                />
                                            </Labeled>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Labeled
                                                source="created_time"
                                                resource="order"
                                            >
                                                <ReferenceField
                                                    label="店舗"
                                                    source="branch_id"
                                                    resource="order"
                                                    reference="branch"
                                                    basePath="/branch"
                                                    record={formProps.record}
                                                    link={false}
                                                >
                                                    <BranchDetails />
                                                </ReferenceField>
                                            </Labeled>

                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Labeled
                                                source="st"
                                                resource="order"
                                            >
                                                <SelectField
                                                    label="状態"
                                                    resource="order"
                                                    source="st"
                                                    choices={[
                                                        {
                                                            id: 10,
                                                            name: '注文済み',
                                                        },
                                                        {
                                                            id: 89,
                                                            name: '来店待ち',
                                                        },
                                                        {
                                                            id: 90,
                                                            name: '完了',
                                                        },
                                                        {
                                                            id: 81,
                                                            name: 'キャンセル済み',
                                                        },
                                                    ]}
                                                />
                                            </Labeled>

                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Labeled
                                                label="受取番号"
                                                source="queuing"
                                                resource="order"
                                            >
                                                <TextField
                                                    label="受取番号"
                                                    source="queuing"
                                                    resource="order"
                                                />
                                            </Labeled>

                                        </Grid>

                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Labeled
                                                label="来店予定時刻"
                                                source="delivery_est"
                                                resource="order"
                                            >
                                                <DateField
                                                    label="来店予定時刻"
                                                    source="delivery_est"
                                                    resource="order"
                                                    record={formProps.record}
                                                    showTime
                                                />
                                            </Labeled>

                                        </Grid>

                                    </Grid>

                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'resources.order.section.customer'
                                        )}
                                    </Typography>
                                    <ReferenceField
                                        source="user_id"
                                        resource="order"
                                        reference="customer"
                                        basePath="/customer"
                                        record={formProps.record}
                                        link={true}
                                    >
                                        <CustomerDetails />
                                    </ReferenceField>
                                    <Spacer />
                                </Grid>
                            </Grid>
                            <Spacer />

                            <Typography variant="h6" gutterBottom>
                                {translate('resources.order.section.items')}
                            </Typography>
                            <Box>
                                <Basket record={formProps.record} />
                            </Box>
                            <Spacer />

                            <Typography variant="h6" gutterBottom>
                                {translate('resources.order.section.total')}
                            </Typography>
                            <Box>
                                <Totals record={formProps.record} />
                            </Box>
                            {formProps.record.st === OrderState.WAITING_RECEIVE && (
                                <Box style={{ marginTop: 35 }}>
                                    <ReferenceArrayInput
                                        label="スタッフ"
                                        reference="staff"
                                        source="staff_ids"
                                        validate={[required()]}
                                    >
                                        <AutocompleteArrayInput optionText="username" />
                                    </ReferenceArrayInput>
                                </Box>
                            )}

                        </CardContent>
                        <Toolbar
                            record={formProps.record}
                            basePath={formProps.basePath}
                            undoable={false}
                            invalid={formProps.invalid}
                            handleSubmit={formProps.handleSubmit}
                            saving={formProps.saving}
                            resource="order"
                        >
                            {formProps.record.st === OrderState.PAID && (
                                <Box display="flex" justifyContent="space-between" width="100%">
                                    <SaveButton
                                        label="来店待ちに変更する"
                                        saving={formProps.saving}
                                        handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                        transform={data => ({ ...data, st: OrderState.WAITING_RECEIVE })}
                                    />
                                    <SaveButton
                                        label="キャンセル"
                                        className={classes.delete}
                                        saving={formProps.saving}
                                        handleSubmitWithRedirect={
                                            () => {
                                                if (!window.confirm('本当にキャンセルしますか?'))
                                                    return false;
                                                return formProps.handleSubmitWithRedirect();
                                            }
                                        }
                                        icon={<Delete />}
                                        variant="text"
                                        transform={data => ({ ...data, st: OrderState.CANCEL })}
                                    />
                                </Box>
                            )}
                            {formProps.record.st === OrderState.WAITING_RECEIVE && (
                                <Box display="flex" justifyContent="space-between" width="100%">
                                    <SaveButton
                                        label="完了する"
                                        saving={formProps.saving}
                                        handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                        transform={data => ({ ...data, st: OrderState.COMPLETE })}
                                    />
                                    <SaveButton
                                        label="注文済みに戻す"
                                        saving={formProps.saving}
                                        variant="outlined"
                                        icon={<></>}
                                        handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                        transform={data => ({ ...data, st: OrderState.PAID })}
                                    />
                                    <SaveButton
                                        label="キャンセル"
                                        className={classes.delete}
                                        saving={formProps.saving}
                                        handleSubmitWithRedirect={
                                            () => {
                                                if (!window.confirm('本当にキャンセルしますか?'))
                                                    return false;
                                                return formProps.handleSubmitWithRedirect();
                                            }
                                        }
                                        icon={<Delete />}
                                        variant="text"
                                        transform={data => ({ ...data, st: OrderState.CANCEL })}
                                    />
                                </Box>
                            )}
                            {formProps.record.st === OrderState.COMPLETE && (
                                <Box display="flex" justifyContent="space-between" width="100%">
                                    <SaveButton
                                        label="来店待ちに変更する"
                                        variant="outlined"
                                        icon={<></>}
                                        saving={formProps.saving}
                                        handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                        transform={data => ({ ...data, st: OrderState.WAITING_RECEIVE })}
                                    />
                                    <SaveButton
                                        label="キャンセル"
                                        className={classes.delete}
                                        saving={formProps.saving}
                                        handleSubmitWithRedirect={
                                            () => {
                                                if (!window.confirm('本当にキャンセルしますか?'))
                                                    return false;
                                                return formProps.handleSubmitWithRedirect();
                                            }
                                        }
                                        icon={<Delete />}
                                        variant="text"
                                        transform={data => ({ ...data, st: OrderState.CANCEL })}
                                    />
                                </Box>
                            )}
                        </Toolbar>
                    </Card>
                </Box>
            )}
        />
    );
};
const OrderEdit = (props: EditProps) => {
    const classes = useEditStyles();
    return (
        <Edit
            title={<OrderTitle />}
            classes={classes}
            {...props}
            component="div"
            actions={<EditActions />}
        >
            <OrderForm />
        </Edit>
    );
};

export default OrderEdit;
