import * as React from 'react';
import {
    List, ListProps,
    EditButton,
    DateField,
    SearchInput,
    TextField,
    TopToolbar,
    FilterButton,
    CreateButton
} from 'react-admin';
import MyDatagrid from '../datagrid/MyDatagrid';

const categoryFilters = [
    <SearchInput source="q" alwaysOn />,
];

const ListActions = (props: any) => (
    <TopToolbar>
        <FilterButton />
        <CreateButton/>
    </TopToolbar>
);

const CategoryList = (props: ListProps) => (
    <List
        {...props}
        perPage={50}
        pagination={false}
        component="div"
        filters={categoryFilters}
        actions={<ListActions />}
    >
        <MyDatagrid optimized>
            <TextField source="name" />
            <TextField source="description" />
            <DateField source="created_at" />
            <EditButton />
        </MyDatagrid>
    </List>
);

export default CategoryList;
