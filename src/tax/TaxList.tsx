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
            <TextField source="name" sortable={false} />
            <TextField source="value" sortable={false} />
            <TextField source="description" sortable={false} />
            <DateField source="created_at" showTime sortable={false} />
            <EditButton />
        </MyDatagrid>
    </List>
);

export default TaxList;
