/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import {
    Loading,
    useGetMany
} from 'react-admin';
import QRCode from 'qrcode.react';
import { CloudDownload } from '@material-ui/icons';
import { apiBaseUrl } from '../config';
import { useFormState } from 'react-final-form';
import { Table, TableBody, TableCell, TableRow, Button } from '@material-ui/core';
import CustomImageField from '../base/list/CustomImageField';

const QrCodeField = (props: any) => {
    const { record, branchId } = props;
    if (!record) return null;
    return (
        <QRCode id={record.id} size={150} value={apiBaseUrl + "/app/qr/?type=food-branch&food_id=" + record.id + "&branch_id=" + branchId} />
    );
};

const QrCodeDownloadButton = (props: any) => {
    const { record, branchId } = props;
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
                    downloadLink.download = 'foo_branch_' + record.id + '.png';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                }}
            >
                QRダウンロード
            </Button>
            <div style={{ display: "none" }}>
                <QrCodeField  {...props} branchId={branchId} />
            </div>
        </>
    );
};


const BranchMenuFoodField = (props: any) => {
    const { values } = useFormState();
    if (!values) {
        return null;
    }

    const { data, loading, error } = useGetMany('product', values?.food_ids ?? []);
    if (loading) { return <Loading />; }
    if (error) { return <p>ERROR</p>; }
    return (
        <Table>
            <TableBody>
                {data.map(food => (
                    <TableRow>
                        <TableCell>
                            <CustomImageField source="image" noimage="food" record={food} />
                        </TableCell>
                        <TableCell style={{ wordBreak: 'break-word' }}>{food?.name}</TableCell>
                        <TableCell>
                            {(food?.price ?? 0).toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'JPY',
                            })}
                        </TableCell>
                        <TableCell>
                            <QrCodeDownloadButton record={food} branchId={values.id}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BranchMenuFoodField;
