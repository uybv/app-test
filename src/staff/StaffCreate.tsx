import * as React from 'react';
import { useEffect } from 'react';
import {
    Create,
    CreateProps,
    SimpleForm,
    TextInput,
    PasswordInput,
    RadioButtonGroupInput,
    required,
    useRedirect,
    useNotify,
    usePermissions,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

export const styles = {
    width600: { width: 600 },
    width300: { width: 300 },
    leftFormGroup: { display: 'inline-block' },
    rightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

export const validatePasswords = ({
    password,
    confirm_password,
}: any) => {
    const errors = {} as any;

    if (password && confirm_password && password !== confirm_password) {
        errors.confirm_password = [
            'resources.staff.errors.password_mismatch',
        ];
    }

    return errors;
};

const useStyles = makeStyles(styles);

const StaffCreate = (props: CreateProps) => {
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

    const transform = (data: any) => {
        delete data.confirm_password;
        return data;
    };

    return (
        <Create {...props} transform={transform}>
            <SimpleForm validate={validatePasswords} redirect="list">
                <TextInput source="username" className={classes.width600} validate={[required()]} />

                <TextInput
                    source="display_name"
                    validate={[required()]}
                    className={classes.width600}
                />
                <RadioButtonGroupInput
                    source="type"
                    validate={[required()]}
                    choices={[
                        { id: 1, name: '管理' },
                        { id: 2, name: '店舗' },
                    ]}
                />
                <PasswordInput
                    source="password"
                    resource="staff"
                    className={classes.width300}
                    formClassName={classes.leftFormGroup}
                    validate={[required()]}
                />
                <PasswordInput
                    source="confirm_password"
                    resource="staff"
                    className={classes.width300}
                    formClassName={classes.rightFormGroup}
                />
            </SimpleForm>
        </Create>
    );
};

export default StaffCreate;
