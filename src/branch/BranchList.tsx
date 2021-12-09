import * as React from 'react';
import {
    List, ListProps,
    Datagrid,
    DateField,
    TextField,
    SearchInput,
} from 'react-admin';
import QRCode from 'qrcode.react';
import { apiBaseUrl } from '../config';

const branchFilters = [
    <SearchInput source="q" alwaysOn />,
];

const QrCodeField = (props: any) => {
    const { record } = props;
    if (!record) return null;
    return (
        <QRCode size={120} value={apiBaseUrl + "/app/qr/?type=news&id=" + record.id} />
    );
};

const BranchList = (props: ListProps) => (
    <List
        {...props}
        sort={{ field: 'name', order: 'ASC' }}
        perPage={20}
        pagination={false}
        component="div"
        filters={branchFilters}
    >
        <Datagrid optimized rowClick="edit">
            <QrCodeField />
            <TextField source="name" />
            <TextField source="description" />
            <DateField source="created_at" />
        </Datagrid>
    </List>
);

export default BranchList;
