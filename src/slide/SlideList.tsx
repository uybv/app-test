import * as React from 'react';
import { useEffect } from 'react';
import {
    List, ListProps,
    EditButton,
    DateField,
    ImageField,
    TopToolbar,
    CreateButton,
    useUpdate,
    useNotify,
    useRefresh,
    useRedirect,
    usePermissions
} from 'react-admin';
import MyDatagrid from '../base/datagrid/MyDatagrid';
import PositionField from '../base/list/PositionField';
import SlideIsPublicField from './SlideIsPublicField';

const ListActions = (props: any) => (
    <TopToolbar>
        <CreateButton />
    </TopToolbar>
);

const SlideList = (props: ListProps) => {

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
        update('slide', record.id, data, record);
        notify(`更新しました`);
        setTimeout(() => {
            redirect('list', 'slide');
            refresh();
        }, 200);
    }

    return (
        <List
            {...props}
            perPage={50}
            pagination={false}
            component="div"
            filters={[]}
            actions={<ListActions />}
        >
            <MyDatagrid optimized>
                <PositionField {...props} onUp={handleUpdatePosition} onDown={handleUpdatePosition} sortable={false}/>
                <SlideIsPublicField />
                <ImageField source="image" sortable={false} />
                <DateField source="created_at" showTime sortable={false} />
                <EditButton />
            </MyDatagrid>
        </List>
    )
};

export default SlideList;
