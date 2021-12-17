import * as React from 'react';
import {
    List, ListProps,
    EditButton,
    DateField,
    SearchInput,
    TextField,
} from 'react-admin';
import MyDatagrid from '../datagrid/MyDatagrid';

const categoryFilters = [
    <SearchInput source="q" alwaysOn />,
];

const CategoryList = (props: ListProps) => (
    <List
        {...props}
        sort={{ field: 'name', order: 'ASC' }}
        perPage={20}
        pagination={false}
        component="div"
        filters={categoryFilters}
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
