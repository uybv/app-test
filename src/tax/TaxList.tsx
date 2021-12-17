import * as React from 'react';
import {
    List, 
    ListProps,
    EditButton,
    DateField,
    TextField,
    TopToolbar,
    CreateButton
} from 'react-admin';
import MyDatagrid from '../datagrid/MyDatagrid';

const ListActions = (props: any) => (
    <TopToolbar>
        <CreateButton/>
    </TopToolbar>
);

const TaxList = (props: ListProps) => (
    <List
        {...props}
        perPage={50}
        pagination={false}
        component="div"
        actions={<ListActions />}
    >
        <MyDatagrid optimized>
            <TextField source="name" />
            <TextField source="value" />
            <TextField source="description" />
            <DateField source="created_at" showTime />
            <EditButton />
        </MyDatagrid>
    </List>
);

export default TaxList;
