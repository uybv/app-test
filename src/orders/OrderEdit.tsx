import * as React from 'react';
import { useCallback } from 'react';
import {
    TextInput,
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
    useUpdate,
    useRedirect,
    useNotify,
    useRefresh,
    useDelete,
    ReferenceInput,
    SelectInput,
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
    const [deleteOne] = useDelete();
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
   
    const handleUpdate = async (record: any, data: any, isRedirect = true) => {
        await update('order', record.id, data, {});
        notify(`更新しました`);
        if (isRedirect) {
            redirect('list', '/order?displayedFilters=%7B%7D&filter=%7B"st"%3A' + (data.st ? data.st : OrderState.PAID) + '%7D&order=DESC&page=1&perPage=50&sort=created_time');
        }
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
                                                            name: '1.オーダー',
                                                        },
                                                        {
                                                            id: 89,
                                                            name: '2.確認済',
                                                        },
                                                        {
                                                            id: 90,
                                                            name: '3.受取済',
                                                        },
                                                        {
                                                            id: 81,
                                                            name: '4.その他',
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
                                                label="来店予定日時"
                                                source="delivery_est"
                                                resource="order"
                                            >
                                                <DateField
                                                    label="来店予定日時"
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
                                                    label="受取日時"
                                                    source="complete_time"
                                                    resource="order"
                                                >
                                                    <DateField
                                                        label="受取日時"
                                                        source="complete_time"
                                                        resource="order"
                                                        record={formProps.record}
                                                        showTime
                                                    />
                                                </Labeled>

                                            </Grid>
                                        )}
                                        {formProps.record.st === OrderState.CANCEL && (
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Labeled
                                                    label="受取日時"
                                                    source="cancel_time"
                                                    resource="order"
                                                >
                                                    <DateField
                                                        label="受取日時"
                                                        source="cancel_time"
                                                        resource="order"
                                                        record={formProps.record}
                                                        showTime
                                                    />
                                                </Labeled>

                                            </Grid>
                                        )}

                                    </Grid>
                                    {(formProps.record.st === OrderState.COMPLETE || formProps.record.st === OrderState.CANCEL) && (
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
                                <Totals record={formProps.record} handleUpdate={handleUpdate} />
                            </Box>
                            {formProps.record.st === OrderState.WAITING_RECEIVE && (
                                <Box style={{ marginTop: 35 }}>
                                    <ReferenceInput
                                        label="スタッフ"
                                        reference="staff"
                                        source="staff_id"
                                        validate={[required()]}
                                    >
                                        <SelectInput optionText="display_name" />
                                    </ReferenceInput>
                                </Box>
                            )}
                            {formProps.record.st === OrderState.CANCEL && (
                                <Box style={{ marginTop: 35 }}>
                                    <TextInput fullWidth source="cancel_reason" label="その他理由" />
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
                                        label="2.確認済に変更"
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
                                            if (!window.confirm('本当に変更しますか?'))
                                                return false;
                                            handleUpdate(formProps.record, { st: OrderState.CANCEL });
                                        }}
                                    >
                                        4.その他に変更
                                    </Button>
                                </Box>
                            )}
                            {formProps.record.st === OrderState.WAITING_RECEIVE && (
                                <Box display="flex" justifyContent="space-between" width="100%">
                                    <SaveButton
                                        label="3.受取済に変更"
                                        undoable={false}
                                        saving={formProps.saving}
                                        handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                        transform={data => ({ ...data, st: OrderState.COMPLETE })}
                                    />
                                    <Button
                                        variant={'outlined'}
                                        type={'button'}
                                        color={'default'}
                                        onClick={() => { handleUpdate(formProps.record, { st: OrderState.PAID }); }}
                                    >
                                        1.オーダーに戻す
                                    </Button>
                                    <Button
                                        className={classes.label}
                                        variant={'text'}
                                        type={'button'}
                                        color={'default'}
                                        startIcon={<Delete />}
                                        onClick={() => {
                                            if (!window.confirm('本当に変更しますか?'))
                                                return false;
                                            handleUpdate(formProps.record, { st: OrderState.CANCEL });
                                        }}
                                    >
                                        4.その他に変更
                                    </Button>
                                </Box>
                            )}
                            {formProps.record.st === OrderState.COMPLETE && (
                                <Box display="flex" justifyContent="space-between" width="100%">
                                    <SaveButton
                                        label="2.確認済に変更"
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
                                            if (!window.confirm('本当に変更しますか?'))
                                                return false;
                                            handleUpdate(formProps.record, { st: OrderState.CANCEL });
                                        }}
                                    >
                                        4.その他に変更
                                    </Button>
                                </Box>
                            )}
                            {formProps.record.st === OrderState.CANCEL && (
                                <Box display="flex" justifyContent="space-between" width="100%">
                                    <SaveButton
                                        label="保存"
                                        undoable={false}
                                        saving={formProps.saving}
                                        handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                        transform={data => {
                                            return { cancel_reason: data?.cancel_reason }
                                        }}
                                    />
                                    {!formProps.record.refund_total && (
                                        <Button
                                            variant={'outlined'}
                                            type={'button'}
                                            color={'default'}
                                            onClick={() => { handleUpdate(formProps.record, { st: OrderState.PAID }); }}
                                        >
                                            1.オーダーに戻す
                                        </Button>
                                    )}
                                    <Button
                                        className={classes.label}
                                        variant={'text'}
                                        type={'button'}
                                        color={'default'}
                                        startIcon={<Delete />}
                                        onClick={() => {
                                            if (!window.confirm('本当に削除しますか?'))
                                                return false;
                                            deleteOne('order', formProps.record.id, formProps.record);
                                        }}
                                    >
                                        削除
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
        redirect('list', '/order?displayedFilters=%7B%7D&filter=%7B"st"%3A' + data.st + '%7D&order=DESC&page=1&perPage=50&sort=created_time');
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
