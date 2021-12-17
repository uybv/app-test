import * as React from 'react';
import {
    List, ListProps,
    EditButton,
    DateField,
    ImageField,
} from 'react-admin';
import MyDatagrid from '../datagrid/MyDatagrid';

const SlideList = (props: ListProps) => (
    <List
        {...props}
        sort={{ field: 'name', order: 'ASC' }}
        perPage={20}
        pagination={false}
        component="div"
        filters={[]}
    >
        <MyDatagrid optimized rowClick="edit">
            <ImageField source="image" />
            <DateField source="created_at" />
            <EditButton />
        </MyDatagrid>
    </List>
);

export default SlideList;
