import * as React from 'react';
import {
    EditButton,
    DateField,
    List,
    ListProps,
    TextField,
    SearchInput,
    TopToolbar,
    FilterButton,
    CreateButton
} from 'react-admin';
import CustomerLinkField from './CustomerLinkField';
import MyDatagrid from '../base/datagrid/MyDatagrid';

const visitorFilters = [
    <SearchInput source="q" alwaysOn />,
];

const ListActions = (props: any) => (
    <TopToolbar>
        <FilterButton />
        {/* <CreateButton /> */}
    </TopToolbar>
);

const VisitorList = (props: ListProps) => {
    return (
        <List
            {...props}
            filters={visitorFilters}
            perPage={50}
            sort={{ field: 'last_updated_at', order: 'DESC' }}
            actions={<ListActions />}
        >
            <MyDatagrid optimized>
                <TextField source="email" sortable={false}/>
                <CustomerLinkField sortable={false} />
                <DateField source="last_updated_at" showTime />
                <EditButton />
            </MyDatagrid>

        </List>
    );
};

export default VisitorList;
