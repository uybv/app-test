import * as React from 'react';
import {
    List, ListProps,
    EditButton,
    DateField,
    TextField,
    SearchInput,
} from 'react-admin';
import MyDatagrid from '../datagrid/MyDatagrid';

const taxFilters = [
    <SearchInput source="q" alwaysOn />,
];

const TaxList = (props: ListProps) => (
    <List
        {...props}
        perPage={20}
        pagination={false}
        component="div"
        filters={taxFilters}
    >
        <MyDatagrid optimized rowClick="edit">
            <TextField source="name" />
            <TextField source="value" />
            <TextField source="description" />
            <DateField source="created_at" />
            <EditButton />
        </MyDatagrid>
    </List>
);

export default TaxList;
