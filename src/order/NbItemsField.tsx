import * as React from 'react';
import { FunctionField, FieldProps } from 'react-admin';
import { Order } from '../types';

const render = (record?: Order) => record && record.foods.length;

const NbItemsField = ({ record }: FieldProps<Order>) => (
    <FunctionField<Order> record={record} render={render} />
);

NbItemsField.defaultProps = {
    label: 'resources.order.fields.nb_items',
    textAlign: 'right',
};

export default NbItemsField;
