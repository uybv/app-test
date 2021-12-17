import * as React from "react";
import { Datagrid } from 'react-admin';
import MyDatagridBody from "./MyDatagridBody";
import MyDatagridHeader from "./MyDatagridHeader";

const MyDatagrid = (props: any) => <Datagrid {...props} header={<MyDatagridHeader />} body={<MyDatagridBody />} />;

export default MyDatagrid;