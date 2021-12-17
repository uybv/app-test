import * as React from 'react';
import {
    List, ListProps,
    Datagrid,
    DateField,
    TextField,
    SearchInput,
    EditButton
} from 'react-admin';
import QRCode from 'qrcode.react';
import KeywordsField from './KeywordsField';
import TagsField from './TagsField';
import { Button } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons'
import { apiBaseUrl } from '../config';
import MyDatagrid from '../datagrid/MyDatagrid';

const filters = [
    <SearchInput source="q" alwaysOn />,
];

const QrCodeField = (props: any) => {
    const { record } = props;
    if (!record) return null;
    return (
        <QRCode id={record.id} size={150} value={apiBaseUrl + "/app/qr/?type=news&id=" + record.id} />
    );
};

const QrCodeDownloadButton = (props: any) => {
    const { record } = props;
    if (!record) return null;
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<CloudDownload />}
                onClick={() => {
                    const canvas = document.getElementById(record.id) as any;
                    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                    let downloadLink = document.createElement('a');
                    downloadLink.href = pngUrl;
                    downloadLink.download = 'news_' + record.id + '.png';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                }}
            >
                ＱＲコードのダウンロード
            </Button>
            <div style={{ display: "none" }}>
                <QrCodeField  {...props} />
            </div>
        </>
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
        <MyDatagrid optimized>
            <TextField source="title" />
            <DateField source="publish_time" showTime />
            <DateField source="expired_time" showTime />
            {/* <KeywordsField /> */}
            {/* <TagsField /> */}
            <DateField source="created_at" />
            <QrCodeDownloadButton />
            <EditButton />
        </MyDatagrid>
    </List>
);

export default NewList;
