import { useEffect } from 'react';
import {
    ListProps,
    EditButton,
    DateField,
    TextField,
    TopToolbar,
    CreateButton,
    useRedirect,
    useNotify,
    usePermissions,
} from 'react-admin';
import MyDatagrid from '../base/datagrid/MyDatagrid';
import MyList from '../base/list/MyList';
import PrevNextPagination from '../base/list/PrevNextPagination';

const ListActions = (props: any) => (
    <TopToolbar>
        <CreateButton />
    </TopToolbar>
);

const TaxList = (props: ListProps) => {
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
            actions={<ListActions />}
        >
            <MyDatagrid optimized>
                <TextField source="name" sortable={false} />
                <TextField source="value" sortable={false} />
                <TextField source="description" sortable={false} />
                <DateField source="created_at" showTime sortable={false} />
                <EditButton />
            </MyDatagrid>
        </MyList>
    )
};

export default TaxList;
