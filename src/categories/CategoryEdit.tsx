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
            <ImageField source="banner" title="title" />
            <TextInput source="name" />
            <ReferenceManyField
                reference="product"
                target="category_id"
                label="resources.category.fields.products"
                perPage={20}
                fullWidth
            >
                <Datagrid>
                    <ThumbnailField source="banner" />
                    <ProductRefField source="name" />
                    <NumberField
                        source="price"
                        options={{ style: 'currency', currency: 'USD' }}
                    />
                    <NumberField
                        source="width"
                        options={{ minimumFractionDigits: 2 }}
                    />
                    <NumberField
                        source="height"
                        options={{ minimumFractionDigits: 2 }}
                    />
                    <NumberField source="stock" />
                    <NumberField source="sales" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;
