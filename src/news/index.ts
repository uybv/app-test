import Icon from '@material-ui/icons/LibraryBooks';

import NewList from './NewList';
import NewsEdit from './NewsEdit';
import NewsCreate from './NewsCreate';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    list: NewList,
    create: NewsCreate,
    edit: NewsEdit,
    icon: Icon,
};
