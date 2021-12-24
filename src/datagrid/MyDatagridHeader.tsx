import * as React from "react";
import { DatagridHeader } from 'react-admin';

export const MyDatagridHeader = (props: any) => {
    return (
        <DatagridHeader {...props} hasBulkActions={false} isRowSelectable={() => { return false; }} />
    );
};

export default MyDatagridHeader;