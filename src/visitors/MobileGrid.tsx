// in src/comments.js
import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import {
    DateField,
    EditButton,
    useTranslate,
    NumberField,
    Identifier,
} from 'react-admin';

import AvatarField from './AvatarField';
import ColoredNumberField from './ColoredNumberField';
import { Customer } from '../types';

const useStyles = makeStyles(theme => ({
    root: { margin: '1em' },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0.5rem 0',
    },
    cardTitleContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardContent: {
        ...theme.typography.body1,
        display: 'flex',
        flexDirection: 'column',
    },
}));

interface Props {
    ids?: Identifier[];
    data?: { [key: string]: Customer };
    basePath?: string;
}

const MobileGrid = ({ ids, data, basePath }: Props) => {
    const translate = useTranslate();
    const classes = useStyles();

    if (!ids || !data) {
        return null;
    }
    console.log(data);

    return (
        <div className={classes.root}>
            {ids.map(id => (
                <Card key={id} className={classes.card}>
                    <CardHeader
                        title={
                            <div className={classes.cardTitleContent}>
                                <h2>{`${data[id].display_name.first_name} ${data[id].display_name.last_name}`}</h2>
                                <EditButton
                                    resource="visitors"
                                    basePath={basePath}
                                    record={data[id]}
                                />
                            </div>
                        }
                        avatar={<AvatarField record={data[id]} size="45" />}
                    />
                    <CardContent className={classes.cardContent}>
                        <div>
                            {translate(
                                'resources.customer.fields.last_seen'
                            )}
                            &nbsp;
                            <DateField record={data[id]} source="last_seen" />
                        </div>
                        <div>
                            {translate(
                                'resources.order.name',
                                data[id].nb_commands || 1
                            )}
                            &nbsp;:&nbsp;
                            <NumberField
                                record={data[id]}
                                source="order"
                                label="resources.customer.fields.order"
                            />
                        </div>
                        <div>
                            {translate(
                                'resources.customer.fields.total_spent'
                            )}
                            &nbsp; :{' '}
                            <ColoredNumberField
                                record={data[id]}
                                source="total_spent"
                                options={{ style: 'currency', currency: 'JPY' }}
                            />
                        </div>
                    </CardContent>
                    {data[id].groups && data[id].groups.length > 0 && (
                        <CardContent className={classes.cardContent}>
                        </CardContent>
                    )}
                </Card>
            ))}
        </div>
    );
};

MobileGrid.defaultProps = {
    data: {},
    ids: [],
};

export default MobileGrid;
