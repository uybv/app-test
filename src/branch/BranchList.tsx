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

const BranchList = (props: ListProps) => (
    <List
        {...props}
        sort={{ field: 'name', order: 'ASC' }}
        perPage={20}
        pagination={false}
        component="div"
        filter={branchFilters}
    >
        <Datagrid optimized rowClick="edit">
            <TextField source="name" />
            <TextField source="description" />
            <DateField source="created_at" />
        </Datagrid>
    </List>
);

export default BranchList;
