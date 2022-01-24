import * as React from 'react';
import PropTypes from 'prop-types';
import {
    NumberField,
    TextField,
    DateField,
    useTranslate,
    useGetList,
    Record,
    RecordMap,
    Identifier,
    useLocale,
} from 'react-admin';
import {
    Typography,
    Card,
    CardContent,
    Box,
    Link,
    Stepper,
    Step,
    StepLabel,
    StepContent,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { makeStyles } from '@material-ui/core/styles';

import order from '../order';
import { Order as OrderRecord } from '../types';

const useAsideStyles = makeStyles(theme => ({
    root: {
        width: 400,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
}));

interface AsideProps {
    record?: Record;
    basePath?: string;
}

const Aside = ({ record, basePath }: AsideProps) => {
    const classes = useAsideStyles();
    return (
        <div className={classes.root}>
            {record && <EventList record={record} basePath={basePath} />}
        </div>
    );
};

Aside.propTypes = {
    record: PropTypes.any,
    basePath: PropTypes.string,
};

interface EventListProps {
    record?: Record;
    basePath?: string;
}

const useEventStyles = makeStyles({
    stepper: {
        background: 'none',
        border: 'none',
        marginLeft: '0.3em',
    },
});

const EventList = ({ record, basePath }: EventListProps) => {
    const translate = useTranslate();
    const classes = useEventStyles();
    const locale = useLocale();
    const { data: orders, ids: orderIds } = useGetList<OrderRecord>(
        'user',
        { page: 1, perPage: 100 },
        { field: 'date', order: 'DESC' },
        { user_id: record && record.id }
    );
    const events = processOrders(orders, orderIds);

    return (
        <>
            <Box m="0 0 1em 1em">
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {translate(
                                'resources.user.fieldGroups.history'
                            )}
                        </Typography>
                        <Box display="flex">
                            <Box flexGrow={1}>
                                <Box display="flex" mb="1em">
                                    <Box mr="1em">
                                        <AccessTimeIcon
                                            fontSize="small"
                                            color="disabled"
                                        />
                                    </Box>
                                    <Box flexGrow={1}>
                                        <Typography>
                                            {translate(
                                                'resources.user.fields.first_seen'
                                            )}
                                        </Typography>
                                        <DateField
                                            record={record}
                                            source="first_seen"
                                        />
                                    </Box>
                                </Box>
                                {orderIds && orderIds.length > 0 && (
                                    <Box display="flex">
                                        <Box mr="1em">
                                            <order.icon
                                                fontSize="small"
                                                color="disabled"
                                            />
                                        </Box>
                                        <Box flexGrow={1}>
                                            <Typography>
                                                {translate(
                                                    'resources.commands.amount',
                                                    {
                                                        smart_count:
                                                            orderIds.length,
                                                    }
                                                )}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                            <Box flexGrow={1}>
                                <Box display="flex" mb="1em">
                                    <Box mr="1em">
                                        <AccessTimeIcon
                                            fontSize="small"
                                            color="disabled"
                                        />
                                    </Box>
                                    <Box flexGrow={1}>
                                        <Typography>
                                            {translate(
                                                'resources.user.fields.last_seen'
                                            )}
                                        </Typography>
                                        <DateField
                                            record={record}
                                            source="last_seen"
                                        />
                                    </Box>
                                </Box>

                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Stepper orientation="vertical" classes={{ root: classes.stepper }}>
                {events.map(event => (
                    <Step
                        key={`${event.type}-${event.data.id}`}
                        expanded
                        active
                        completed
                    >
                        <StepLabel
                            StepIconComponent={() => {
                                const Component = order.icon;
                                return (
                                    <Component
                                        fontSize="small"
                                        color="disabled"
                                        style={{ paddingLeft: 3 }}
                                    />
                                );
                            }}
                        >
                            {new Date(event.date).toLocaleString(locale, {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            })}
                        </StepLabel>
                        <StepContent>
                            {event.type === 'order' ? (
                                <Order
                                    record={event.data as OrderRecord}
                                    key={`event_${event.data.id}`}
                                    basePath={basePath}
                                />
                            ) : null}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </>
    );
};

interface AsideEvent {
    type: string;
    date: Date;
    data: OrderRecord;
}

const processOrders = (
    orders?: RecordMap<OrderRecord>,
    orderIds?: Identifier[],
): AsideEvent[] => {
    const events =
        orderIds && orders
            ? orderIds.map<AsideEvent>(id => ({
                type: 'order',
                date: orders[id].date,
                data: orders[id],
            }))
            : [];
    events.sort(
        (e1, e2) => new Date(e2.date).getTime() - new Date(e1.date).getTime()
    );
    return events;
};

interface OrderProps {
    record?: OrderRecord;
    basePath?: string;
}

const Order = ({ record, basePath }: OrderProps) => {
    const translate = useTranslate();
    return record ? (
        <>
            <Typography variant="body2" gutterBottom>
                <Link to={`/order/${record.id}`} component={RouterLink}>
                    {translate('resources.commands.name', {
                        smart_count: 1,
                    })}{' '}
                    #{record.reference}
                </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {translate('resources.commands.nb_items', {
                    smart_count: record.basket.length,
                    _: '1 item |||| %{smart_count} items',
                })}
                &nbsp;-&nbsp;
                <NumberField
                    source="total"
                    options={{
                        style: 'currency',
                        currency: 'USD',
                    }}
                    record={record}
                    basePath={basePath}
                />
                &nbsp;-&nbsp;
                <TextField
                    source="status"
                    record={record}
                    basePath={basePath}
                />
            </Typography>
        </>
    ) : null;
};

export default Aside;
