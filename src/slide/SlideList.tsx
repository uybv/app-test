import * as React from 'react';
import {
    List, ListProps,
    Datagrid,
    DateField,
    ImageField,
} from 'react-admin';

const SlideList = (props: ListProps) => (
    <List
        {...props}
        sort={{ field: 'name', order: 'ASC' }}
        perPage={20}
        pagination={false}
        component="div"
        filters={[]}
    >
        <Datagrid optimized rowClick="edit">
            <ImageField source="image" />
            <DateField source="created_at" />
        </Datagrid>
    </List>
);

export default SlideList;
