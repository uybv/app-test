import * as React from 'react';
import {
    BooleanInput,
    DateField,
    Edit,
    EditProps,
    FormWithRedirect,
    Labeled,
    ReferenceField,
    SelectInput,
    TextField,
    Toolbar,
    useTranslate,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardContent,
    Box,
    Grid,
    Typography,
    Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Order, Customer } from '../types';
import Basket from './Basket';
import Totals from './Totals';

interface OrderTitleProps {
    record?: Order;
}

const OrderTitle = ({ record }: OrderTitleProps) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.order.title', {
                reference: record.reference,
            })}
        </span>
    ) : null;
};

const CustomerDetails = ({ record }: { record?: Customer }) => (
    <Box display="flex" flexDirection="column">
        <Typography
            component={RouterLink}
            color="primary"
            to={`/customers/${record?.id}`}
            style={{ textDecoration: 'none' }}
        >
            {record?.display_name.first_name} {record?.display_name.last_name}
        </Typography>
        <Typography
            component={Link}
            color="primary"
            href={`mailto:${record?.email}`}
            style={{ textDecoration: 'none' }}
        >
            {record?.email}
        </Typography>
    </Box>
);

const BranchDetails = ({ record }: { record?: any }) => (
    <Box display="flex" flexDirection="column">
        <Typography
            component={RouterLink}
            color="primary"
            to={`/branch/${record?.id}`}
            style={{ textDecoration: 'none' }}
        >
            {record?.name}
        </Typography>
    </Box>
);

const useEditStyles = makeStyles({
    root: { alignItems: 'flex-start' },
});

const Spacer = () => <Box m={1}>&nbsp;</Box>;

const OrderForm = (props: any) => {
    const translate = useTranslate();
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
                                                    source="created_time"
                                                    resource="order"
                                                    record={formProps.record}
                                                />
                                            </Labeled>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                {translate(
                                                    'resources.order.section.branch'
                                                )}
                                            </Typography>
                                            <ReferenceField
                                                source="branch_id"
                                                resource="order"
                                                reference="branch"
                                                basePath="/branch"
                                                record={formProps.record}
                                                link={false}
                                            >
                                                <BranchDetails />
                                            </ReferenceField>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <SelectInput
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
                                        link={false}
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
                        </CardContent>
                        <Toolbar
                            record={formProps.record}
                            basePath={formProps.basePath}
                            undoable={true}
                            invalid={formProps.invalid}
                            handleSubmit={formProps.handleSubmit}
                            saving={formProps.saving}
                            resource="order"
                        />
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
        >
            <OrderForm />
        </Edit>
    );
};

export default OrderEdit;
