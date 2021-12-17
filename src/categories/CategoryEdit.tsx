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
} from 'react-admin';
import { ChevronLeft } from '@material-ui/icons';

import { Category } from '../types';

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

const CategoryEdit = (props: EditProps) => (
    <Edit
        {...props}
        undoable={false}
        title={<CategoryTitle />}
        actions={<EditActions />}
    >
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;
