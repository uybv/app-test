import * as React from 'react';
import {
    Edit,
    EditProps,
    FieldProps,
    SimpleForm,
    TextInput,
    useTranslate,
    TopToolbar,
    ListButton,
    Toolbar,
    SaveButton,
    DeleteButton
} from 'react-admin';
import { ChevronLeft } from '@material-ui/icons';

import { Category } from '../types';
import { makeStyles } from '@material-ui/core';

const CategoryTitle = (props: FieldProps<Category>) => {
    const { record } = props;
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.category.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
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
                confirmTitle={`商品管理 "${record?.name}"を削除`}
            />
        </Toolbar>
    );
};

const CategoryEdit = (props: EditProps) => (
    <Edit
        {...props}
        undoable={false}
        title={<CategoryTitle />}
        actions={<EditActions />}
    >
        <SimpleForm toolbar={<EditToolbar />}>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;
