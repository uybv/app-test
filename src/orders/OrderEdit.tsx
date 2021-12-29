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
    useUpdate,
    useRedirect,
    useNotify,
    useRefresh,
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
    Button
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

const BranchDetail = ({ record }: { record?: any }) => (
    <Box display="flex" flexDirection="column">
        <Typography>
            {record?.name}
        </Typography>
    </Box>
);

const StaffDetail = ({ record }: { record?: any }) => (
    <Box display="flex" flexDirection="column">
        <Typography>
            {record?.display_name}
        </Typography>
    </Box>
);


const useEditStyles = makeStyles({
    root: { alignItems: 'flex-start' },
});

const useButtonStyles = makeStyles({
    label: {
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
    const [update] = useUpdate();
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const handleUpdateStatus = (record: any, st: OrderState) => {
        update('order', record.id, { st: st }, record);
        notify(`更新しました`);
        redirect('list', '/order?displayedFilters=%7B%7D&filter=%7B"st"%3A' + st + '%7D&order=ASC&page=1&perPage=50&sort=id');
        refresh();
    }

    return (
        <FormWithRedirect
            {...props}
            render={(formProps: any) => (
                <Box maxWidth="60em">
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
                                                source="branch_id"
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
                                                    <BranchDetail />
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
                                        {formProps.record.st === OrderState.COMPLETE && (
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Labeled
                                                    label="完了日時"
                                                    source="complete_time"
                                                    resource="order"
                                                >
                                                    <DateField
                                                        label="完了日時"
                                                        source="complete_time"
                                                        resource="order"
                                                        record={formProps.record}
                                                        showTime
                                                    />
                                                </Labeled>

                                            </Grid>
                                        )}

                                    </Grid>
                                    {formProps.record.st === OrderState.COMPLETE && (
                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Labeled
                                                    label="対応スタッフ"
                                                    source="staff_id"
                                                    resource="order"
                                                >
                                                    <ReferenceField
                                                        label="対応スタッフ"
                                                        source="staff_id"
                                                        resource="order"
                                                        reference="staff"
                                                        basePath="/staff"
                                                        record={formProps.record}
                                                        link={false}
                                                    >
                                                        <StaffDetail />
                                                    </ReferenceField>
                                                </Labeled>

                                            </Grid>
                                        </Grid>
                                    )}
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
                                        source="staff_id"
                                        validate={[required()]}
                                    >
                                        <AutocompleteArrayInput optionText="display_name" />
                                    </ReferenceArrayInput>
                                </Box>
                            )}

                        </CardContent>
                        <Toolbar
                            record={formProps.record}
                            basePath={formProps.basePath}
                            invalid={formProps.invalid}
                            handleSubmit={formProps.handleSubmit}
                            saving={formProps.saving}
                            resource="order"
                        >
                            {formProps.record.st === OrderState.PAID && (
                                <Box display="flex" justifyContent="space-between" width="100%">
                                    <SaveButton
                                        undoable={false}
                                        label="来店待ちに変更する"
                                        handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                        transform={data => ({ ...data, st: OrderState.WAITING_RECEIVE })}
                                    />
                                    <Button
                                        className={classes.label}
                                        variant={'text'}
                                        type={'button'}
                                        color={'default'}
                                        startIcon={<Delete />}
                                        onClick={() => {
                                            if (!window.confirm('本当にキャンセルしますか?'))
                                                return false;
                                            handleUpdateStatus(formProps.record, OrderState.CANCEL);
                                        }}
                                    >
                                        キャンセル
                                    </Button>
                                </Box>
                            )}
                            {formProps.record.st === OrderState.WAITING_RECEIVE && (
                                <Box display="flex" justifyContent="space-between" width="100%">
                                    <SaveButton
                                        label="完了する"
                                        undoable={false}
                                        saving={formProps.saving}
                                        handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                        transform={data => ({ ...data, st: OrderState.COMPLETE })}
                                    />
                                    <Button
                                        variant={'outlined'}
                                        type={'button'}
                                        color={'default'}
                                        onClick={() => { handleUpdateStatus(formProps.record, OrderState.PAID); }}
                                    >
                                        注文済みに戻す
                                    </Button>
                                    <Button
                                        className={classes.label}
                                        variant={'text'}
                                        type={'button'}
                                        color={'default'}
                                        startIcon={<Delete />}
                                        onClick={() => {
                                            if (!window.confirm('本当にキャンセルしますか?'))
                                                return false;
                                            handleUpdateStatus(formProps.record, OrderState.CANCEL);
                                        }}
                                    >
                                        キャンセル
                                    </Button>
                                </Box>
                            )}
                            {formProps.record.st === OrderState.COMPLETE && (
                                <Box display="flex" justifyContent="space-between" width="100%">
                                    <SaveButton
                                        label="来店待ちに変更する"
                                        undoable={false}
                                        variant="outlined"
                                        icon={<></>}
                                        saving={formProps.saving}
                                        handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                        transform={data => ({ ...data, st: OrderState.WAITING_RECEIVE })}
                                    />
                                    <Button
                                        className={classes.label}
                                        variant={'text'}
                                        type={'button'}
                                        color={'default'}
                                        startIcon={<Delete />}
                                        onClick={() => {
                                            if (!window.confirm('本当にキャンセルしますか?'))
                                                return false;
                                            handleUpdateStatus(formProps.record, OrderState.CANCEL);
                                        }}
                                    >
                                        キャンセル
                                    </Button>
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
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = ({ data }: any) => {
        notify(`更新しました`);
        redirect('list', '/order?displayedFilters=%7B%7D&filter=%7B"st"%3A' + data.st + '%7D&order=ASC&page=1&perPage=50&sort=id');
        refresh();
    };
    return (
        <Edit
            onSuccess={onSuccess}
            title={<OrderTitle />}
            classes={classes}
            component="div"
            undoable={false}
            mutationMode="pessimistic"
            actions={<EditActions />}
            {...props}
        >
            <OrderForm />
        </Edit>
    );
};

export default OrderEdit;
