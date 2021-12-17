import * as React from 'react';
import {
    List, ListProps,
    EditButton,
    DateField,
    TextField,
    SearchInput,
    TopToolbar,
    CreateButton,
    FilterButton
} from 'react-admin';
import MyDatagrid from '../datagrid/MyDatagrid';

const filters = [
    <SearchInput source="q" alwaysOn />,
];

const ListActions = (props: any) => (
    <TopToolbar>
        <FilterButton />
        <CreateButton />
    </TopToolbar>
);

const StaffList = (props: ListProps) => (
    <List
        {...props}
        perPage={50}
        pagination={false}
        component="div"
        filters={filters}
        actions={<ListActions />}
    >
        <MyDatagrid optimized rowClick="edit">
            <TextField source="username" />
            <TextField source="display_name" />
            <DateField source="created_at" showTime />
            <EditButton />
        </MyDatagrid>
    </List>
);

export default StaffList;
