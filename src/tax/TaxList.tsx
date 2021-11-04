import * as React from 'react';
import {
    List, ListProps,
    Datagrid,
    DateField,
    TextField,
    SearchInput,
} from 'react-admin';

const taxFilters = [
    <SearchInput source="q" alwaysOn />,
];

const TaxList = (props: ListProps) => (
    <List
        {...props}
        sort={{ field: 'name', order: 'ASC' }}
        perPage={20}
        pagination={false}
        component="div"
        filters={taxFilters}
    >
        <Datagrid optimized rowClick="edit">
            <TextField source="name" />
            <TextField source="value" />
            <TextField source="description" />
            <DateField source="created_at" />
        </Datagrid>
    </List>
);

export default TaxList;
