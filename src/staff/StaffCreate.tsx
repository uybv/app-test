import * as React from 'react';
import {
    Create,
    CreateProps,
    SimpleForm,
    TextInput,
    PasswordInput,
    SelectInput,
    useTranslate,
    required,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

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

const StaffCreate = (props: CreateProps) => {
    const classes = useStyles(props);

    return (
        <Create {...props}>
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
                    className={classes.width600}
                />
                <PasswordInput
                    source="confirm_password"
                    resource="staff"
                    className={classes.width600}
                />
            </SimpleForm>
        </Create>
    );
};

const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label)}
        </Typography>
    );
};

export default StaffCreate;
