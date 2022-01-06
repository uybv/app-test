import * as React from 'react';
import {
    List, ListProps,
    EditButton,
    DateField,
    SearchInput,
    TextField,
    TopToolbar,
    FilterButton,
    CreateButton,
    useUpdate,
    useNotify,
    useRefresh,
    useRedirect
} from 'react-admin';
import MyDatagrid from '../base/datagrid/MyDatagrid';
import PositionField from '../base/list/PositionField';

const categoryFilters = [
    <SearchInput source="q" alwaysOn />,
];

const ListActions = (props: any) => (
    <TopToolbar>
        <FilterButton />
        <CreateButton />
    </TopToolbar>
);

const CategoryList = (props: ListProps) => {

    const [update] = useUpdate();
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const handleUpdatePosition = (record: any, data: any) => {
        update('category', record.id, data, record);
        notify(`更新しました`);
        setTimeout(() => {
            redirect('list', 'category');
            refresh();
        }, 200);
    }

    return (
        <List
            {...props}
            perPage={50}
            pagination={false}
            component="div"
            filters={categoryFilters}
            actions={<ListActions />}
        >
            <MyDatagrid optimized>
                <PositionField {...props} onUp={handleUpdatePosition} onDown={handleUpdatePosition} sortable={false} />
                <TextField source="name" sortable={false} />
                <DateField source="created_at" sortable={false} showTime />
                <EditButton />
            </MyDatagrid>
        </List>
    );
}

export default CategoryList;
