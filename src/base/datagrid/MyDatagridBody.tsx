import * as React from "react";
import { DatagridBody } from 'react-admin';
import MyDatagridRow from "./MyDatagridRow";


const MyDatagridBody = (props: any) => {
    return (<DatagridBody {...props} hasBulkActions={false} isRowSelectable={() => { return false; }}/>)
}

export default MyDatagridBody;