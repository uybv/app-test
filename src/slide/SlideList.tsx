import * as React from 'react';
import {
    List, ListProps,
    EditButton,
    DateField,
    ImageField,
    TopToolbar,
    CreateButton
} from 'react-admin';
import MyDatagrid from '../datagrid/MyDatagrid';

const ListActions = (props: any) => (
    <TopToolbar>
        <CreateButton/>
    </TopToolbar>
);

const SlideList = (props: ListProps) => (
    <List
        {...props}
        perPage={50}
        pagination={false}
        component="div"
        filters={[]}
        actions={<ListActions />}
    >
        <MyDatagrid optimized rowClick="edit">
            <ImageField source="image" />
            <DateField source="created_at" showTime />
            <EditButton />
        </MyDatagrid>
    </List>
);

export default SlideList;
