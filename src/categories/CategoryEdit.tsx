import * as React from 'react';
import {
    Datagrid,
    Edit,
    EditProps,
    EditButton,
    FieldProps,
    NumberField,
    ReferenceManyField,
    SimpleForm,
    TextInput,
    useTranslate,
    ImageField
} from 'react-admin';

import ThumbnailField from '../products/ThumbnailField';
import ProductRefField from '../products/ProductRefField';
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

const CategoryEdit = (props: EditProps) => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;
