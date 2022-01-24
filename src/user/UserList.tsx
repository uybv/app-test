import {
    EditButton,
    DateField,
    ListProps,
    TextField,
    SearchInput,
    TopToolbar,
    FilterButton
} from 'react-admin';
import UserLinkField from './UserLinkField';
import MyDatagrid from '../base/datagrid/MyDatagrid';
import PrevNextPagination from '../base/list/PrevNextPagination';
import MyList from '../base/list/MyList';

const userFilters = [
    <SearchInput source="q" alwaysOn />,
];

const ListActions = (props: any) => (
    <TopToolbar>
        <FilterButton />
        {/* <CreateButton /> */}
    </TopToolbar>
);

const UserList = (props: ListProps) => {
    return (
        <MyList
            {...props}
            pagination={<PrevNextPagination />}
            filters={userFilters}
            perPage={50}
            sort={{ field: 'last_updated_at', order: 'DESC' }}
            actions={<ListActions />}
        >
            <MyDatagrid optimized>
                <TextField source="email" sortable={false}/>
                <UserLinkField sortable={false} />
                <DateField source="last_updated_at" showTime />
                <EditButton />
            </MyDatagrid>

        </MyList>
    );
};

export default UserList;
