import * as React from 'react';
import {
    List, ListProps,
    EditButton,
    DateField,
    TextField,
    SearchInput,
} from 'react-admin';
import MyDatagrid from '../datagrid/MyDatagrid';

const branchFilters = [
    <SearchInput source="q" alwaysOn />,
];

const StaffList = (props: ListProps) => (
    <List
        {...props}
        sort={{ field: 'username', order: 'ASC' }}
        perPage={20}
        pagination={false}
        component="div"
        filters={branchFilters}
    >
        <MyDatagrid optimized rowClick="edit">
            <TextField source="username" />
            <TextField source="display_name" />
            <DateField source="created_at" />
            <EditButton />
        </MyDatagrid>
    </List>
);

export default StaffList;
