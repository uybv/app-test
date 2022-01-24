import { DatagridBody } from 'react-admin';


const MyDatagridBody = (props: any) => {
    return (<DatagridBody {...props} hasBulkActions={false} isRowSelectable={() => { return false; }}/>)
}

export default MyDatagridBody;