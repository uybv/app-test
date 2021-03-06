import * as React from 'react';
import { useEffect } from 'react';
import {
    Edit,
    EditProps,
    FieldProps,
    RadioButtonGroupInput,
    SimpleForm,
    TextInput,
    PasswordInput,
    useTranslate,
    required,
    TopToolbar,
    ListButton,
    useRedirect,
    useNotify,
    usePermissions,
    Toolbar,
    SaveButton,
    DeleteButton
} from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';
import { Category } from '../types';
import { ChevronLeft } from '@material-ui/icons';

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

const StaffTitle = (props: FieldProps<Category>) => {
    const { record } = props;
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.staff.name', { smart_count: 1 })} &quot;
            {record.display_name}&quot;
        </span>
    ) : null;
};

const EditActions = ({ basePath, data }: any) => (
    <TopToolbar>
        <ListButton basePath={basePath} icon={<ChevronLeft />} />
    </TopToolbar>
);

const EditToolbar = (props: any) => {
    const { record } = props;
    const useToolbarStyles = makeStyles({
        defaultToolbar: {
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
        },
    });
    const classes = useToolbarStyles();
    return (
        <Toolbar {...props} className={classes.defaultToolbar}>
            <SaveButton />
            <DeleteButton
                confirmTitle={`ユーザー名 "${record?.display_name}"を削除`}
            />
        </Toolbar>
    );
};

const StaffEdit = (props: EditProps) => {
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
        <Edit
            title={<StaffTitle />}
            {...props} 
            transform={transform}
            undoable={false}
            actions={<EditActions />}
        >
            <SimpleForm validate={validatePasswords} toolbar={<EditToolbar />}>
                <TextInput source="username" className={classes.width600} disabled={true} validate={[required()]} />

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
                />
                <PasswordInput
                    source="confirm_password"
                    resource="staff"
                    className={classes.width300}
                    formClassName={classes.rightFormGroup}
                />
            </SimpleForm>
        </Edit>
    );
};

export default StaffEdit;
