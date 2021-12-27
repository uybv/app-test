import * as React from 'react';
import {
    List, ListProps,
    EditButton,
    TextField,
    SearchInput,
    TopToolbar,
    FilterButton,
    CreateButton,
    Datagrid
} from 'react-admin';
import QRCode from 'qrcode.react';
import Button from '@material-ui/core/Button';
import { CloudDownload } from '@material-ui/icons'
import { apiBaseUrl } from '../config';
import MyDatagrid from '../base/datagrid/MyDatagrid';
import MyList from '../base/list/MyList';

const branchFilters = [
    <SearchInput source="q" alwaysOn />,
];

const QrCodeField = (props: any) => {
    const { record } = props;
    if (!record) return null;
    return (
        <QRCode id={record.id} size={150} value={apiBaseUrl + "/app/qr/?type=branch&id=" + record.id} />
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
                    downloadLink.download = 'branch_' + record.id + '.png';
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

const BranchList = (props: ListProps) => (
    <MyList
        {...props}
        perPage={50}
        pagination={false}
        component="div"
        filters={branchFilters}
        actions={<ListActions />}
    >
        <MyDatagrid optimized>
            <TextField source="name" sortable={false} />
            <TextField source="address.address" sortable={false} />
            <QrCodeDownloadButton sortable={false} />
            <EditButton />
        </MyDatagrid>
    </MyList>
);

export default BranchList;
