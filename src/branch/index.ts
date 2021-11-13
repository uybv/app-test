import Icon from '@material-ui/icons/Store';

import BranchList from './BranchList';
import BranchEdit from './BranchEdit';
import BranchCreate from './BranchCreate';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    list: BranchList,
    create: BranchCreate,
    edit: BranchEdit,
    icon: Icon,
};
