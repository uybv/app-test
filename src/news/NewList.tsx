import * as React from 'react';
import {
    List, ListProps,
    Datagrid,
    DateField,
    TextField,
    SearchInput,
} from 'react-admin';
import KeywordsField from './KeywordsField';
import TagsField from './TagsField';

const filters = [
    <SearchInput source="q" alwaysOn />,
];

const NewList = (props: ListProps) => (
    <List
        {...props}
        sort={{ field: 'title', order: 'ASC' }}
        perPage={20}
        pagination={false}
        component="div"
        filters={filters}
    >
        <Datagrid optimized rowClick="edit">
            <TextField source="title" />
            <DateField source="publish_time" showTime />
            <DateField source="expired_time" showTime />
            {/* <KeywordsField /> */}
            {/* <TagsField /> */}
            <DateField source="created_at" />
        </Datagrid>
    </List>
);

export default NewList;
