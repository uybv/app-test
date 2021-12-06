import * as React from 'react';
import {
    List, ListProps,
    Datagrid,
    DateField,
    TextField,
    SearchInput,
} from 'react-admin';

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
        <Datagrid optimized rowClick="edit">
            <TextField source="username" />
            <TextField source="display_name" />
            <DateField source="created_at" />
        </Datagrid>
    </List>
);

export default StaffList;
