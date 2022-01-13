import * as React from 'react';
import { useEffect } from 'react';
import {
    List, ListProps,
    DateField,
    TextField,
    SearchInput,
    EditButton,
    TopToolbar,
    FilterButton,
    CreateButton,
    useRedirect,
    useNotify,
    usePermissions
} from 'react-admin';
import QRCode from 'qrcode.react';
import { Button } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons'
import { apiBaseUrl } from '../config';
import MyDatagrid from '../base/datagrid/MyDatagrid';
import NewsStatusField from './NewsStatusField';

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
                ＱＲダウンロード
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
        <CreateButton />
    </TopToolbar>
);

const NewList = (props: ListProps) => {
    const redirect = useRedirect();
    const notify = useNotify();
    const { permissions } = usePermissions();

    useEffect(() => {
        if (permissions && permissions !== 'admin') {
            notify(`Permission Denied`);
            redirect('list');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [permissions]);

    return (
        <List
            {...props}
            perPage={50}
            pagination={false}
            component="div"
            filters={filters}
            actions={<ListActions />}
        >
            <MyDatagrid optimized>
                <NewsStatusField sortable={false} />
                <TextField source="title" sortable={false} />
                <DateField source="publish_time" showTime sortable={false} />
                <DateField source="expired_time" showTime sortable={false} />
                {/* <DateField source="created_at" showTime sortable={false} /> */}
                <QrCodeDownloadButton />
                <EditButton />
            </MyDatagrid>
        </List>
    )
};

export default NewList;
