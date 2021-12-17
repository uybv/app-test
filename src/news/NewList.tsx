import * as React from 'react';
import {
    List, ListProps,
    DateField,
    TextField,
    SearchInput,
    EditButton,
    TopToolbar,
    FilterButton,
    CreateButton
} from 'react-admin';
import QRCode from 'qrcode.react';
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

const ListActions = (props: any) => (
    <TopToolbar>
        <FilterButton />
        <CreateButton/>
    </TopToolbar>
);

const NewList = (props: ListProps) => (
    <List
        {...props}
        perPage={50}
        pagination={false}
        component="div"
        filters={filters}
        actions={<ListActions />}
    >
        <MyDatagrid optimized>
            <TextField source="title" />
            <DateField source="publish_time" showTime />
            <DateField source="expired_time" showTime />
            <DateField source="created_at" showTime />
            <QrCodeDownloadButton />
            <EditButton />
        </MyDatagrid>
    </List>
);

export default NewList;
