import * as React from 'react';
import { useEffect } from 'react';
import {
    ListProps,
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
    useRedirect,
    usePermissions,
} from 'react-admin';
import MyDatagrid from '../base/datagrid/MyDatagrid';
import MyList from '../base/list/MyList';
import PositionField from '../base/list/PositionField';
import PrevNextPagination from '../base/list/PrevNextPagination';

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
    const { permissions } = usePermissions();

    useEffect(() => {
        if (permissions && permissions !== 'admin') {
            notify(`Permission Denied`);
            redirect('list');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [permissions]);

    const handleUpdatePosition = (record: any, data: any) => {
        update('category', record.id, data, record);
        notify(`更新しました`);
        setTimeout(() => {
            redirect('list', 'category');
            refresh();
        }, 200);
    }

    return (
        <MyList
            {...props}
            perPage={50}
            pagination={<PrevNextPagination />}
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

        </MyList>
    );
}

export default CategoryList;
