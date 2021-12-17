import * as React from "react";
import { DatagridBody } from 'react-admin';
import MyDatagridRow from "./MyDatagridRow";


const MyDatagridBody = (props: any) => <DatagridBody {...props} row={<MyDatagridRow />} />

export default MyDatagridBody;