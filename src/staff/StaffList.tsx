import * as React from 'react';
import { useEffect } from 'react';
import {
    List, ListProps,
    EditButton,
    DateField,
    TextField,
    SearchInput,
    TopToolbar,
    CreateButton,
    FilterButton,
    useRedirect,
    useNotify,
    usePermissions
} from 'react-admin';
import MyDatagrid from '../base/datagrid/MyDatagrid';
import MyList from '../base/list/MyList';
import PrevNextPagination from '../base/list/PrevNextPagination';
import StaffTypeField from './StaffTypeField';

const filters = [
    <SearchInput source="q" alwaysOn />,
];

const ListActions = (props: any) => (
    <TopToolbar>
        <FilterButton />
        <CreateButton />
    </TopToolbar>
);

const StaffList = (props: ListProps) => {
    const redirect = useRedirect();
    const notify = useNotify();
    const { permissions } = usePermissions();

    useEffect(() => {
        if (permissions && permissions !== 'admin') {
            notify(`Permission Denied`);
            redirect('list');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [permissions]);

    return (
        <MyList
            {...props}
            perPage={50}
            pagination={<PrevNextPagination />}
            component="div"
            filters={filters}
            actions={<ListActions />}
        >
            <MyDatagrid optimized>
                <StaffTypeField />
                <TextField source="username" sortable={false} />
                <TextField source="display_name" sortable={false} />
                <DateField source="created_at" showTime sortable={false} />
                <EditButton />
            </MyDatagrid>
        </MyList>
    )
};

export default StaffList;
