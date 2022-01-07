import * as React from 'react';
import { useEffect } from 'react';
import {
    Create,
    CreateProps,
    SimpleForm,
    TextInput,
    required,
    useRedirect,
    useNotify,
    usePermissions
} from 'react-admin';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const styles: Styles<Theme, any> = {
    name: { width: 544 },
    banner: { width: 544 },
    description: { width: 544 },
};

const useStyles = makeStyles(styles);

const CategoryCreate = (props: CreateProps) => {
    const classes = useStyles(props);
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
        <Create {...props}>
            <SimpleForm redirect="list">
                <TextInput
                    autoFocus
                    source="name"
                    formClassName={classes.name}
                    validate={required()}
                />
            </SimpleForm>
        </Create>
    );
};

export default CategoryCreate;
