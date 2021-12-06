import * as React from 'react';
import {
    Edit,
    EditProps,
    FieldProps,
    SimpleForm,
    TextInput,
    PasswordInput,
    SelectInput,
    useTranslate,
    required
} from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';
import { Category } from '../types';

export const styles = {
    width600: { width: 600 },
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

const StaffTitle = (props: FieldProps<Category>) => {
    const { record } = props;
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.branch.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
};

const StaffEdit = (props: EditProps) => {
    const classes = useStyles(props);

    return (
        <Edit title={<StaffTitle />} {...props}>
            <SimpleForm validate={validatePasswords}>
                <TextInput source="username" className={classes.width600} validate={[required()]} />

                <TextInput
                    source="display_name"
                    validate={[required()]}
                    className={classes.width600}
                />
                <SelectInput
                    resource="staff"
                    source="type"
                    choices={[
                        // {
                        //     id: '1',
                        //     name: 'Admin',
                        // },
                        {
                            id: '2',
                            name: 'Staff',
                        },
                    ]}
                />
                <PasswordInput
                    source="password"
                    resource="staff"
                    fullWidth
                />
                <PasswordInput
                    source="confirm_password"
                    resource="staff"
                    fullWidth
                />
            </SimpleForm>
        </Edit>
    );
};

export default StaffEdit;
