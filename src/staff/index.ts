import Icon from '@material-ui/icons/PeopleOutline';

import StaffList from './StaffList';
import StaffEdit from './StaffEdit';
import StaffCreate from './StaffCreate';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    list: StaffList,
    create: StaffCreate,
    edit: StaffEdit,
    icon: Icon,
};
