import * as React from 'react';
import {
    List, ListProps,
    Datagrid,
    DateField,
    TextField,
    SearchInput,
} from 'react-admin';
import QRCode from 'qrcode.react';
import KeywordsField from './KeywordsField';
import TagsField from './TagsField';

const filters = [
    <SearchInput source="q" alwaysOn />,
];

const QrCodeField = (props: any) => {
    const { record } = props;
    if (!record) return null;
    return (
        <QRCode size={120} value={"https://dev-app-api.wgs.jp/app/qr/?type=news&id=" + record.id} />
    );
};

const NewList = (props: ListProps) => (
    <List
        {...props}
        sort={{ field: 'title', order: 'ASC' }}
        perPage={20}
        pagination={false}
        component="div"
        filters={filters}
    >
        <Datagrid optimized rowClick="edit">
            <QrCodeField />
            <TextField source="title" />
            <DateField source="publish_time" showTime />
            <DateField source="expired_time" showTime />
            {/* <KeywordsField /> */}
            {/* <TagsField /> */}
            <DateField source="created_at" />
        </Datagrid>
    </List>
);

export default NewList;
