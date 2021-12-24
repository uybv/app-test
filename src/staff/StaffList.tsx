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
        <MyDatagrid optimized>
            <TextField source="username" sortable={false} />
            <TextField source="display_name" sortable={false} />
            <DateField source="created_at" showTime sortable={false} />
            <EditButton />
        </MyDatagrid>
    </List>
);

export default StaffList;
