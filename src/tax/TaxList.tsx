import * as React from 'react';
import { useEffect } from 'react';
import {
    List,
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
        <List
            {...props}
            perPage={50}
            pagination={false}
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
        </List>
    )
};

export default TaxList;
