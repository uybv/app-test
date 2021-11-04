import * as React from 'react';
import {
    List, ListProps,
    Datagrid,
    DateField,
    SearchInput,
    TextField,
} from 'react-admin';

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
        <Datagrid optimized rowClick="edit">
            <TextField source="name" />
            <TextField source="description" />
            <DateField source="created_at" />
        </Datagrid>
    </List>
);

export default CategoryList;
