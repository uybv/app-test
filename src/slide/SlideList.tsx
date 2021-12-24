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
        <MyDatagrid optimized>
            <ImageField source="image" sortable={false}/>
            <DateField source="created_at" showTime sortable={false}/>
            <EditButton />
        </MyDatagrid>
    </List>
);

export default SlideList;
